import express from 'express'
const app = express()

//indicar para o express ler o body como json
app.use(express.json())

const cursos = [
    {id:1, disciplinas: 'ADS'},
    {id:2, disciplinas: 'ADS'},
    {id:3, disciplinas: 'ADS'},
    {id:4, disciplinas: 'ADS'}
]

// Criando uma rota default (endpoint)

function buscarCursosPorId(id) {
    return cursos.filter( curso => curso.id == id)
}

function buscarIndexCurso(id) {
    return cursos.findIndex( curso => curso.id == id)
}

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/cursos', (req, res) => {
    res.status(200).send(cursos)
})

app.post('/cursos', (req, res) => {
    cursos.push(req.body)
    res.status(200).send('Seleção cadastrada com sucesso!')
})

app.get('/cursos/:id', (req, res) => {
    // let index = req.params.id
    // console.log(index)
    res.json(buscarCursosPorId(req.params.id))
})

app.delete('/cursos/:id', (req, res) => {
    let index = buscarIndexCurso(req.params.id)
    cursos.splice(index, 1)
    console.log(index)
    res.send(`o curso com id ${req.params.id} excluído com sucesso!`)
})

app.put('/cursos/:id', (req, res) => {
    let index = buscarIndexCurso(req.params.id)
    cursos[index].disciplinas = req.body.disciplinas
    res.json(cursos)
})

export default app