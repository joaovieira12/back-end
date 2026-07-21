const pool = require('../config/database');

async function create({ enrollment_id, term, value }) {
  const [result] = await pool.query(
    `INSERT INTO grades (enrollment_id, term, value) VALUES (?, ?, ?)`,
    [enrollment_id, term, value]
  );
  const [rows] = await pool.query('SELECT * FROM grades WHERE id = ?', [result.insertId]);
  return rows[0];
}

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM grades ORDER BY id');
  return rows;
}

async function findByEnrollment(enrollment_id) {
  const [rows] = await pool.query('SELECT * FROM grades WHERE enrollment_id = ?', [enrollment_id]);
  return rows;
}

async function update(id, { term, value }) {
  await pool.query(`UPDATE grades SET term = ?, value = ? WHERE id = ?`, [term, value, id]);
  const [rows] = await pool.query('SELECT * FROM grades WHERE id = ?', [id]);
  return rows[0];
}

async function remove(id) {
  const [rows] = await pool.query('SELECT id FROM grades WHERE id = ?', [id]);
  if (!rows[0]) return undefined;
  await pool.query('DELETE FROM grades WHERE id = ?', [id]);
  return rows[0];
}

module.exports = { create, findAll, findByEnrollment, update, remove };
