import now from "./now.js"

async function selectByMail(mail, db) {
  return new Promise(async resolve => {
    try {
      const { results } = await db.prepare(
        "SELECT * FROM Account WHERE MAIL = ?"
      )
        .bind(mail.toLowerCase())
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
        "SELECT * FROM Account WHERE ID = ?"
      )
        .bind(id)
        .all();
      return resolve({ error: null, data: results });
    } catch (e) {
      return resolve({ error: e.message, data: null });
    }
  })
}

async function signUp(mail, pass, db) {
  return new Promise(async resolve => {
    try {
      const patternMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      const patternPass = /^.{6,32}$/;
      if (!patternMail.test(mail)) throw ({ message: "Invalid MAIL format" });
      if (!patternPass.test(pass)) throw ({ message: "Invalid PASS format" });
      const { results } = await db.prepare(
        "INSERT INTO Account (ID, CREATE_TIME, UPDATE_TIME, IS_DELETED, MAIL, PASS) VALUES (lower(hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || hex(randomblob(2)) || '-' || hex(randomblob(2)) || '-' || hex(randomblob(6))), ?1, ?2, ?3, ?4, ?5) RETURNING ID"
      )
        .bind(now(), now(), 0, mail.toLowerCase(), pass)
        .all();
      return resolve({ error: null, data: results[0].ID });
    } catch (e) {
      return resolve({ error: e.message, data: null });
    }
  })
}

async function signIn(mail, pass, db) {
  return new Promise(async resolve => {
    try {
      const { results } = await db.prepare(
        "SELECT * FROM Account WHERE MAIL = ?"
      )
        .bind(mail.toLowerCase())
        .all();
      console.log(results);
      if (results.length === 0)
        return resolve({ error: "Incorrect MAIL", data: null });
      else if (results[0].PASS === pass)
        return resolve({ error: null, data: results[0].ID });
      else
        return resolve({ error: "Incorrect PASS", data: null });
    } catch (e) {
      return resolve({ error: e.message, data: null });
    }
  })
}

export default async function (request, env) {
  return new Promise(async resolve => {
    console.log("$$$$$ Call account API $$$$$");
    const db = env.DB;
    const url = new URL(request.url);
    console.log("> Path: ", url.pathname);
    var results;

    // Sign up
    if (url.pathname === "/account/signup") {
      console.log("### Sign Up ###");

      // Get param
      const mail = url.searchParams.get("mail");
      const pass = url.searchParams.get("pass");
      console.log(`> Param: mail: ${mail} pass: ${pass}`)

      // Check param
      if (!mail || !pass) {
        console.log("X [406] Params not acceptable.");
        console.log("### Sign Up End ###");
        return resolve(new Response(null, {
          status: 406,
        }));
      };

      // Check conflict
      results = await selectByMail(mail, db);
      if (results.error) {
        console.log(`X [500] ${results.error}.`);
        console.log("### Sign Up End ###");
        return resolve(new Response(results.error, {
          status: 500,
        }));
      };
      if (results.data.length !== 0) {
        console.log(`X [409] Account conflict.`);
        console.log("### Sign Up End ###");
        return resolve(new Response(null, {
          status: 409,
        }));
      };
      console.log("O No Conflict.");

      // Create account and get ID
      results = await signUp(mail, pass, db);
      if (results.error === "Invalid MAIL format" || results.error === "Invalid PASS format") {
        console.log(`X [406] ${results.error}.`);
        console.log("### Sign Up End ###");
        return resolve(new Response(results.error, {
          status: 406,
        }));
      }
      else if (results.error) {
        console.log(`X [500] ${results.error}.`);
        console.log("### Sign Up End ###");
        return resolve(new Response(results.error, {
          status: 500,
        }));
      };

      console.log(`O [201] Account created. ID: ${results.data}`);
      console.log("### Sign Up End ###");
      return resolve(new Response(results.data, {
        status: 201,
        // headers: { 'Content-Type': 'application/json' }
      }));
    };

    // Sign in
    if (url.pathname === "/account/signin") {
      console.log("### Sign In ###");

      // Get param
      const mail = url.searchParams.get("mail");
      const pass = url.searchParams.get("pass");
      console.log(`> Param: mail: ${mail} pass: ${pass}`)

      // Check param
      if (!mail || !pass) {
        console.log("X [406] Params not acceptable.");
        console.log("### Sign In End ###");
        return resolve(new Response(null, {
          status: 406,
        }));
      };

      // Get ID
      results = await signIn(mail, pass, db);
      if (results.error === ("Incorrect MAIL" || "Incorrect PASS")) {
        console.log(`X [401] ${results.error}.`);
        console.log("### Sign In End ###");
        return resolve(new Response(results.error, {
          status: 401,
        }));
      }
      else if (results.error) {
        console.log(`X [500] ${results.error}.`);
        console.log("### Sign In End ###");
        return resolve(new Response(results.error, {
          status: 500,
        }));
      };

      console.log(`O [200] Signed in. ID: ${results.data}`);
      console.log("### Sign Ip End ###");
      return resolve(new Response(results.data, {
        status: 200,
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