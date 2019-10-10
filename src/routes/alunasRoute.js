const express = require('express');
const router = express.Router();
const alunasController = require('../controllers/alunasController');

router.get('/', alunasController.get);
router.get('/nasceuSp', alunasController.getAlunasSp);
router.get('/:id', alunasController.getById);
router.get('/:id/livros', alunasController.getBooks);

module.exports = router;