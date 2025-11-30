// API Service - Centralized API communication
const API = (() => {
    const BASE_URL = 'http://localhost:3000/api';

    // Auth endpoints
    const auth = {
        login: async (email, password) => {
            try {
                const response = await fetch(`${BASE_URL}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'Login failed');
                }

                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Login error:', error);
                throw error;
            }
        }
    };

    // Materials endpoints
    const materials = {
        getAll: async () => {
            try {
                const response = await fetch(`${BASE_URL}/materials`);
                if (!response.ok) throw new Error('Failed to fetch materials');
                return await response.json();
            } catch (error) {
                console.error('Get materials error:', error);
                throw error;
            }
        },

        getById: async (id) => {
            try {
                const response = await fetch(`${BASE_URL}/materials/${id}`);
                if (!response.ok) throw new Error('Failed to fetch material');
                return await response.json();
            } catch (error) {
                console.error('Get material error:', error);
                throw error;
            }
        },

        getByCategory: async (category) => {
            try {
                const response = await fetch(`${BASE_URL}/materials?category=${category}`);
                if (!response.ok) throw new Error('Failed to fetch materials by category');
                return await response.json();
            } catch (error) {
                console.error('Get materials by category error:', error);
                throw error;
            }
        },

        create: async (material) => {
            try {
                const response = await fetch(`${BASE_URL}/materials`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(material)
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'Failed to create material');
                }

                return await response.json();
            } catch (error) {
                console.error('Create material error:', error);
                throw error;
            }
        },

        update: async (id, material) => {
            try {
                const response = await fetch(`${BASE_URL}/materials/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(material)
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'Failed to update material');
                }

                return await response.json();
            } catch (error) {
                console.error('Update material error:', error);
                throw error;
            }
        },

        updateStock: async (id, quantity) => {
            try {
                const response = await fetch(`${BASE_URL}/materials/${id}/stock`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ quantity })
                });

                if (!response.ok) throw new Error('Failed to update stock');
                return await response.json();
            } catch (error) {
                console.error('Update stock error:', error);
                throw error;
            }
        },

        delete: async (id) => {
            try {
                const response = await fetch(`${BASE_URL}/materials/${id}`, {
                    method: 'DELETE'
                });

                if (!response.ok) throw new Error('Failed to delete material');
                return await response.json();
            } catch (error) {
                console.error('Delete material error:', error);
                throw error;
            }
        }
    };

    // Sales endpoints
    const sales = {
        getAll: async () => {
            try {
                const response = await fetch(`${BASE_URL}/sales`);
                if (!response.ok) throw new Error('Failed to fetch sales');
                return await response.json();
            } catch (error) {
                console.error('Get sales error:', error);
                throw error;
            }
        },

        getRecent: async (limit = 10) => {
            try {
                const response = await fetch(`${BASE_URL}/sales/recent/${limit}`);
                if (!response.ok) throw new Error('Failed to fetch recent sales');
                return await response.json();
            } catch (error) {
                console.error('Get recent sales error:', error);
                throw error;
            }
        },

        getByDateRange: async (startDate, endDate) => {
            try {
                const response = await fetch(`${BASE_URL}/sales?startDate=${startDate}&endDate=${endDate}`);
                if (!response.ok) throw new Error('Failed to fetch sales by date range');
                return await response.json();
            } catch (error) {
                console.error('Get sales by date range error:', error);
                throw error;
            }
        },

        getStatistics: async () => {
            try {
                const response = await fetch(`${BASE_URL}/sales/statistics`);
                if (!response.ok) throw new Error('Failed to fetch sales statistics');
                return await response.json();
            } catch (error) {
                console.error('Get sales statistics error:', error);
                throw error;
            }
        },

        create: async (sale) => {
            try {
                const response = await fetch(`${BASE_URL}/sales`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(sale)
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'Failed to create sale');
                }

                return await response.json();
            } catch (error) {
                console.error('Create sale error:', error);
                throw error;
            }
        },

        updateStatus: async (id, status) => {
            try {
                const response = await fetch(`${BASE_URL}/sales/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status })
                });

                if (!response.ok) throw new Error('Failed to update sale status');
                return await response.json();
            } catch (error) {
                console.error('Update sale status error:', error);
                throw error;
            }
        },

        delete: async (id) => {
            try {
                const response = await fetch(`${BASE_URL}/sales/${id}`, {
                    method: 'DELETE'
                });

                if (!response.ok) throw new Error('Failed to delete sale');
                return await response.json();
            } catch (error) {
                console.error('Delete sale error:', error);
                throw error;
            }
        }
    };

    // Users endpoints
    const users = {
        getAll: async () => {
            try {
                const response = await fetch(`${BASE_URL}/users`);
                if (!response.ok) throw new Error('Failed to fetch users');
                return await response.json();
            } catch (error) {
                console.error('Get users error:', error);
                throw error;
            }
        },

        getById: async (id) => {
            try {
                const response = await fetch(`${BASE_URL}/users/${id}`);
                if (!response.ok) throw new Error('Failed to fetch user');
                return await response.json();
            } catch (error) {
                console.error('Get user error:', error);
                throw error;
            }
        },

        create: async (user) => {
            try {
                const response = await fetch(`${BASE_URL}/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'Failed to create user');
                }

                return await response.json();
            } catch (error) {
                console.error('Create user error:', error);
                throw error;
            }
        },

        update: async (id, user) => {
            try {
                const response = await fetch(`${BASE_URL}/users/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });

                if (!response.ok) throw new Error('Failed to update user');
                return await response.json();
            } catch (error) {
                console.error('Update user error:', error);
                throw error;
            }
        },

        delete: async (id) => {
            try {
                const response = await fetch(`${BASE_URL}/users/${id}`, {
                    method: 'DELETE'
                });

                if (!response.ok) throw new Error('Failed to delete user');
                return await response.json();
            } catch (error) {
                console.error('Delete user error:', error);
                throw error;
            }
        }
    };

    return {
        auth,
        materials,
        sales,
        users
    };
})();
