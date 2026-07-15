const { Pool } = require('pg');
require('dotenv').config();

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
// Pool de conexões com o PostgreSQL.
// As credenciais vêm do .env (veja .env.example)
>>>>>>> 6c41af0022e6bb2d2a5bfcfdb1c0d4377d9fe0d1
>>>>>>> 1748ef494841da60ea2b610447600f67d3b7a12e
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.on('connect', () => {
  console.log('Conectado ao banco de dados PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Erro inesperado no pool do banco de dados:', err);
  process.exit(-1);
});

module.exports = pool;
