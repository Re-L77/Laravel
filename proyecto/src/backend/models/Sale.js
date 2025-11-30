const pool = require('../config/database');

class Sale {
  // Obtener todas las ventas
  static async findAll() {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(`
        SELECT 
          s.id, s.material_id, s.user_id, s.quantity, s.unit_price,
          s.total_price, s.commission, s.net_price, s.sale_date, s.status,
          m.name as material_name, m.category,
          u.name as user_name
        FROM sales s
        LEFT JOIN materials m ON s.material_id = m.id
        LEFT JOIN users u ON s.user_id = u.id
        ORDER BY s.sale_date DESC
      `);
      connection.release();
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Obtener venta por ID
  static async findById(id) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(`
        SELECT 
          s.*, m.name as material_name, m.category,
          u.name as user_name
        FROM sales s
        LEFT JOIN materials m ON s.material_id = m.id
        LEFT JOIN users u ON s.user_id = u.id
        WHERE s.id = ?
      `, [id]);
      connection.release();
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Obtener ventas recientes
  static async getRecent(limit = 10) {
    try {
      const connection = await pool.getConnection();
      const limitValue = Math.max(1, Math.min(parseInt(limit) || 10, 1000)); // Entre 1 y 1000
      const [rows] = await connection.query(`
        SELECT 
          s.id, s.material_id, s.quantity, s.unit_price,
          s.total_price, s.commission, s.net_price, s.sale_date,
          m.name as material_name, m.category
        FROM sales s
        LEFT JOIN materials m ON s.material_id = m.id
        WHERE s.status = 'completed'
        ORDER BY s.sale_date DESC
        LIMIT ${limitValue}
      `);
      connection.release();
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Obtener ventas por rango de fechas
  static async findByDateRange(startDate, endDate) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(`
        SELECT 
          s.id, s.material_id, s.quantity, s.unit_price,
          s.total_price, s.commission, s.net_price, s.sale_date,
          m.name as material_name, m.category
        FROM sales s
        LEFT JOIN materials m ON s.material_id = m.id
        WHERE s.sale_date >= ? AND s.sale_date <= ? AND s.status = 'completed'
        ORDER BY s.sale_date DESC
      `, [startDate, endDate]);
      connection.release();
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Crear venta
  static async create(saleData) {
    const { material_id, user_id, quantity, unit_price, total_price, commission, net_price } = saleData;
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query(
        `INSERT INTO sales 
         (material_id, user_id, quantity, unit_price, total_price, commission, net_price) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [material_id, user_id, quantity, unit_price, total_price, commission, net_price]
      );
      connection.release();
      return { id: result.insertId, material_id, quantity, total_price };
    } catch (error) {
      throw error;
    }
  }

  // Actualizar estado de venta
  static async updateStatus(id, status) {
    try {
      const connection = await pool.getConnection();
      await connection.query('UPDATE sales SET status = ? WHERE id = ?', [status, id]);
      connection.release();
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Eliminar venta
  static async delete(id) {
    try {
      const connection = await pool.getConnection();
      await connection.query('DELETE FROM sales WHERE id = ?', [id]);
      connection.release();
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Obtener estadísticas de ventas
  static async getStatistics(startDate, endDate) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(`
        SELECT 
          COUNT(*) as total_sales,
          SUM(quantity) as total_quantity,
          SUM(total_price) as total_revenue,
          SUM(commission) as total_commission,
          AVG(total_price) as average_sale
        FROM sales
        WHERE sale_date >= ? AND sale_date <= ? AND status = 'completed'
      `, [startDate, endDate]);
      connection.release();
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Sale;
