const pool = require('../config/database');

async function create({ enrollment_id, term, value }) {
  const result = await pool.query(
    `INSERT INTO grades (enrollment_id, term, value)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [enrollment_id, term, value]
  );
  return result.rows[0];
}

async function findAll() {
  const result = await pool.query('SELECT * FROM grades ORDER BY id');
  return result.rows;
}

async function findByEnrollment(enrollment_id) {
  const result = await pool.query('SELECT * FROM grades WHERE enrollment_id = $1', [enrollment_id]);
  return result.rows;
}

async function update(id, { term, value }) {
  const result = await pool.query(
    `UPDATE grades SET term = $1, value = $2 WHERE id = $3 RETURNING *`,
    [term, value, id]
  );
  return result.rows[0];
}

async function remove(id) {
  const result = await pool.query('DELETE FROM grades WHERE id = $1 RETURNING id', [id]);
  return result.rows[0];
}

module.exports = { create, findAll, findByEnrollment, update, remove };
