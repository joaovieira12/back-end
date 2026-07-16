const pool = require('../config/database');

async function create({ name, year, shift, professor_id }) {
  const result = await pool.query(
    `INSERT INTO classes (name, year, shift, professor_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, year, shift, professor_id || null]
  );
  return result.rows[0];
}

async function findAll() {
  const result = await pool.query('SELECT * FROM classes ORDER BY id');
  return result.rows;
}

async function findById(id) {
  const result = await pool.query('SELECT * FROM classes WHERE id = $1', [id]);
  return result.rows[0];
}

async function update(id, { name, year, shift, professor_id }) {
  const result = await pool.query(
    `UPDATE classes SET name = $1, year = $2, shift = $3, professor_id = $4
     WHERE id = $5
     RETURNING *`,
    [name, year, shift, professor_id || null, id]
  );
  return result.rows[0];
}

async function remove(id) {
  const result = await pool.query('DELETE FROM classes WHERE id = $1 RETURNING id', [id]);
  return result.rows[0];
}

module.exports = { create, findAll, findById, update, remove };
