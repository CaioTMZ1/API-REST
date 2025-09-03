import mysql from 'mysql2/promise';

const conexao = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'cursos',
  waitForConnections: true,
  connectionLimit: 10,
});

export default conexao;
