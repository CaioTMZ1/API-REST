import { Router } from 'express';
import CursoController from '../controllers/CursoController.js';

const router = Router();

// Listar cursos
router.get('/cursos', (req, res) => CursoController.index(req, res));

// // Buscar curso por ID
// router.get('/cursos/:id', (req, res) => CursoController.show(req, res));

// // Criar curso
// router.post('/cursos', (req, res) => CursoController.store(req, res));

// // Atualizar curso
// router.put('/cursos/:id', (req, res) => CursoController.update(req, res));

// // Deletar curso
// router.delete('/cursos/:id', (req, res) => CursoController.delete(req, res));

export default router;

