const pool = require('../config/database');

async function create({ student_id, class_id }) {
  const result = await pool.query(
    `INSERT INTO enrollments (student_id, class_id)
     VALUES ($1, $2)
     RETURNING *`,
    [student_id, class_id]
  );
  return result.rows[0];
}

async function findAll() {
  const result = await pool.query('SELECT * FROM enrollments ORDER BY id');
  return result.rows;
}

async function findById(id) {
  const result = await pool.query('SELECT * FROM enrollments WHERE id = $1', [id]);
  return result.rows[0];
}

async function findByStudent(student_id) {
  const result = await pool.query('SELECT * FROM enrollments WHERE student_id = $1', [student_id]);
  return result.rows;
}

async function updateStatus(id, status) {
  const result = await pool.query(
    `UPDATE enrollments SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id]
  );
  return result.rows[0];
}

async function remove(id) {
  const result = await pool.query('DELETE FROM enrollments WHERE id = $1 RETURNING id', [id]);
  return result.rows[0];
}

module.exports = { create, findAll, findById, findByStudent, updateStatus, remove };
