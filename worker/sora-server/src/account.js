export async function selectByMail(mail, db) {
  return new Promise(async resolve => {
    try {
      const { results } = await db.prepare(
        "SELECT * FROM Account WHERE MAIL = ?"
      )
        .bind(mail)
        .all();
      resolve({ error: null, results: results });
    } catch (e) {
      resolve({ error: e.message, results: null });
    }
  })
}

export async function signUp(mail, pass, db) {
  return new Promise(async resolve => {
    try {
      const patternMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      const patternPass = /^.{6,32}$/;
      if (!patternMail.test(mail)) throw ({ message: "Invaild MAIL format" });
      if (!patternPass.test(pass)) throw ({ message: "Invaild PASS format" });
      const { results } = await db.prepare(
        "INSERT INTO Account (ID, MAIL, PASS) VALUES (lower(hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || hex(randomblob(2)) || '-' || hex(randomblob(2)) || '-' || hex(randomblob(6))), ?1, ?2) RETURNING ID"
      )
        .bind(mail, pass)
        .all();
      resolve({ error: null, results: results[0].ID });
    } catch (e) {
      resolve({ error: e.message, results: null });
    }
  })
}

export async function signIn(mail, pass, db) {
  return new Promise(async resolve => {
    try {
      const { results } = await db.prepare(
        "SELECT * FROM Account WHERE MAIL = ?"
      )
        .bind(mail)
        .all();
      console.log(results);
      if (results.length === 0)
        resolve({ error: "Incorrect MAIL", results: null });
      else if (results[0].PASS === pass)
        resolve({ error: null, results: results[0].ID });
      else
        resolve({ error: "Incorrect PASS", results: null });
    } catch (e) {
      resolve({ error: e.message, results: null });
    }
  })
}