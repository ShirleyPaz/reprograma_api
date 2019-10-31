const express = require('express');
const router = express.Router();
const professorasController = require('../controllers/professorasController');

router.get('/', professorasController.get);
router.get('/:id', professorasController.getById);
router.post('/', professorasController.post);

module.exports = router;