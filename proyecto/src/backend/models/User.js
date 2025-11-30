const pool = require('../config/database');

class User {
  // Obtener todos los usuarios
  static async findAll() {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT id, name, email, role, status, created_at FROM users');
      connection.release();
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Obtener usuario por ID
  static async findById(id) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT id, name, email, role, status FROM users WHERE id = ?', [id]);
      connection.release();
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Obtener usuario por email
  static async findByEmail(email) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
      connection.release();
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Crear nuevo usuario
  static async create(userData) {
    const { name, email, password, role = 'employee' } = userData;
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, password, role]
      );
      connection.release();
      return { id: result.insertId, name, email, role };
    } catch (error) {
      throw error;
    }
  }

  // Actualizar usuario
  static async update(id, userData) {
    const { name, email, role, status } = userData;
    try {
      const connection = await pool.getConnection();
      await connection.query(
        'UPDATE users SET name = ?, email = ?, role = ?, status = ? WHERE id = ?',
        [name, email, role, status, id]
      );
      connection.release();
      return { id, name, email, role, status };
    } catch (error) {
      throw error;
    }
  }

  // Eliminar usuario
  static async delete(id) {
    try {
      const connection = await pool.getConnection();
      await connection.query('DELETE FROM users WHERE id = ?', [id]);
      connection.release();
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
