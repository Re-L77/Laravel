const User = require('../models/User');

class UserController {
  // GET /api/users - Obtener todos los usuarios
  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json({
        success: true,
        data: users,
        message: 'Usuarios obtenidos correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error al obtener usuarios',
        details: error.message
      });
    }
  }

  // GET /api/users/:id - Obtener usuario por ID
  static async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Usuario no encontrado'
        });
      }
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // POST /api/users - Crear nuevo usuario
  static async createUser(req, res) {
    try {
      const { name, email, password, role } = req.body;

      // Validaciones
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Campos requeridos: name, email, password'
        });
      }

      // Verificar si existe
      const existing = await User.findByEmail(email);
      if (existing) {
        return res.status(400).json({
          success: false,
          error: 'El email ya está registrado'
        });
      }

      const user = await User.create({ name, email, password, role });
      res.status(201).json({
        success: true,
        data: user,
        message: 'Usuario creado correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // PUT /api/users/:id - Actualizar usuario
  static async updateUser(req, res) {
    try {
      const { name, email, role, status } = req.body;
      const user = await User.update(req.params.id, { name, email, role, status });
      res.json({
        success: true,
        data: user,
        message: 'Usuario actualizado correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // DELETE /api/users/:id - Eliminar usuario
  static async deleteUser(req, res) {
    try {
      await User.delete(req.params.id);
      res.json({
        success: true,
        message: 'Usuario eliminado correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // POST /api/auth/login - Login
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email y contraseña requeridos'
        });
      }

      const user = await User.findByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({
          success: false,
          error: 'Email o contraseña incorrectos'
        });
      }

      res.json({
        success: true,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        message: 'Login exitoso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = UserController;
