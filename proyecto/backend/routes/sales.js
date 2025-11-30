const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// GET todas las ventas
router.get('/', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM sales');
        connection.release();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET venta por ID
router.get('/:id', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM sales WHERE id = ?', [req.params.id]);
        connection.release();
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST crear venta
router.post('/', async (req, res) => {
    try {
        const { material_id, quantity, total_price, date } = req.body;
        const connection = await pool.getConnection();
        const [result] = await connection.query(
            'INSERT INTO sales (material_id, quantity, total_price, date) VALUES (?, ?, ?, ?)',
            [material_id, quantity, total_price, date]
        );
        connection.release();
        res.status(201).json({ id: result.insertId, message: 'Venta registrada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE venta
router.delete('/:id', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        await connection.query('DELETE FROM sales WHERE id = ?', [req.params.id]);
        connection.release();
        res.json({ message: 'Venta eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
