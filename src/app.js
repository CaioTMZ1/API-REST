import express from 'express'
import conexao from '../infra/conexao.js'
const app = express()

//indicar para o express ler o body como json
app.use(express.json())

function buscarCursosPorId(id) {
    return cursos.filter(curso => curso.id == id)
}

function buscarIndexCurso(id) {
    return cursos.findIndex(curso => curso.id == id)
}

// Criando uma rota default (endpoint)
// app.get('/', (req, res) => {
//     res.send('Hello')
// })

//ROTAS
app.get('/materias', (req, res) => {
    // res.status(200).send(cursos)
    const sql = "select * from curso;"
    conexao.query(sql, (error, result) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).json(result)
        }
    })
})

app.post('/cursos', (req, res) => {
    const { disciplina } = req.body; // pega o valor do JSON enviado

    const sql = "INSERT INTO curso (disciplina) VALUES (?);";
    conexao.query(sql, [disciplina], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send("Erro ao inserir no banco.");
        } else {
            res.status(200).json({
                message: "Disciplina cadastrada com sucesso!",
                id: result.insertId,
                disciplina: disciplina
            });
        }
    });
});

app.get('/cursos/:id', (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM curso WHERE id = ?";

    conexao.query(sql, [id], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send("Erro ao buscar curso.");
        } else {
            if (result.length > 0) {
                res.status(200).json(result[0]); // retorna só o objeto do curso
            } else {
                res.status(404).json({ message: "Curso não encontrado" });
            }
        }
    });
});

app.delete('/cursos/:id', (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM curso WHERE id = ?";

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
});

app.put('/cursos/:id', (req, res) => {
    const { id } = req.params;
    const { disciplina } = req.body;

    const sql = "UPDATE curso SET disciplina = ? WHERE id = ?";

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
});

export default app