const enrollmentModel = require('../models/enrollmentModel');

async function create(req, res) {
  try {
    const { student_id, class_id } = req.body;

    if (!student_id || !class_id) {
      return res.status(400).json({ error: 'Preencha student_id e class_id.' });
    }

    const matricula = await enrollmentModel.create({ student_id, class_id });
    return res.status(201).json(matricula);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao criar matrícula.' });
  }
}

async function findAll(req, res) {
  try {
    const matriculas = await enrollmentModel.findAll();
    return res.json(matriculas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao buscar matrículas.' });
  }
}

async function findById(req, res) {
  try {
    const matricula = await enrollmentModel.findById(req.params.id);
    if (!matricula) {
      return res.status(404).json({ error: 'Matrícula não encontrada.' });
    }
    return res.json(matricula);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao buscar matrícula.' });
  }
}

async function findByStudent(req, res) {
  try {
    const matriculas = await enrollmentModel.findByStudent(req.params.studentId);
    return res.json(matriculas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao buscar matrículas do aluno.' });
  }
}

async function updateStatus(req, res) {
  try {
    const { status } = req.body;
    const matricula = await enrollmentModel.updateStatus(req.params.id, status);
    if (!matricula) {
      return res.status(404).json({ error: 'Matrícula não encontrada.' });
    }
    return res.json(matricula);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao atualizar matrícula.' });
  }
}

async function remove(req, res) {
  try {
    const matricula = await enrollmentModel.remove(req.params.id);
    if (!matricula) {
      return res.status(404).json({ error: 'Matrícula não encontrada.' });
    }
    return res.json({ message: 'Matrícula removida com sucesso.' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao remover matrícula.' });
  }
}

module.exports = { create, findAll, findById, findByStudent, updateStatus, remove };
