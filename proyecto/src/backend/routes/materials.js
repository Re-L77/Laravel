const express = require('express');
const router = express.Router();
const MaterialController = require('../controllers/MaterialController');

// GET
router.get('/', MaterialController.getAllMaterials);
router.get('/categories', MaterialController.getCategories);
router.get('/category/:category', MaterialController.getMaterialsByCategory);
router.get('/:id', MaterialController.getMaterialById);

// POST
router.post('/', MaterialController.createMaterial);

// PUT
router.put('/:id', MaterialController.updateMaterial);
router.patch('/:id/stock', MaterialController.updateStock);

// DELETE
router.delete('/:id', MaterialController.deleteMaterial);

module.exports = router;