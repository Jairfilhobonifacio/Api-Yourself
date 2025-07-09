import express from 'express';
import PontoDoacaoController from '../controllers/PontoDoacaoController.js';

const router = express.Router();

// Rotas adicionais
router.get('/necessidades', PontoDoacaoController.listarNecessidades);
router.get('/estatisticas', PontoDoacaoController.estatisticas);

// Rotas CRUD
router.get('/', PontoDoacaoController.listarTodos);
router.get('/id/:id', PontoDoacaoController.buscarPorId);
router.get('/cidade/:nome', PontoDoacaoController.buscarPorCidade);
router.post('/', PontoDoacaoController.criar);
router.put('/:id', PontoDoacaoController.atualizar);
router.delete('/:id', PontoDoacaoController.remover);

export default router;
