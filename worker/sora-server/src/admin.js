import now from "./now.js"
import { selectById as checkAccount } from "./account.js"

async function createEnemy(db) {
  return new Promise(async resolve => {
    try {
      const info = JSON.stringify({ hp: 10, str: 2 });
      const { results } = await db.prepare(
        "INSERT INTO Enemy (ID, CREATE_TIME, UPDATE_TIME, IS_DELETED, NAME, INFO) VALUES (?1, ?2, ?3, ?4, ?5, ?6) RETURNING *"
      )
        .bind("10001", now(), now(), 0, "Test Enemy", info)
        .all();
      return resolve({ error: null, data: results });
    } catch (e) {
      return resolve({ error: e.message, data: null });
    }
  })
}

async function updateEnemy(db) {
  return new Promise(async resolve => {
    try {
      const info = JSON.stringify({ hp: 10, str: 1 });
      const { results } = await db.prepare(
        "UPDATE Enemy SET UPDATE_TIME = ?1, NAME = ?2, INFO = ?3 WHERE ID = ?4 RETURNING *"
      )
        .bind(now(), "木桩子", info, "10001")
        .all();
      return resolve({ error: null, data: results });
    } catch (e) {
      return resolve({ error: e.message, data: null });
    }
  })
}

async function deleteEnemy(db) {
  
}

export default async function (request, env) {
  return new Promise(async resolve => {
    console.log("$$$$$ Call Admin API $$$$$");
    const db = env.DB;
    const url = new URL(request.url);
    console.log("> Path: ", url.pathname);
    var results;

    // Get param
    const account = url.searchParams.get("account");
    console.log(`> Param: account: ${account}`)

    // Check param
    if (!account) {
      console.log("X [406] Params not acceptable.");
      console.log("### Admin End ###");
      return resolve(new Response(null, {
        status: 406,
      }));
    };

    // Check if account is GM
    results = await checkAccount(account, db);
    if (results.error) {
      console.log(`X [500] ${results.error}.`);
      console.log("### Admin End ###");
      return resolve(new Response(results.error, {
        status: 500,
      }));
    };
    if (results.data[0].IS_GM === 0) {
      console.log(`X [406] Account is not GM.`);
      console.log("### Admin End ###");
      return resolve(new Response(null, {
        status: 406,
      }));
    };
    console.log("O GM Account exists.");

    // Create enemy
    if (url.pathname === "/admin/createEnemy") {
      console.log("### Create enemy ###");

      results = await createEnemy(db);
      if (results.error) {
        console.log(`X [500] ${results.error}.`);
        console.log("### Create enemy End ###");
        return resolve(new Response(results.error, {
          status: 500,
        }));
      };
      console.log(`O [201] Enemy created. Data: ${results.data}`);
      console.log("### Create enemy End ###");
      return resolve(new Response(JSON.stringify(results.data), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    // Update enemy
    if (url.pathname === "/admin/updateEnemy") {
      console.log("### Update enemy ###");

      results = await updateEnemy(db);
      if (results.error) {
        console.log(`X [500] ${results.error}.`);
        console.log("### Update enemy End ###");
        return resolve(new Response(results.error, {
          status: 500,
        }));
      };
      console.log(`O [201] Enemy updated. Data: ${results.data}`);
      console.log("### Update enemy End ###");
      return resolve(new Response(JSON.stringify(results.data), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      }));
    }
  })
}