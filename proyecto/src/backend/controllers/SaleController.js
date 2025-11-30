const Sale = require('../models/Sale');
const Material = require('../models/Material');

class SaleController {
  // GET /api/sales - Obtener todas las ventas
  static async getAllSales(req, res) {
    try {
      const sales = await Sale.findAll();
      res.json({
        success: true,
        data: sales,
        count: sales.length,
        message: 'Ventas obtenidas correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error al obtener ventas',
        details: error.message
      });
    }
  }

  // GET /api/sales/:id - Obtener venta por ID
  static async getSaleById(req, res) {
    try {
      const sale = await Sale.findById(req.params.id);
      if (!sale) {
        return res.status(404).json({
          success: false,
          error: 'Venta no encontrada'
        });
      }
      res.json({
        success: true,
        data: sale
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // GET /api/sales/recent/:limit - Obtener ventas recientes
  static async getRecentSales(req, res) {
    try {
      const limit = parseInt(req.params.limit) || 10;
      const sales = await Sale.getRecent(limit);
      res.json({
        success: true,
        data: sales,
        count: sales.length
      });
    } catch (error) {
      console.error('Error getting recent sales:', error);
      res.status(500).json({
        success: false,
        error: 'Error al obtener ventas recientes',
        details: error.message
      });
    }
  }

  // GET /api/sales/range - Obtener ventas por rango de fechas
  static async getSalesByDateRange(req, res) {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: 'startDate y endDate son requeridos'
        });
      }

      const sales = await Sale.findByDateRange(startDate, endDate);
      res.json({
        success: true,
        data: sales,
        count: sales.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // POST /api/sales - Crear venta
  static async createSale(req, res) {
    try {
      const { material_id, user_id, quantity, unit_price } = req.body;

      // Validaciones
      if (!material_id || !user_id || !quantity || !unit_price) {
        return res.status(400).json({
          success: false,
          error: 'Campos requeridos: material_id, user_id, quantity, unit_price'
        });
      }

      // Verificar que el material existe y hay stock
      const material = await Material.findById(material_id);
      if (!material) {
        return res.status(404).json({
          success: false,
          error: 'Material no encontrado'
        });
      }

      if (material.stock < quantity) {
        return res.status(400).json({
          success: false,
          error: `Stock insuficiente. Stock disponible: ${material.stock}`
        });
      }

      // Calcular totales
      const total_price = quantity * unit_price;
      const commission = total_price * 0.10; // 10% de comisión
      const net_price = total_price - commission;

      // Crear venta
      const sale = await Sale.create({
        material_id,
        user_id,
        quantity,
        unit_price,
        total_price,
        commission,
        net_price
      });

      // Actualizar stock del material
      const newStock = material.stock - quantity;
      await Material.updateStock(material_id, newStock);

      res.status(201).json({
        success: true,
        data: {
          ...sale,
          total_price,
          commission,
          net_price,
          new_stock: newStock
        },
        message: 'Venta registrada correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // PUT /api/sales/:id - Actualizar estado de venta
  static async updateSaleStatus(req, res) {
    try {
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({
          success: false,
          error: 'Status es requerido'
        });
      }

      await Sale.updateStatus(req.params.id, status);

      res.json({
        success: true,
        message: 'Estado de venta actualizado',
        data: { id: req.params.id, status }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // DELETE /api/sales/:id - Eliminar venta
  static async deleteSale(req, res) {
    try {
      await Sale.delete(req.params.id);
      res.json({
        success: true,
        message: 'Venta eliminada correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // GET /api/sales/statistics - Obtener estadísticas
  static async getStatistics(req, res) {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: 'startDate y endDate son requeridos'
        });
      }

      const stats = await Sale.getStatistics(startDate, endDate);

      res.json({
        success: true,
        data: stats,
        period: { startDate, endDate }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = SaleController;
