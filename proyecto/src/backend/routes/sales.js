const express = require('express');
const router = express.Router();
const SaleController = require('../controllers/SaleController');

// GET
router.get('/recent/:limit', SaleController.getRecentSales);
router.get('/statistics', SaleController.getStatistics);
router.get('/range', SaleController.getSalesByDateRange);
router.get('/:id', SaleController.getSaleById);
router.get('/', SaleController.getAllSales);

// POST
router.post('/', SaleController.createSale);

// PUT
router.put('/:id/status', SaleController.updateSaleStatus);

// DELETE
router.delete('/:id', SaleController.deleteSale);

module.exports = router;