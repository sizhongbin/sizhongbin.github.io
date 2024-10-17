export async function createEnemy(db) {
  return new Promise(async resolve => {
    try {
      const info = JSON.stringify({ hp: 10, str: 2 });
      const { results } = await db.prepare(
        "INSERT INTO Enemy (ID, NAME, INFO) VALUES (?1, ?2, ?3) RETURNING *"
      )
        .bind("10001", "Test Enemy", info)
        .all();
      resolve({ error: null, results: results });
    } catch (e) {
      resolve({ error: e.message, results: null });
    }
  })
}

export async function updateEnemy(db) {
  return new Promise(async resolve => {
    try {
      const info = JSON.stringify({ hp: 10, str: 1 });
      const { results } = await db.prepare(
        "UPDATE Enemy SET NAME = ?1, INFO = ?2 WHERE ID = ?3 RETURNING *"
      )
        .bind("Test Enemy", info, "10001")
        .all();
      resolve({ error: null, results: results });
    } catch (e) {
      resolve({ error: e.message, results: null });
    }
  })
}

export async function deleteEnemy(db) {
  return new Promise(async resolve => {
    try {
      const info = JSON.stringify({ hp: 10, str: 1 });
      const { results } = await db.prepare(
        "UPDATE Enemy SET NAME = ?1, INFO = ?2 WHERE ID = ?3 RETURNING *"
      )
        .bind("Test Enemy", info, "10001")
        .all();
      resolve({ error: null, results: results });
    } catch (e) {
      resolve({ error: e.message, results: null });
    }
  })
}