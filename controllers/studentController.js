const studentModel = require('../models/studentModel');

async function create(req, res) {
  try {
    const { name, email, birth_date, user_id } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Preencha nome e email do aluno.' });
    }

    const aluno = await studentModel.create({ name, email, birth_date, user_id });
    return res.status(201).json(aluno);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao criar aluno.' });
  }
}

async function findAll(req, res) {
  try {
    const alunos = await studentModel.findAll();
    return res.json(alunos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao buscar alunos.' });
  }
}

async function findById(req, res) {
  try {
    const aluno = await studentModel.findById(req.params.id);
    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado.' });
    }
    return res.json(aluno);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao buscar aluno.' });
  }
}

async function update(req, res) {
  try {
    const { name, email, birth_date } = req.body;
    const aluno = await studentModel.update(req.params.id, { name, email, birth_date });
    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado.' });
    }
    return res.json(aluno);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao atualizar aluno.' });
  }
}

async function remove(req, res) {
  try {
    const aluno = await studentModel.remove(req.params.id);
    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado.' });
    }
    return res.json({ message: 'Aluno removido com sucesso.' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao remover aluno.' });
  }
}

module.exports = { create, findAll, findById, update, remove };
