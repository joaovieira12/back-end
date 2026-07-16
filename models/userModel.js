const pool = require('../config/database');

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
// Todas as queries relacionadas à tabela "users".
// Camada de acesso a dados: não tem regra de negócio aqui, só SQL.
>>>>>>> 6c41af0022e6bb2d2a5bfcfdb1c0d4377d9fe0d1
>>>>>>> 1748ef494841da60ea2b610447600f67d3b7a12e

>>>>>>> 7b6f232381a8c9f0ec38a97b12208af6c42c67e3
async function create({ name, email, password, role }) {
  const result = await pool.query(
    `INSERT INTO users (name, email, password, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, role, created_at`,
    [name, email, password, role]
  );
  return result.rows[0];
}

async function findByEmail(email) {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
}

async function findById(id) {
  const result = await pool.query(
    'SELECT id, name, email, role, created_at FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

async function findAll() {
  const result = await pool.query(
    'SELECT id, name, email, role, created_at FROM users ORDER BY id'
  );
  return result.rows;
}

async function update(id, { name, email, role }) {
  const result = await pool.query(
    `UPDATE users SET name = $1, email = $2, role = $3
     WHERE id = $4
     RETURNING id, name, email, role, created_at`,
    [name, email, role, id]
  );
  return result.rows[0];
}

async function remove(id) {
  const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
  return result.rows[0];
}

module.exports = { create, findByEmail, findById, findAll, update, remove };
