const userModel = require('../models/userModel');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Preencha nome, email, senha e role.' });
    }

    const rolesPermitidas = ['admin', 'professor', 'aluno'];
    if (!rolesPermitidas.includes(role)) {
      return res.status(400).json({ error: 'Role inválida. Use admin, professor ou aluno.' });
    }

    const usuarioExistente = await userModel.findByEmail(email);
    if (usuarioExistente) {
      return res.status(409).json({ error: 'Já existe um usuário com esse email.' });
    }

    const hashedPassword = await hashPassword(password);
    const novoUsuario = await userModel.create({ name, email, password: hashedPassword, role });

    return res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).json({ error: 'Erro interno ao registrar usuário.' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Preencha email e senha.' });
    }

    const usuario = await userModel.findByEmail(email);
    if (!usuario) {
      return res.status(401).json({ error: 'Email ou senha inválidos.' });
    }

    const senhaValida = await comparePassword(password, usuario.password);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Email ou senha inválidos.' });
    }

    const token = generateToken(usuario);

    return res.json({
      token,
      user: { id: usuario.id, name: usuario.name, email: usuario.email, role: usuario.role },
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ error: 'Erro interno ao fazer login.' });
  }
}

module.exports = { register, login };
