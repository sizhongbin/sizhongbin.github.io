import now from "./now.js"
import { selectById as checkAccount } from "./account.js"

async function selectByAccount(account, db) {
  return new Promise(async resolve => {
    try {
      const { results } = await db.prepare(
        "SELECT * FROM Character WHERE ACCOUNT = ?"
      )
        .bind(account)
        .all();
      return resolve({ error: null, data: results });
    } catch (e) {
      return resolve({ error: e.message, data: null });
    }
  })
}

export async function selectById(id, db) {
  return new Promise(async resolve => {
    try {
      const { results } = await db.prepare(
        "SELECT * FROM Character WHERE ID = ?"
      )
        .bind(id)
        .all();
      return resolve({ error: null, data: results });
    } catch (e) {
      return resolve({ error: e.message, data: null });
    }
  })
}

async function selectByName(name, db) {
  return new Promise(async resolve => {
    try {
      const { results } = await db.prepare(
        "SELECT * FROM Character WHERE NAME = ?"
      )
        .bind(name)
        .all();
      return resolve({ error: null, data: results });
    } catch (e) {
      return resolve({ error: e.message, data: null });
    }
  })
}

async function create(name, account, db) {
  return new Promise(async resolve => {
    try {
      //const patternName = /^.{4,16}$/;
      const patternName = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
      if (!patternName.test(name)) throw ({ message: "Invalid NAME format" });
      const nameLength = name.replace(/[\u4e00-\u9fa5]/g, "**").length;
      if (nameLength < 4 || nameLength > 16) throw ({ message: "Invalid NAME length" });
      const infoPrivate = JSON.stringify({ str: 2 });
      const infoPublic = JSON.stringify({ hp: 10 });
      const { results } = await db.prepare(
        "INSERT INTO Character (ID, CREATE_TIME, UPDATE_TIME, IS_DELETED, NAME, ACCOUNT, INFO_PRIVATE, INFO_PUBLIC) VALUES (lower(hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || hex(randomblob(2)) || '-' || hex(randomblob(2)) || '-' || hex(randomblob(6))), ?1, ?2, ?3, ?4, ?5, ?6, ?7) RETURNING ID"
      )
        .bind(now(), now(), 0, name, account, infoPrivate, infoPublic)
        .all();
      return resolve({ error: null, data: results[0].ID });
    } catch (e) {
      return resolve({ error: e.message, data: null });
    }
  })
}

async function deactive(name, db) {

}

export async function updateInfo(type, character, key, value, db) {
  // type 0 = private, type 1 = public
  return new Promise(async resolve => {
    try {
      switch (key) {
        case "party":
          break;
        default:
          throw ({ message: "Invalid key" });
      }
      const row = await selectById(character, db);
      if (row.error)
        return resolve(new Response(row.error, {
          status: 500,
        }));
      let info, sql;
      if (type) {
        info = JSON.parse(row.data[0].INFO_PUBLIC);
        sql = "UPDATE Character SET UPDATE_TIME = ?1, INFO_PUBLIC = ?2 WHERE ID = ?3 RETURNING *";
      }
      else {
        info = JSON.parse(row.data[0].INFO_PRIVATE);
        sql = "UPDATE Character SET UPDATE_TIME = ?1, INFO_PRIVATE = ?2 WHERE ID = ?3 RETURNING *";
      }
      info[key] = value;
      const { results } = await db.prepare(sql)
        .bind(now(), JSON.stringify(info), character)
        .all();
      return resolve({ error: null, data: results });
    } catch (e) {
      return resolve({ error: e.message, data: null });
    }
  })


  if (publicInfo) {
    Object.keys(publicInfo).map(key => {
      console.log(key);
    })
  }
  if (privateInfo) {
    Object.keys(privateInfo).map(key => {
      console.log(key);
    })
  }
}

