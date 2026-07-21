const pool = require('../config/database');

async function create({ name, email, password, role }) {
  const [result] = await pool.query(
    `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
    [name, email, password, role]
  );
  const [rows] = await pool.query(
    'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
    [result.insertId]
  );
  return rows[0];
}

async function findByEmail(email) {
  const emailNormalizado = String(email || '').trim().toLowerCase();
  const [rows] = await pool.query('SELECT * FROM users WHERE LOWER(email) = ?', [emailNormalizado]);
  return rows[0];
}

async function findById(id) {
  const [rows] = await pool.query(
    'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
    [id]
  );
  return rows[0];
}

async function findAll() {
  const [rows] = await pool.query(
    'SELECT id, name, email, role, created_at FROM users ORDER BY id'
  );
  return rows;
}

async function update(id, { name, email, role }) {
  await pool.query(
    `UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?`,
    [name, email, role, id]
  );
  const [rows] = await pool.query(
    'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
    [id]
  );
  return rows[0];
}

async function remove(id) {
  const [rows] = await pool.query('SELECT id FROM users WHERE id = ?', [id]);
  if (!rows[0]) return undefined;
  await pool.query('DELETE FROM users WHERE id = ?', [id]);
  return rows[0];
}

async function updatePassword(id, password) {
  await pool.query('UPDATE users SET password = ? WHERE id = ?', [password, id]);
}

module.exports = { create, findByEmail, findById, findAll, update, remove, updatePassword };
