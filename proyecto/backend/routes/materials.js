const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// GET todos los materiales
router.get('/', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM materials');
        connection.release();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET material por ID
router.get('/:id', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM materials WHERE id = ?', [req.params.id]);
        connection.release();
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST crear material
router.post('/', async (req, res) => {
    try {
        const { name, category, price, stock } = req.body;
        const connection = await pool.getConnection();
        const [result] = await connection.query(
            'INSERT INTO materials (name, category, price, stock) VALUES (?, ?, ?, ?)',
            [name, category, price, stock]
        );
        connection.release();
        res.status(201).json({ id: result.insertId, message: 'Material creado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT actualizar material
router.put('/:id', async (req, res) => {
    try {
        const { name, category, price, stock } = req.body;
        const connection = await pool.getConnection();
        await connection.query(
            'UPDATE materials SET name = ?, category = ?, price = ?, stock = ? WHERE id = ?',
            [name, category, price, stock, req.params.id]
        );
        connection.release();
        res.json({ message: 'Material actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE material
router.delete('/:id', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        await connection.query('DELETE FROM materials WHERE id = ?', [req.params.id]);
        connection.release();
        res.json({ message: 'Material eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
