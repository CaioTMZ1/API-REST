// src/app/controllers/CursoController.js
import CursoRepository from '../repositories/repository.js';

class CursoController {
  // GET /cursos
  async index(req, res) {
    try {
      const cursos = await CursoRepository.findAll();
      res.status(200).json(cursos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao listar cursos." });
    }
  }

  // GET /cursos/:id
  async show(req, res) {
    try {
      const { id } = req.params;
      const curso = await CursoRepository.findById(id);

      if (!curso) {
        return res.status(404).json({ message: "Curso não encontrado" });
      }

      res.status(200).json(curso);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar curso." });
    }
  }

  // POST /cursos
  async store(req, res) {
    try {
      const { disciplina } = req.body;

      if (!disciplina) {
        return res.status(400).json({ message: "Campo disciplina é obrigatório." });
      }

      const novoCurso = await CursoRepository.addDisciplina(disciplina);

      res.status(201).json({
        message: "Disciplina cadastrada com sucesso!",
        ...novoCurso,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao inserir no banco." });
    }
  }

  // PUT /cursos/:id
  async update(req, res) {
    try {
      const { id } = req.params;
      const { disciplina } = req.body;

      if (!disciplina) {
        return res.status(400).json({ message: "Campo disciplina é obrigatório." });
      }

      const result = await CursoRepository.updtCurso(id, disciplina);

      if (result.affectedRows > 0) {
        res.status(200).json({
          message: `Curso com id ${id} atualizado com sucesso!`,
          id,
          disciplina,
        });
      } else {
        res.status(404).json({ message: `Nenhum curso encontrado com id ${id}.` });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao atualizar curso." });
    }
  }

  // DELETE /cursos/:id
  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await CursoRepository.deleteCurso(id);

      if (result.affectedRows > 0) {
        res.status(200).json({ message: `O curso com id ${id} foi excluído com sucesso!` });
      } else {
        res.status(404).json({ message: `Nenhum curso encontrado com id ${id}.` });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao excluir curso." });
    }
  }
}

export default new CursoController();
