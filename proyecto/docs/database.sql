-- Crear base de datos
CREATE DATABASE IF NOT EXISTS ecocycle;
USE ecocycle;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'employee', 'manager') DEFAULT 'employee',
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de materiales
CREATE TABLE IF NOT EXISTS materials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  category VARCHAR(50) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  unit VARCHAR(20) DEFAULT 'kg',
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de ventas
CREATE TABLE IF NOT EXISTS sales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  material_id INT NOT NULL,
  user_id INT,
  quantity DECIMAL(10, 2) NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  commission DECIMAL(10, 2) DEFAULT 0,
  net_price DECIMAL(10, 2),
  sale_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  status ENUM('completed', 'pending', 'cancelled') DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_sales_material FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE CASCADE,
  CONSTRAINT fk_sales_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Tabla de transacciones (entrada/salida de materiales)
CREATE TABLE IF NOT EXISTS transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  material_id INT NOT NULL,
  type ENUM('entrada', 'salida') NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  price DECIMAL(10, 2),
  description VARCHAR(255),
  transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_transactions_material FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE CASCADE
);

-- Tabla de reportes
CREATE TABLE IF NOT EXISTS reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  type ENUM('daily', 'weekly', 'monthly', 'custom') DEFAULT 'daily',
  start_date DATE,
  end_date DATE,
  total_sales DECIMAL(12, 2),
  total_quantity DECIMAL(12, 2),
  total_commission DECIMAL(12, 2),
  data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar usuario por defecto
INSERT INTO users (name, email, password, role) VALUES
('Admin EcoCycle', 'admin@ecocycle.com', '123456', 'admin'),
('Gerente Operaciones', 'manager@ecocycle.com', '123456', 'manager'),
('Empleado Reciclaje', 'employee@ecocycle.com', '123456', 'employee');

-- Insertar datos de ejemplo
INSERT INTO materials (name, category, description, price, stock, unit, image_url) VALUES
('Plástico PET', 'Plástico', 'Botellas y envases de plástico PET', 2.50, 1000, 'kg', 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=400&h=300&fit=crop'),
('Aluminio', 'Metal', 'Latas y residuos de aluminio', 5.00, 500, 'kg', 'https://images.unsplash.com/photo-1578894381726-3e3d3f0b8cd2?w=400&h=300&fit=crop'),
('Vidrio', 'Vidrio', 'Botellas y envases de vidrio', 1.50, 750, 'kg', 'https://images.unsplash.com/photo-1578502494516-5c959c65a0a0?w=400&h=300&fit=crop'),
('Papel', 'Papel', 'Papel blanco y periódico', 0.75, 1200, 'kg', 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop'),
('Cartón', 'Papel', 'Cajas y cartón corrugado', 1.00, 900, 'kg', 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=300&fit=crop');

-- Insertar transacciones de ejemplo
INSERT INTO transactions (material_id, type, quantity, price, description) VALUES
(1, 'entrada', 100, 2.50, 'Compra de PET reciclado'),
(2, 'entrada', 50, 5.00, 'Compra de aluminio'),
(3, 'entrada', 75, 1.50, 'Compra de vidrio'),
(4, 'entrada', 120, 0.75, 'Compra de papel'),
(5, 'entrada', 90, 1.00, 'Compra de cartón');

-- Insertar ventas de ejemplo
INSERT INTO sales (material_id, user_id, quantity, unit_price, total_price, commission, net_price, status) VALUES
(1, 1, 50, 2.50, 125.00, 12.50, 112.50, 'completed'),
(2, 1, 25, 5.00, 125.00, 12.50, 112.50, 'completed'),
(3, 1, 30, 1.50, 45.00, 4.50, 40.50, 'completed'),
(4, 1, 80, 0.75, 60.00, 6.00, 54.00, 'completed'),
(5, 1, 40, 1.00, 40.00, 4.00, 36.00, 'completed');
