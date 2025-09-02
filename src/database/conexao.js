import mysql from 'mysql'

const conexao = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "cursos"
});

conexao.connect();

export default conexao;