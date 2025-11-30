const pool = require('../config/database');

class Material {
  // Obtener todos los materiales
  static async findAll() {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(
        'SELECT id, name, category, description, price, stock, unit, image_url, created_at FROM materials ORDER BY name'
      );
      connection.release();
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Obtener material por ID
  static async findById(id) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM materials WHERE id = ?', [id]);
      connection.release();
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Obtener materiales por categoría
  static async findByCategory(category) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(
        'SELECT * FROM materials WHERE category = ? ORDER BY name',
        [category]
      );
      connection.release();
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Crear material
  static async create(materialData) {
    const { name, category, description, price, stock, unit = 'kg', image_url } = materialData;
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query(
        'INSERT INTO materials (name, category, description, price, stock, unit, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, category, description, price, stock, unit, image_url]
      );
      connection.release();
      return { id: result.insertId, name, category, price, stock };
    } catch (error) {
      throw error;
    }
  }

  // Actualizar material
  static async update(id, materialData) {
    const { name, category, description, price, stock, unit, image_url } = materialData;
    try {
      const connection = await pool.getConnection();
      await connection.query(
        'UPDATE materials SET name = ?, category = ?, description = ?, price = ?, stock = ?, unit = ?, image_url = ? WHERE id = ?',
        [name, category, description, price, stock, unit, image_url, id]
      );
      connection.release();
      return { id, name, category, price, stock };
    } catch (error) {
      throw error;
    }
  }

  // Actualizar stock
  static async updateStock(id, newStock) {
    try {
      const connection = await pool.getConnection();
      await connection.query('UPDATE materials SET stock = ? WHERE id = ?', [newStock, id]);
      connection.release();
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Eliminar material
  static async delete(id) {
    try {
      const connection = await pool.getConnection();
      await connection.query('DELETE FROM materials WHERE id = ?', [id]);
      connection.release();
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Obtener categorías únicas
  static async getCategories() {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(
        'SELECT DISTINCT category FROM materials WHERE category IS NOT NULL ORDER BY category'
      );
      connection.release();
      return rows.map(row => row.category);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Material;
