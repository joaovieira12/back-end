const userModel = require('../models/userModel');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

async function register(req, res) {
  try {
    const name = req.body.name || req.body.nome || req.body.fullName;
    const email = req.body.email || req.body.mail || req.body.usuario || req.body.username;
    const password = req.body.password || req.body.senha || req.body.senhaUsuario;
    const roleInput = req.body.role || req.body.tipo || req.body.perfil || req.body.roleName;

    if (!name || !email || !password || !roleInput) {
      return res.status(400).json({ error: 'Preencha nome, email, senha e role.' });
    }

    const role = String(roleInput).toLowerCase();
    const rolesPermitidas = ['admin', 'professor', 'aluno'];
    const aliases = { admin: ['admin', 'administrador', 'adm'], professor: ['professor', 'prof', 'docente'], aluno: ['aluno', 'student', 'estudante'] };
    const roleNormalizada = Object.keys(aliases).find((item) => aliases[item].includes(role));

    if (!roleNormalizada) {
      return res.status(400).json({ error: 'Role invalida. Use admin, professor ou aluno.' });
    }

    const emailNormalizado = String(email).trim().toLowerCase();
    const usuarioExistente = await userModel.findByEmail(emailNormalizado);
    if (usuarioExistente) {
      return res.status(409).json({ error: 'Ja existe um usuario com esse email.' });
    }

    const hashedPassword = await hashPassword(password);
    const novoUsuario = await userModel.create({ name, email: emailNormalizado, password: hashedPassword, role: roleNormalizada });

    return res.status(201).json(novoUsuario);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao registrar usuario.' });
  }
}

async function login(req, res) {
  try {
    const email = req.body.email || req.body.mail || req.body.usuario || req.body.username;
    const password = req.body.password || req.body.senha || req.body.senhaUsuario;

    if (!email || !password) {
      return res.status(400).json({ error: 'Preencha email e senha.' });
    }

    const emailNormalizado = String(email).trim().toLowerCase();
    const usuario = await userModel.findByEmail(emailNormalizado);
    if (!usuario) {
      return res.status(401).json({ error: 'Email ou senha invalidos.' });
    }

    const senhaValida = await comparePassword(password, usuario.password);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Email ou senha invalidos.' });
    }

    if (typeof usuario.password === 'string' && !usuario.password.startsWith('$2')) {
      const hashedPassword = await hashPassword(password);
      await userModel.updatePassword(usuario.id, hashedPassword);
      usuario.password = hashedPassword;
    }

    const token = generateToken(usuario);

    return res.json({
      token,
      user: { id: usuario.id, name: usuario.name, email: usuario.email, role: usuario.role },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao fazer login.' });
  }
}

module.exports = { register, login };
