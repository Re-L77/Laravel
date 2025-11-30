// API Service Module - Para usar en el frontend
// Guarda este archivo en: js/modules/api.js

const API = (() => {
  const BASE_URL = 'http://localhost:3000/api';

  // ============ USUARIOS ============

  // Login
  const login = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.data));
      }
      return data;
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: error.message };
    }
  };

  // Obtener usuario actual
  const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('user');
  };

  // ============ MATERIALES ============

  // Obtener todos los materiales
  const getMaterials = async () => {
    try {
      const response = await fetch(`${BASE_URL}/materials`);
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { success: false, error: error.message };
    }
  };

  // Obtener material por ID
  const getMaterialById = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/materials/${id}`);
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { success: false, error: error.message };
    }
  };

  // Obtener categorías
  const getCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/materials/categories`);
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { success: false, error: error.message };
    }
  };

  // Obtener materiales por categoría
  const getMaterialsByCategory = async (category) => {
    try {
      const response = await fetch(`${BASE_URL}/materials/category/${category}`);
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { success: false, error: error.message };
    }
  };

  // Crear material
  const createMaterial = async (materialData) => {
    try {
      const response = await fetch(`${BASE_URL}/materials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(materialData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { success: false, error: error.message };
    }
  };

  // Actualizar material
  const updateMaterial = async (id, materialData) => {
    try {
      const response = await fetch(`${BASE_URL}/materials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(materialData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { success: false, error: error.message };
    }
  };

  // Actualizar stock
  const updateStock = async (id, newStock) => {
    try {
      const response = await fetch(`${BASE_URL}/materials/${id}/stock`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newStock })
      });
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { success: false, error: error.message };
    }
  };

  // Eliminar material
  const deleteMaterial = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/materials/${id}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { success: false, error: error.message };
    }
  };

  // ============ VENTAS ============

  // Obtener todas las ventas
  const getSales = async () => {
    try {
      const response = await fetch(`${BASE_URL}/sales`);
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { success: false, error: error.message };
    }
  };

  // Obtener venta por ID
  const getSaleById = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/sales/${id}`);
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { success: false, error: error.message };
    }
  };

  // Obtener ventas recientes
  const getRecentSales = async (limit = 10) => {
    try {
      const response = await fetch(`${BASE_URL}/sales/recent/${limit}`);
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { success: false, error: error.message };
    }
  };

  // Obtener ventas por rango de fechas
  const getSalesByDateRange = async (startDate, endDate) => {
    try {
      const response = await fetch(
        `${BASE_URL}/sales/range?startDate=${startDate}&endDate=${endDate}`
      );
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { success: false, error: error.message };
    }
  };

  // Registrar venta
  const createSale = async (saleData) => {
    try {
      const response = await fetch(`${BASE_URL}/sales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saleData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { success: false, error: error.message };
    }
  };

  // Obtener estadísticas
  const getStatistics = async (startDate, endDate) => {
    try {
      const response = await fetch(
        `${BASE_URL}/sales/statistics?startDate=${startDate}&endDate=${endDate}`
      );
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { success: false, error: error.message };
    }
  };

  // Cambiar estado de venta
  const updateSaleStatus = async (id, status) => {
    try {
      const response = await fetch(`${BASE_URL}/sales/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { success: false, error: error.message };
    }
  };

  // Eliminar venta
  const deleteSale = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/sales/${id}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { success: false, error: error.message };
    }
  };

  // API pública
  return {
    // Autenticación
    login,
    logout,
    getCurrentUser,

    // Materiales
    getMaterials,
    getMaterialById,
    getCategories,
    getMaterialsByCategory,
    createMaterial,
    updateMaterial,
    updateStock,
    deleteMaterial,

    // Ventas
    getSales,
    getSaleById,
    getRecentSales,
    getSalesByDateRange,
    createSale,
    getStatistics,
    updateSaleStatus,
    deleteSale
  };
})();

// ============ EJEMPLOS DE USO ============

/*
// Login
const result = await API.login('admin@ecocycle.com', '123456');
if (result.success) {
  console.log('Bienvenido:', result.data.name);
  const user = API.getCurrentUser(); // Obtener usuario actual
}

// Obtener todos los materiales
const materials = await API.getMaterials();
console.log(materials.data); // Array de materiales

// Filtrar por categoría
const plastics = await API.getMaterialsByCategory('Plástico');

// Crear nuevo material
const newMaterial = await API.createMaterial({
  name: 'Cobre Reciclado',
  category: 'Metal',
  description: 'Alambre de cobre',
  price: 8.75,
  stock: 100,
  unit: 'kg'
});

// Registrar una venta
const user = API.getCurrentUser();
const sale = await API.createSale({
  material_id: 1,
  user_id: user.id,
  quantity: 50,
  unit_price: 2.50
});
// Automáticamente calcula:
// - total_price: 125
// - commission: 12.50
// - net_price: 112.50
// - y actualiza el stock

// Obtener ventas recientes
const recent = await API.getRecentSales(5);

// Obtener estadísticas
const today = new Date().toISOString().split('T')[0];
const stats = await API.getStatistics(today, today);
console.log('Ventas hoy:', stats.data.total_sales);
console.log('Ingresos:', stats.data.total_revenue);

// Logout
API.logout();
*/
