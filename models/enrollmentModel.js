const pool = require('../config/database');

async function create({ student_id, class_id }) {
  const [result] = await pool.query(
    `INSERT INTO enrollments (student_id, class_id) VALUES (?, ?)`,
    [student_id, class_id]
  );
  const [rows] = await pool.query('SELECT * FROM enrollments WHERE id = ?', [result.insertId]);
  return rows[0];
}

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM enrollments ORDER BY id');
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM enrollments WHERE id = ?', [id]);
  return rows[0];
}

async function findByStudent(student_id) {
  const [rows] = await pool.query('SELECT * FROM enrollments WHERE student_id = ?', [student_id]);
  return rows;
}

async function updateStatus(id, status) {
  await pool.query(`UPDATE enrollments SET status = ? WHERE id = ?`, [status, id]);
  const [rows] = await pool.query('SELECT * FROM enrollments WHERE id = ?', [id]);
  return rows[0];
}

async function remove(id) {
  const [rows] = await pool.query('SELECT id FROM enrollments WHERE id = ?', [id]);
  if (!rows[0]) return undefined;
  await pool.query('DELETE FROM enrollments WHERE id = ?', [id]);
  return rows[0];
}

module.exports = { create, findAll, findById, findByStudent, updateStatus, remove };
