// Script de teste manual — roda na SUA máquina, onde o Postgres está.
// Uso: node test-connection.js
require('dotenv').config();
const pool = require('./config/database');
const userModel = require('./models/userModel');
const { hashPassword } = require('./utils/hash');

async function main() {
  console.log('Testando conexão com o banco...');

  // Testa se a conexão abre e o Postgres responde
  const resultado = await pool.query('SELECT NOW() AS agora');
  console.log('Conexão OK. Hora do servidor:', resultado.rows[0].agora);

  // Testa o userModel criando um usuário de teste
  const email = `teste_${Date.now()}@exemplo.com`;
  const senhaHash = await hashPassword('123456');

  const novoUsuario = await userModel.create({
    name: 'Usuário de Teste',
    email,
    password: senhaHash,
    role: 'admin',
  });
  console.log('Usuário criado:', novoUsuario);

  const encontrado = await userModel.findByEmail(email);
  console.log('Usuário encontrado por email:', encontrado.email);

  const todos = await userModel.findAll();
  console.log(`Total de usuários no banco: ${todos.length}`);

  // Limpa o usuário de teste
  await userModel.remove(novoUsuario.id);
  console.log('Usuário de teste removido. Tudo certo!');

  await pool.end();
}

main().catch((err) => {
  console.error('Erro no teste:', err.message);
  process.exit(1);
});
