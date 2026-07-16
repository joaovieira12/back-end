const pool = require('../config/database');

async function create({ name, email, birth_date, user_id }) {
  const result = await pool.query(
    `INSERT INTO students (name, email, birth_date, user_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, email, birth_date, user_id || null]
  );
  return result.rows[0];
}

async function findAll() {
  const result = await pool.query('SELECT * FROM students ORDER BY id');
  return result.rows;
}

async function findById(id) {
  const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
  return result.rows[0];
}

async function update(id, { name, email, birth_date }) {
  const result = await pool.query(
    `UPDATE students SET name = $1, email = $2, birth_date = $3
     WHERE id = $4
     RETURNING *`,
    [name, email, birth_date, id]
  );
  return result.rows[0];
}

async function remove(id) {
  const result = await pool.query('DELETE FROM students WHERE id = $1 RETURNING id', [id]);
  return result.rows[0];
}

module.exports = { create, findAll, findById, update, remove };
