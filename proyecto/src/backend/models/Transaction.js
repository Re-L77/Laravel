const pool = require('../config/database');

class Transaction {
  // Obtener todas las transacciones
  static async findAll() {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(`
        SELECT 
          t.id, t.material_id, t.type, t.quantity, t.price,
          t.description, t.transaction_date,
          m.name as material_name, m.category
        FROM transactions t
        LEFT JOIN materials m ON t.material_id = m.id
        ORDER BY t.transaction_date DESC
      `);
      connection.release();
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Obtener transacciones por material
  static async findByMaterial(materialId) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(`
        SELECT * FROM transactions 
        WHERE material_id = ? 
        ORDER BY transaction_date DESC
      `, [materialId]);
      connection.release();
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Obtener transacciones por tipo
  static async findByType(type) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(`
        SELECT 
          t.id, t.material_id, t.type, t.quantity, t.price,
          t.description, t.transaction_date,
          m.name as material_name
        FROM transactions t
        LEFT JOIN materials m ON t.material_id = m.id
        WHERE t.type = ? 
        ORDER BY t.transaction_date DESC
      `, [type]);
      connection.release();
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Crear transacción
  static async create(transactionData) {
    const { material_id, type, quantity, price, description } = transactionData;
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query(
        `INSERT INTO transactions 
         (material_id, type, quantity, price, description) 
         VALUES (?, ?, ?, ?, ?)`,
        [material_id, type, quantity, price, description]
      );
      connection.release();
      return { id: result.insertId, material_id, type, quantity };
    } catch (error) {
      throw error;
    }
  }

  // Eliminar transacción
  static async delete(id) {
    try {
      const connection = await pool.getConnection();
      await connection.query('DELETE FROM transactions WHERE id = ?', [id]);
      connection.release();
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Obtener movimientos recientes
  static async getRecent(limit = 20) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(`
        SELECT 
          t.id, t.material_id, t.type, t.quantity, t.price,
          t.description, t.transaction_date,
          m.name as material_name, m.category
        FROM transactions t
        LEFT JOIN materials m ON t.material_id = m.id
        ORDER BY t.transaction_date DESC
        LIMIT ?
      `, [limit]);
      connection.release();
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Transaction;
