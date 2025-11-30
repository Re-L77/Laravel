-- Crear base de datos
CREATE DATABASE IF NOT EXISTS ecocycle;
USE ecocycle;

-- Tabla de materiales
CREATE TABLE IF NOT EXISTS materials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de ventas
CREATE TABLE IF NOT EXISTS sales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  material_id INT NOT NULL,
  quantity INT NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE CASCADE
);

-- Datos de ejemplo
INSERT INTO materials (name, category, price, stock) VALUES
('Plástico PET', 'Plástico', 2.50, 100),
('Aluminio', 'Metal', 5.00, 50),
('Vidrio', 'Vidrio', 1.50, 200),
('Papel', 'Papel', 0.75, 300),
('Cartón', 'Papel', 1.00, 250);
