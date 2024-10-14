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