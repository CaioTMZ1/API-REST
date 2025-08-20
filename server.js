import app from './src/app.js'

// import conexao from './infra/conexao.js'

const port = 3000

// Estabelecer a conexão 
// conexao.connect((error) => {

// if (error) {
//     console.error(error,'erro na conexão:');
// } else {
//     console.log ('conectado com sucesso!')
//     //Listening (Escutando)
//     app.listen(port, () => {
//     console.log(`Servidor rodando em http://localhost:${port}`)
// })
//     }
// })


//listening escutando
 app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})