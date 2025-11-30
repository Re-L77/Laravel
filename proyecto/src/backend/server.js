const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server running', message: 'API conectada correctamente' });
});

// Rutas de API
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/users'));
app.use('/api/materials', require('./routes/materials'));
app.use('/api/sales', require('./routes/sales'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor', details: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`API disponible en http://localhost:${PORT}/api`);
});