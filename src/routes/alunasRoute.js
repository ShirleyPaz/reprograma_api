const express = require('express');
const router = express.Router();
const alunasController = require('../controllers/alunasController');
const fs = require('fs');

router.get('/', alunasController.get);
router.get('/nasceuSp', alunasController.getAlunasSp);
router.get('/:id', alunasController.getById);
router.get('/:id/livros', alunasController.getBooks);
router.get('/:id/idade', alunasController.getIdade);
router.post('/', alunasController.post);
router.post('/:id/livros', alunasController.postBooks);

module.exports = router;