const express = require('express');
const { getCursos, createCurso, updateCurso, deleteCurso, toggleExibir, getCursoById, createPessoaInscrita, getPessoasPorCurso } = require('../controllers/cursoController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', getCursos);
router.get('/:id', getCursoById);
router.post('/', auth, createCurso);
router.put('/:id', auth, updateCurso);
router.delete('/:id', auth, deleteCurso);
router.patch('/:id/exibir', auth, toggleExibir);

// Inscrição pública
router.post('/:id/inscrever', createPessoaInscrita);
// Listar inscritos (admin)
router.get('/:id/inscritos', auth, getPessoasPorCurso);

module.exports = router;