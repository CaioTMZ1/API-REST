// src/app.js
import express from 'express';
import CursoRoutes from './app/routes/CursoRoutes.js';

const app = express();

app.use(express.json());

app.use('/api', CursoRoutes);


export default app;
