

// src/app/controllers/CursoController.js
import conexao from '../database/conexao.js';

class CursoController {
  // GET /materias
  index(req, res) {
    const sql = "SELECT * FROM curso;";
    conexao.query(sql, (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send("Erro ao listar cursos.");
      } else {
        res.status(200).json(result);
      }
    });
  }

  // GET /cursos/:id
  show(req, res) {
    const { id } = req.params;
    const sql = "SELECT * FROM curso WHERE id = ?;";
    conexao.query(sql, [id], (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send("Erro ao buscar curso.");
      } else {
        if (result.length > 0) {
          res.status(200).json(result[0]); // retorna só um curso
        } else {
          res.status(404).json({ message: "Curso não encontrado" });
        }
      }
    });
  }

  // POST /cursos
  store(req, res) {
    const { disciplina } = req.body;
    if (!disciplina) {
      res.status(400).json({ message: "Campo disciplina é obrigatório." });
    } else {
      const sql = "INSERT INTO curso (disciplina) VALUES (?);";
      conexao.query(sql, [disciplina], (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).send("Erro ao inserir no banco.");
        } else {
          res.status(201).json({
            message: "Disciplina cadastrada com sucesso!",
            id: result.insertId,
            disciplina: disciplina
          });
        }
      });
    }
  }

  // PUT /cursos/:id
  update(req, res) {
    const { id } = req.params;
    const { disciplina } = req.body;

    if (!disciplina) {
      res.status(400).json({ message: "Campo disciplina é obrigatório." });
    } else {
      const sql = "UPDATE curso SET disciplina = ? WHERE id = ?;";
      conexao.query(sql, [disciplina, id], (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).send("Erro ao atualizar curso.");
        } else {
          if (result.affectedRows > 0) {
            res.status(200).json({
              message: `Curso com id ${id} atualizado com sucesso!`,
              id: id,
              disciplina: disciplina
            });
          } else {
            res.status(404).json({ message: `Nenhum curso encontrado com id ${id}.` });
          }
        }
      });
    }
  }

  // DELETE /cursos/:id
  delete(req, res) {
    const { id } = req.params;
    const sql = "DELETE FROM curso WHERE id = ?;";
    conexao.query(sql, [id], (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send("Erro ao excluir curso.");
      } else {
        if (result.affectedRows > 0) {
          res.status(200).send(`O curso com id ${id} foi excluído com sucesso!`);
        } else {
          res.status(404).send(`Nenhum curso encontrado com id ${id}.`);
        }
      }
    });
  }
}

export default new CursoController();
