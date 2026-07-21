const pool = require('../config/database');

async function create({ name, email, birth_date, user_id }) {
  const [result] = await pool.query(
    `INSERT INTO students (name, email, birth_date, user_id) VALUES (?, ?, ?, ?)`,
    [name, email, birth_date, user_id || null]
  );
  const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [result.insertId]);
  return rows[0];
}

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM students ORDER BY id');
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);
  return rows[0];
}

async function update(id, { name, email, birth_date }) {
  await pool.query(
    `UPDATE students SET name = ?, email = ?, birth_date = ? WHERE id = ?`,
    [name, email, birth_date, id]
  );
  const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);
  return rows[0];
}

async function remove(id) {
  const [rows] = await pool.query('SELECT id FROM students WHERE id = ?', [id]);
  if (!rows[0]) return undefined;
  await pool.query('DELETE FROM students WHERE id = ?', [id]);
  return rows[0];
}

module.exports = { create, findAll, findById, update, remove };
