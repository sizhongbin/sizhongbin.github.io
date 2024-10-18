import now from "./now.js"

async function selectByMail(mail, db) {
  return new Promise(async resolve => {
    try {
      const { results } = await db.prepare(
        "SELECT * FROM Account WHERE MAIL = ?"
      )
        .bind(mail)
        .all();
      resolve({ error: null, data: results });
    } catch (e) {
      resolve({ error: e.message, data: null });
    }
  })
}

async function signUp(mail, pass, db) {
  return new Promise(async resolve => {
    try {
      const patternMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      const patternPass = /^.{6,32}$/;
      if (!patternMail.test(mail)) throw ({ message: "Invaild MAIL format" });
      if (!patternPass.test(pass)) throw ({ message: "Invaild PASS format" });
      const { results } = await db.prepare(
        "INSERT INTO Account (ID, CREATE_TIME, UPDATE_TIME, IS_DELETED, MAIL, PASS) VALUES (lower(hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || hex(randomblob(2)) || '-' || hex(randomblob(2)) || '-' || hex(randomblob(6))), ?1, ?2, ?3, ?4, ?5) RETURNING ID"
      )
        .bind(now(), now(), 0, mail, pass)
        .all();
      resolve({ error: null, data: results[0].ID });
    } catch (e) {
      resolve({ error: e.message, data: null });
    }
  })
}

async function signIn(mail, pass, db) {
  return new Promise(async resolve => {
    try {
      const { results } = await db.prepare(
        "SELECT * FROM Account WHERE MAIL = ?"
      )
        .bind(mail)
        .all();
      console.log(results);
      if (results.length === 0)
        resolve({ error: "Incorrect MAIL", data: null });
      else if (results[0].PASS === pass)
        resolve({ error: null, data: results });
      else
        resolve({ error: "Incorrect PASS", data: null });
    } catch (e) {
      resolve({ error: e.message, data: null });
    }
  })
}

export default async function (request, env) {
  const db = env.DB;
  const url = new URL(request.url);
  console.log("Call Account API: ", url.pathname);
  var results;

  // Sign up
  if (url.pathname === "/account/signup") {
    // Get mail and pass param
    const mail = url.searchParams.get("mail");
    const pass = url.searchParams.get("pass");

    // Check param
    if (!mail || !pass) {
      return new Response(null, {
        status: 406,
      });
    };

    // Check conflict
    results = await selectByMail(mail, db);
    console.log("conflict:", results);
    if (results.error) {
      return new Response(results.error, {
        status: 500,
      });
    };
    if (results.data.length != 0) {
      return new Response(null, {
        status: 409,
      });
    };

    // Create account and get ID
    results = await signUp(mail, pass, db);
    console.log("guid:", results.data);
    if (results.error === "Invaild MAIL format") {
      return new Response(results.error, {
        status: 406,
      });
    }
    else if (results.error === "Invaild PASS format") {
      return new Response(results.error, {
        status: 406,
      });
    }
    else if (results.error) {
      return new Response(results.error, {
        status: 500,
      });
    };
    return new Response(results.data, {
      status: 201,
      // headers: { 'Content-Type': 'application/json' }
    });
  };

  // Sign in
  if (url.pathname === "/account/signin") {
    // Get mail and pass param
    const mail = url.searchParams.get("mail");
    const pass = url.searchParams.get("pass");

    // Check param
    if (!mail || !pass) {
      return new Response(null, {
        status: 406,
      });
    };

    // Get ID
    results = await signIn(mail, pass, db);
    console.log("guid:", results.data);
    if (results.error === "Incorrect PASS") {
      return new Response(results.error, {
        status: 401,
      });
    }
    else if (results.error === "Incorrect MAIL") {
      return new Response(results.error, {
        status: 401,
      });
    }
    else if (results.error) {
      return new Response(results.error, {
        status: 500,
      });
    };
    return new Response(results.data, {
      status: 200,
      // headers: { 'Content-Type': 'application/json' }
    });
  }

  // Unacceptable pathname
  return new Response(null, {
    status: 406,
  });
}