export default async function (request, env) {
  return new Promise(async resolve => {
    console.log("$$$$$ Call character API $$$$$");
    const db = env.DB;
    const url = new URL(request.url);
    console.log("> Path: ", url.pathname);
    var results;

    // List characters in account
    if (url.pathname === "/character/list") {
      console.log("### List Character ###");

      // Get param
      const account = url.searchParams.get("account");
      console.log(`> Param: account: ${account}`)

      // Check param
      if (!account) {
        console.log("X [406] Params not acceptable.");
        console.log("### List Character End ###");
        return resolve(new Response(null, {
          status: 406,
        }));
      };

      // Check account
      results = await checkAccount(account, db);
      if (results.error) {
        console.log(`X [500] ${results.error}.`);
        console.log("### List Character End ###");
        return resolve(new Response(results.error, {
          status: 500,
        }));
      };
      if (results.data.length === 0) {
        console.log(`X [406] Account not exists.`);
        console.log("### List Character End ###");
        return resolve(new Response(null, {
          status: 406,
        }));
      };

      // Get characters
      results = await selectByAccount(account, db);
      if (results.error) {
        console.log(`X [500] ${results.error}.`);
        console.log("### List Character End ###");
        return resolve(new Response(characters.error, {
          status: 500,
        }));
      };
      console.log("O [200] Success. Data:");
      console.log(results.data);
      console.log("### List Character End ###");
      return resolve(new Response(JSON.stringify(results.data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    // Create character
    if (url.pathname === "/character/create") {
      console.log("### Create Character ###");

      // Get param
      const name = url.searchParams.get("name");
      const account = url.searchParams.get("account");
      console.log(`> Param: name: ${name} account: ${account}`)

      // Check param
      if (!account || !name) {
        console.log("X [406] Params not acceptable.");
        console.log("### Create Character End ###");
        return resolve(new Response(null, {
          status: 406,
        }));
      };

      // Check account
      results = await checkAccount(account, db);
      if (results.error) {
        console.log(`X [500] ${results.error}.`);
        console.log("### Create Character End ###");
        return resolve(new Response(results.error, {
          status: 500,
        }));
      };
      if (results.data.length === 0) {
        console.log(`X [406] Account not exists.`);
        console.log("### Create Character End ###");
        return resolve(new Response(null, {
          status: 406,
        }));
      };
      console.log("O Account exists.");

      // Check conflict
      results = await selectByName(name, db);
      if (results.error) {
        console.log(`X [500] ${results.error}.`);
        console.log("### Create Character End ###");
        return resolve(new Response(results.error, {
          status: 500,
        }));
      };
      if (results.data.length !== 0) {
        console.log(`X [409] NAME conflict.`);
        console.log("### Create Character End ###");
        return resolve(new Response(null, {
          status: 409,
        }));
      };
      results = await selectByAccount(account, db);
      if (results.error) {
        console.log(`X [500] ${results.error}.`);
        console.log("### Create Character End ###");
        return resolve(new Response(results.error, {
          status: 500,
        }));
      };
      if (results.data.length !== 0) {
        console.log(`X [409] Character full.`);
        console.log("### Create Character End ###");
        return resolve(new Response(null, {
          status: 409,
        }));
      };
      console.log("O No Conflict.");

      // Create characters
      results = await create(name, account, db);
      if (results.error === "Invalid NAME format" || results.error === "Invalid NAME length") {
        console.log(`X [406] ${results.error}.`);
        console.log("### Create Character End ###");
        return resolve(new Response(results.error, {
          status: 406,
        }));
      }
      else if (results.error) {
        console.log(`X [500] ${results.error}.`);
        console.log("### Create Character End ###");
        return resolve(new Response(results.error, {
          status: 500,
        }));
      };

      console.log(`O [201] Character created. ID: ${results.data}`);
      console.log("### Create Character End ###");
      return resolve(new Response(results.data, {
        status: 201,
        // headers: { 'Content-Type': 'application/json' }
      }));
    }

    // Unacceptable pathname
    console.log("X [406] Unacceptable pathname")
    return resolve(new Response(null, {
      status: 406,
    }));
  })
}