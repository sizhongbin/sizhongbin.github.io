export async function selectCharacterByAccount(account, db) {
  return new Promise(async resolve => {
    try {
      const { results } = await db.prepare(
        "SELECT * FROM Character WHERE ACCOUNT = ?"
      )
        .bind(account)
        .all();
      resolve({ error: null, results: results });
    } catch (e) {
      resolve({ error: e.message, results: null });
    }
  })
}

export async function selectCharacterById(id, db) {
  return new Promise(async resolve => {
    try {
      const { results } = await db.prepare(
        "SELECT * FROM Character WHERE ID = ?"
      )
        .bind(id)
        .all();
      resolve({ error: null, results: results });
    } catch (e) {
      resolve({ error: e.message, results: null });
    }
  })
}

export async function selectCharacterByName(name, db) {
  return new Promise(async resolve => {
    try {
      const { results } = await db.prepare(
        "SELECT * FROM Character WHERE NAME = ?"
      )
        .bind(name)
        .all();
      resolve({ error: null, results: results });
    } catch (e) {
      resolve({ error: e.message, results: null });
    }
  })
}

export async function createCharacter(name, account, db) {
  return new Promise(async resolve => {
    try {
      const patternName = /^.{4,16}$/;
      if (!patternName.test(name)) throw ({ message: "Invaild NAME format" });
      const infoPrivate = JSON.stringify({str:2});
      const infoPublic = JSON.stringify({hp:10});
      const { results } = await db.prepare(
        "INSERT INTO Character (ID, NAME, ACCOUNT, INFO_PRIVATE, INFO_PUBLIC) VALUES (lower(hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || hex(randomblob(2)) || '-' || hex(randomblob(2)) || '-' || hex(randomblob(6))), ?1, ?2, ?3, ?4) RETURNING ID"
      )
        .bind(name, account, infoPrivate, infoPublic)
        .all();
      resolve({ error: null, results: results[0].ID });
    } catch (e) {
      resolve({ error: e.message, results: null });
    }
  })
}

export async function deleteCharacter(name, db) {

}

export async function updateCharacter(name, publicInfo = null, privateInfo = null, db) {
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