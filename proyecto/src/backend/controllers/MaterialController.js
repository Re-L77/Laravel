const Material = require('../models/Material');

class MaterialController {
  // GET /api/materials - Obtener todos los materiales
  static async getAllMaterials(req, res) {
    try {
      const materials = await Material.findAll();
      res.json({
        success: true,
        data: materials,
        message: 'Materiales obtenidos correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error al obtener materiales',
        details: error.message
      });
    }
  }

  // GET /api/materials/:id - Obtener material por ID
  static async getMaterialById(req, res) {
    try {
      const material = await Material.findById(req.params.id);
      if (!material) {
        return res.status(404).json({
          success: false,
          error: 'Material no encontrado'
        });
      }
      res.json({
        success: true,
        data: material
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // GET /api/materials/category/:category - Obtener por categoría
  static async getMaterialsByCategory(req, res) {
    try {
      const materials = await Material.findByCategory(req.params.category);
      res.json({
        success: true,
        data: materials,
        count: materials.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // GET /api/materials/categories - Obtener categorías
  static async getCategories(req, res) {
    try {
      const categories = await Material.getCategories();
      res.json({
        success: true,
        data: categories,
        count: categories.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // POST /api/materials - Crear material
  static async createMaterial(req, res) {
    try {
      const { name, category, description, price, stock, unit, image_url } = req.body;

      // Validaciones
      if (!name || !category || !price) {
        return res.status(400).json({
          success: false,
          error: 'Campos requeridos: name, category, price'
        });
      }

      const material = await Material.create({
        name,
        category,
        description,
        price,
        stock: stock || 0,
        unit: unit || 'kg',
        image_url
      });

      res.status(201).json({
        success: true,
        data: material,
        message: 'Material creado correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // PUT /api/materials/:id - Actualizar material
  static async updateMaterial(req, res) {
    try {
      const { name, category, description, price, stock, unit, image_url } = req.body;

      const material = await Material.update(req.params.id, {
        name,
        category,
        description,
        price,
        stock,
        unit,
        image_url
      });

      res.json({
        success: true,
        data: material,
        message: 'Material actualizado correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // PATCH /api/materials/:id/stock - Actualizar stock
  static async updateStock(req, res) {
    try {
      const { newStock } = req.body;

      if (newStock === undefined) {
        return res.status(400).json({
          success: false,
          error: 'newStock es requerido'
        });
      }

      await Material.updateStock(req.params.id, newStock);

      res.json({
        success: true,
        message: 'Stock actualizado correctamente',
        data: { id: req.params.id, newStock }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // DELETE /api/materials/:id - Eliminar material
  static async deleteMaterial(req, res) {
    try {
      await Material.delete(req.params.id);
      res.json({
        success: true,
        message: 'Material eliminado correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = MaterialController;
