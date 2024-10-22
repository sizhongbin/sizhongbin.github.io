import now from "./now.js"
import { selectById as checkCharacter, updateInfo as setParty } from "./character.js"

async function selectByName(name, db) {
  return new Promise(async resolve => {
    try {
      const { results } = await db.prepare(
        "SELECT * FROM Party WHERE NAME = ?"
      )
        .bind(name)
        .all();
      return resolve({ error: null, data: results });
    } catch (e) {
      return resolve({ error: e.message, data: null });
    }
  })
}

async function create(name, character, db) {
  return new Promise(async resolve => {
    try {
      const patternName = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
      if (!patternName.test(name)) throw ({ message: "Invalid NAME format" });
      const nameLength = name.replace(/[\u4e00-\u9fa5]/g, "**").length;
      if (nameLength < 4 || nameLength > 16) throw ({ message: "Invalid NAME length" });
      const { results } = await db.prepare(
        "INSERT INTO Party (ID, CREATE_TIME, UPDATE_TIME, IS_DELETED, NAME, LEADER, MEMBER, APPROACH, INVENTORY, LOG) VALUES (lower(hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || hex(randomblob(2)) || '-' || hex(randomblob(2)) || '-' || hex(randomblob(6))), ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9) RETURNING ID"
      )
        .bind(now(), now(), 0, name, character, "[]", "{}", "[]", "[]")
        .all();
      return resolve({ error: null, data: results[0].ID });
    } catch (e) {
      return resolve({ error: e.message, data: null });
    }
  })
}

export default async function (request, env) {
  return new Promise(async resolve => {
    console.log("$$$$$ Call party API $$$$$");
    const db = env.DB;
    const url = new URL(request.url);
    console.log("> Path: ", url.pathname);
    var results;

    // Create Party
    if (url.pathname === "/party/create") {
      console.log("### Create Party ###");

      // Get param
      const character = url.searchParams.get("character");
      const name = url.searchParams.get("name");
      console.log(`> Param: character: ${character} name: ${name}`)

      // Check param
      if (!character || !name) {
        console.log("X [406] Params not acceptable.");
        console.log("### Create Party End ###");
        return resolve(new Response(null, {
          status: 406,
        }));
      };

      // Check character
      results = await checkCharacter(character, db);
      if (results.error) {
        console.log(`X [500] ${results.error}.`);
        console.log("### Create Party End ###");
        return resolve(new Response(results.error, {
          status: 500,
        }));
      };
      if (results.data.length === 0) {
        console.log(`X [406] Character not exists.`);
        console.log("### Create Party End ###");
        return resolve(new Response(null, {
          status: 406,
        }));
      }
      else {
        const data = JSON.parse(results.data[0].INFO_PUBLIC);
        console.log("data.INFO_PUBLIC: ", data);
        if (data.party) {
          console.log(`X [406] Character already in a party.`);
          console.log("### Create Party End ###");
          return resolve(new Response(null, {
            status: 406,
          }));
        }
      };

      // Check conflict
      results = await selectByName(name, db);
      if (results.error) {
        console.log(`X [500] ${results.error}.`);
        console.log("### Create Party End ###");
        return resolve(new Response(results.error, {
          status: 500,
        }));
      };
      if (results.data.length !== 0) {
        console.log(`X [409] NAME conflict.`);
        console.log("### Create Party End ###");
        return resolve(new Response(null, {
          status: 409,
        }));
      };
      console.log("O No Conflict.");

      // Create Party
      results = await create(name, character, db);
      if (results.error === "Invalid NAME format" || results.error === "Invalid NAME length") {
        console.log(`X [406] ${results.error}.`);
        console.log("### Create Party End ###");
        return resolve(new Response(results.error, {
          status: 406,
        }));
      }
      else if (results.error) {
        console.log(`X [500] ${results.error}.`);
        console.log("### Create Party End ###");
        return resolve(new Response(results.error, {
          status: 500,
        }));
      };
      const id = results.data;
      console.log(`O [201] Party created. ID: ${id}`);

      // Update Character INFO_PUBLIC
      results = await setParty(1, character, "party", id, db);
      if (results.error === "Invalid key") {
        console.log(`X [406] ${results.error}.`);
        console.log("### Create Party End ###");
        return resolve(new Response(results.error, {
          status: 406,
        }));
      }
      else if (results.error) {
        console.log(`X [500] ${results.error}.`);
        console.log("### Create Party End ###");
        return resolve(new Response(results.error, {
          status: 500,
        }));
      };
      console.log(`O [201] Character INFO_PUBLIC updated. Data: ${results.data[0].INFO_PUBLIC}`);

      console.log("### Create Party End ###");
      return resolve(new Response(id, {
        status: 201,
        // headers: { 'Content-Type': 'application/json' }
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
      if (results.data.length != 0) {
        console.log(`X [409] Character conflict.`);
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
      if (results.data.length != 0) {
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