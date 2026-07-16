const classModel = require('../models/classModel');

async function create(req, res) {
  try {
    const { name, year, shift, professor_id } = req.body;

    if (!name || !year) {
      return res.status(400).json({ error: 'Preencha nome e ano da turma.' });
    }

    const turma = await classModel.create({ name, year, shift, professor_id });
    return res.status(201).json(turma);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao criar turma.' });
  }
}

async function findAll(req, res) {
  try {
    const turmas = await classModel.findAll();
    return res.json(turmas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao buscar turmas.' });
  }
}

async function findById(req, res) {
  try {
    const turma = await classModel.findById(req.params.id);
    if (!turma) {
      return res.status(404).json({ error: 'Turma não encontrada.' });
    }
    return res.json(turma);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao buscar turma.' });
  }
}

async function update(req, res) {
  try {
    const { name, year, shift, professor_id } = req.body;
    const turma = await classModel.update(req.params.id, { name, year, shift, professor_id });
    if (!turma) {
      return res.status(404).json({ error: 'Turma não encontrada.' });
    }
    return res.json(turma);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao atualizar turma.' });
  }
}

async function remove(req, res) {
  try {
    const turma = await classModel.remove(req.params.id);
    if (!turma) {
      return res.status(404).json({ error: 'Turma não encontrada.' });
    }
    return res.json({ message: 'Turma removida com sucesso.' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao remover turma.' });
  }
}

module.exports = { create, findAll, findById, update, remove };
