// src/app.js
import express from 'express';
import CursoController from './app/controllers/CursoController.js';

const app = express();
app.use(express.json());

// ROTAS

//METODO GET MYSQL
app.get('/materias',   CursoController.index);

//METODO GET ID MYSQL
app.get('/cursos/:id', CursoController.show);

//METODO ADICIONAR MYSQL
app.post('/cursos',    CursoController.store);

//METODO ATUALIZAR MYSQL
app.put('/cursos/:id', CursoController.update);

//METODO REMOVER MYSQL
app.delete('/cursos/:id', CursoController.delete);

export default app;
