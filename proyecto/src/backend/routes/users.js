const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// POST /api/auth/login - Login
router.post('/login', UserController.login);

// GET /api/users - Obtener todos
router.get('/', UserController.getAllUsers);

// GET /api/users/:id - Obtener por ID
router.get('/:id', UserController.getUserById);

// POST /api/users - Crear nuevo
router.post('/', UserController.createUser);

// PUT /api/users/:id - Actualizar
router.put('/:id', UserController.updateUser);

// DELETE /api/users/:id - Eliminar
router.delete('/:id', UserController.deleteUser);

module.exports = router;
