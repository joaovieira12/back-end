const pool = require('../config/database');

async function create({ name, year, shift, professor_id }) {
  const [result] = await pool.query(
    `INSERT INTO classes (name, year, shift, professor_id) VALUES (?, ?, ?, ?)`,
    [name, year, shift, professor_id || null]
  );
  const [rows] = await pool.query('SELECT * FROM classes WHERE id = ?', [result.insertId]);
  return rows[0];
}

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM classes ORDER BY id');
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM classes WHERE id = ?', [id]);
  return rows[0];
}

async function update(id, { name, year, shift, professor_id }) {
  await pool.query(
    `UPDATE classes SET name = ?, year = ?, shift = ?, professor_id = ? WHERE id = ?`,
    [name, year, shift, professor_id || null, id]
  );
  const [rows] = await pool.query('SELECT * FROM classes WHERE id = ?', [id]);
  return rows[0];
}

async function remove(id) {
  const [rows] = await pool.query('SELECT id FROM classes WHERE id = ?', [id]);
  if (!rows[0]) return undefined;
  await pool.query('DELETE FROM classes WHERE id = ?', [id]);
  return rows[0];
}

module.exports = { create, findAll, findById, update, remove };
