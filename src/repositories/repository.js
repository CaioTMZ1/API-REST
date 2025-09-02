import conexao from '../database/conexao.js';

class CursoRepository {
  async findAll() {
    const [rows] = await conexao.query('SELECT * FROM curso;');
    return rows;
  }

  async findById(id) {
    const [rows] = await conexao.query('SELECT * FROM curso WHERE id = ? LIMIT 1;', [id]);
    return rows[0] || null;
  }

  async addDisciplina(disciplina) {
    const [result] = await conexao.query(
      'INSERT INTO curso (disciplina) VALUES (?);',
      [disciplina]
    );
    return { id: result.insertId, disciplina };
  }

  async updtCurso(id, disciplina) {
    const [result] = await conexao.query(
      'UPDATE curso SET disciplina = ? WHERE id = ?;',
      [disciplina, id]
    );
    return { affectedRows: result.affectedRows };
  }

  async deleteCurso(id) {
    const [result] = await conexao.query(
      'DELETE FROM curso WHERE id = ?;',
      [id]
    );
    return { affectedRows: result.affectedRows };
  }
}

export default new CursoRepository();
