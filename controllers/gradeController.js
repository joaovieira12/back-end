const gradeModel = require('../models/gradeModel');

async function create(req, res) {
  try {
    const { enrollment_id, term, value } = req.body;

    if (!enrollment_id || !term || value === undefined) {
      return res.status(400).json({ error: 'Preencha enrollment_id, term e value.' });
    }

    if (value < 0 || value > 10) {
      return res.status(400).json({ error: 'A nota deve ser entre 0 e 10.' });
    }

    const nota = await gradeModel.create({ enrollment_id, term, value });
    return res.status(201).json(nota);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao lançar nota.' });
  }
}

async function findAll(req, res) {
  try {
    const notas = await gradeModel.findAll();
    return res.json(notas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao buscar notas.' });
  }
}

async function findByEnrollment(req, res) {
  try {
    const notas = await gradeModel.findByEnrollment(req.params.enrollmentId);
    return res.json(notas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao buscar notas da matrícula.' });
  }
}

async function update(req, res) {
  try {
    const { term, value } = req.body;
    const nota = await gradeModel.update(req.params.id, { term, value });
    if (!nota) {
      return res.status(404).json({ error: 'Nota não encontrada.' });
    }
    return res.json(nota);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao atualizar nota.' });
  }
}

async function remove(req, res) {
  try {
    const nota = await gradeModel.remove(req.params.id);
    if (!nota) {
      return res.status(404).json({ error: 'Nota não encontrada.' });
    }
    return res.json({ message: 'Nota removida com sucesso.' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao remover nota.' });
  }
}

module.exports = { create, findAll, findByEnrollment, update, remove };
