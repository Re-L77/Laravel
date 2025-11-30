# 🏗️ Estructura MVC - EcoCycle Backend

## 📋 Resumen Ejecutivo

El backend de EcoCycle implementa el patrón **MVC (Model-View-Controller)** con Node.js + Express + MySQL:

- **Models**: Clases que manejan la lógica de datos
- **Controllers**: Controladores que procesan las peticiones HTTP
- **Routes**: Rutas que definen los endpoints de la API
- **Config**: Configuración de conexión a BD

---

## 🗂️ Estructura de Carpetas

```
backend/
├── config/
│   └── database.js          # Conexión a MariaDB/MySQL
│
├── models/
│   ├── User.js              # Modelo de usuarios
│   ├── Material.js          # Modelo de materiales
│   ├── Sale.js              # Modelo de ventas
│   └── Transaction.js       # Modelo de transacciones
│
├── controllers/
│   ├── UserController.js    # Controlador de usuarios
│   ├── MaterialController.js# Controlador de materiales
│   └── SaleController.js    # Controlador de ventas
│
└── routes/
    ├── users.js             # Rutas de usuarios
    ├── materials.js         # Rutas de materiales
    └── sales.js             # Rutas de ventas
```

---

## 🗃️ Modelos de Datos

### 1. Users (Usuarios)

**Tabla:**
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'employee', 'manager') DEFAULT 'employee',
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Métodos disponibles:**
- `User.findAll()` - Obtener todos
- `User.findById(id)` - Obtener por ID
- `User.findByEmail(email)` - Buscar por email
- `User.create(userData)` - Crear nuevo
- `User.update(id, userData)` - Actualizar
- `User.delete(id)` - Eliminar

---

### 2. Materials (Materiales)

**Tabla:**
```sql
CREATE TABLE materials (
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
```

**Métodos disponibles:**
- `Material.findAll()` - Obtener todos
- `Material.findById(id)` - Obtener por ID
- `Material.findByCategory(category)` - Filtrar por categoría
- `Material.getCategories()` - Listar categorías únicas
- `Material.create(materialData)` - Crear material
- `Material.update(id, materialData)` - Actualizar
- `Material.updateStock(id, newStock)` - Actualizar stock
- `Material.delete(id)` - Eliminar

---

### 3. Sales (Ventas)

**Tabla:**
```sql
CREATE TABLE sales (
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
  FOREIGN KEY (material_id) REFERENCES materials(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**Métodos disponibles:**
- `Sale.findAll()` - Obtener todas
- `Sale.findById(id)` - Obtener por ID
- `Sale.getRecent(limit)` - Últimas ventas
- `Sale.findByDateRange(start, end)` - Por rango de fechas
- `Sale.create(saleData)` - Crear venta
- `Sale.updateStatus(id, status)` - Cambiar estado
- `Sale.getStatistics(start, end)` - Estadísticas
- `Sale.delete(id)` - Eliminar

---

### 4. Transactions (Transacciones)

**Tabla:**
```sql
CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  material_id INT NOT NULL,
  type ENUM('entrada', 'salida') NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  price DECIMAL(10, 2),
  description VARCHAR(255),
  transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (material_id) REFERENCES materials(id)
);
```

---

## 🎮 Controladores

### UserController
Gestiona autenticación y usuarios.

**Métodos:**
- `getAllUsers(req, res)` - Obtener todos los usuarios
- `getUserById(req, res)` - Obtener por ID
- `createUser(req, res)` - Crear nuevo usuario
- `updateUser(req, res)` - Actualizar usuario
- `deleteUser(req, res)` - Eliminar usuario
- `login(req, res)` - Autenticar usuario

### MaterialController
Gestiona materiales reciclables.

**Métodos:**
- `getAllMaterials(req, res)` - Listar todos
- `getMaterialById(req, res)` - Obtener uno
- `getMaterialsByCategory(req, res)` - Filtrar por categoría
- `getCategories(req, res)` - Listar categorías
- `createMaterial(req, res)` - Crear material
- `updateMaterial(req, res)` - Actualizar
- `updateStock(req, res)` - Actualizar stock
- `deleteMaterial(req, res)` - Eliminar

### SaleController
Gestiona ventas y transacciones.

**Métodos:**
- `getAllSales(req, res)` - Listar todas
- `getSaleById(req, res)` - Obtener una
- `getRecentSales(req, res)` - Ventas recientes
- `getSalesByDateRange(req, res)` - Por rango de fechas
- `createSale(req, res)` - Registrar venta
- `updateSaleStatus(req, res)` - Cambiar estado
- `getStatistics(req, res)` - Estadísticas
- `deleteSale(req, res)` - Eliminar venta

---

## 🔗 API REST Endpoints

### Autenticación

```bash
POST /api/auth/login
```
**Body:**
```json
{
  "email": "admin@ecocycle.com",
  "password": "123456"
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Admin EcoCycle",
    "email": "admin@ecocycle.com",
    "role": "admin"
  },
  "message": "Login exitoso"
}
```

---

### Usuarios

```bash
# Obtener todos
GET /api/users

# Obtener por ID
GET /api/users/:id

# Crear
POST /api/users
Body: { name, email, password, role }

# Actualizar
PUT /api/users/:id
Body: { name, email, role, status }

# Eliminar
DELETE /api/users/:id
```

---

### Materiales

```bash
# Obtener todos (ordenados por nombre)
GET /api/materials

# Obtener por ID
GET /api/materials/:id

# Obtener categorías
GET /api/materials/categories

# Filtrar por categoría
GET /api/materials/category/:category

# Crear material
POST /api/materials
Body: {
  "name": "Plástico PET",
  "category": "Plástico",
  "description": "Botellas plásticas",
  "price": 2.50,
  "stock": 100,
  "unit": "kg",
  "image_url": "https://..."
}

# Actualizar material
PUT /api/materials/:id
Body: { name, category, description, price, stock, unit, image_url }

# Actualizar stock
PATCH /api/materials/:id/stock
Body: { "newStock": 150 }

# Eliminar material
DELETE /api/materials/:id
```

---

### Ventas

```bash
# Obtener todas las ventas
GET /api/sales

# Obtener venta por ID
GET /api/sales/:id

# Obtener ventas recientes (últimas N)
GET /api/sales/recent/10

# Obtener por rango de fechas
GET /api/sales/range?startDate=2025-01-01&endDate=2025-12-31

# Obtener estadísticas
GET /api/sales/statistics?startDate=2025-01-01&endDate=2025-12-31

# Registrar nueva venta
POST /api/sales
Body: {
  "material_id": 1,
  "user_id": 1,
  "quantity": 50,
  "unit_price": 2.50
}
Response:
{
  "success": true,
  "data": {
    "id": 1,
    "material_id": 1,
    "quantity": 50,
    "total_price": 125.00,
    "commission": 12.50,
    "net_price": 112.50,
    "new_stock": 950
  },
  "message": "Venta registrada correctamente"
}

# Cambiar estado de venta
PUT /api/sales/:id/status
Body: { "status": "completed" }

# Eliminar venta
DELETE /api/sales/:id
```

---

## 🔄 Flujo de una Venta

```
1. Usuario selecciona material
   └─> GET /api/materials/1

2. Usuario ingresa cantidad y registra venta
   └─> POST /api/sales
   Body: {
     "material_id": 1,
     "user_id": 1,
     "quantity": 50,
     "unit_price": 2.50
   }

3. Backend:
   a. Valida que el material existe
   b. Valida que hay stock suficiente
   c. Calcula: Total = 50 × 2.50 = $125
   d. Calcula: Comisión = $125 × 10% = $12.50
   e. Calcula: Neto = $125 - $12.50 = $112.50
   f. Crea registro en tabla sales
   g. Actualiza stock: 1000 - 50 = 950
   h. Retorna datos de la venta

4. Response:
   {
     "success": true,
     "data": {
       "id": 123,
       "total_price": 125.00,
       "commission": 12.50,
       "net_price": 112.50,
       "new_stock": 950
     }
   }
```

---

## 📊 Ejemplo: Obtener Estadísticas

```bash
GET /api/sales/statistics?startDate=2025-11-01&endDate=2025-11-30
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total_sales": 45,
    "total_quantity": 2350,
    "total_revenue": 5250.75,
    "total_commission": 525.08,
    "average_sale": 116.68
  },
  "period": {
    "startDate": "2025-11-01",
    "endDate": "2025-11-30"
  }
}
```

---

## 🚀 Ejemplo: Crear Material

```bash
POST /api/materials
Content-Type: application/json

{
  "name": "Cobre Reciclado",
  "category": "Metal",
  "description": "Alambre y tuberías de cobre",
  "price": 8.75,
  "stock": 250,
  "unit": "kg",
  "image_url": "https://via.placeholder.com/150?text=Cobre"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 6,
    "name": "Cobre Reciclado",
    "category": "Metal",
    "price": 8.75,
    "stock": 250
  },
  "message": "Material creado correctamente"
}
```

---

## ✅ Validaciones Implementadas

### En Ventas:
- ✅ Material debe existir
- ✅ Cantidad debe ser > 0
- ✅ Stock debe ser suficiente
- ✅ Se descuenta stock automáticamente

### En Materiales:
- ✅ Nombre debe ser único
- ✅ Precio debe ser mayor a 0
- ✅ Categoría requerida

### En Usuarios:
- ✅ Email debe ser único
- ✅ Email y contraseña requeridos para login
- ✅ Campos obligatorios: name, email, password

---

## 🔐 Códigos HTTP

| Código | Significado | Uso |
|--------|-------------|-----|
| 200 | OK | Solicitud exitosa (GET, PUT) |
| 201 | Created | Recurso creado (POST) |
| 400 | Bad Request | Datos inválidos o incompletos |
| 404 | Not Found | Recurso no encontrado |
| 500 | Server Error | Error interno del servidor |

---

## 📝 Ejemplo de Respuesta de Error

```json
{
  "success": false,
  "error": "Stock insuficiente. Stock disponible: 50"
}
```

---

## 🔗 Relaciones entre Tablas

```
users ──────┐
            │
            ├──→ sales ──→ materials
            │
transactions ──→ materials
```

---

## 🛠️ Stack Tecnológico

- **Node.js** 25.2.1
- **Express** 5.1.0
- **MySQL2/Promise** 3.15.3
- **Dotenv** 17.2.3
- **CORS** 2.8.5

---

## 🚀 Iniciar el Servidor

```bash
# Desarrollo (con auto-reload)
npm run dev

# Producción
npm start

# Ambos servidores (backend + frontend)
npm run all
```

---

## 📚 Notas Importantes

1. **Autenticación**: Actualmente usa credenciales simples. Para producción, usar JWT tokens.
2. **Contraseñas**: Se guardan en texto plano. Usar bcrypt para hash.
3. **CORS**: Habilitado para todos los orígenes. Configurar según necesidad.
4. **Transacciones**: Hay tabla de transacciones pero no se usa aún en el flujo.
5. **Comisión**: Hardcodeada al 10% en ventas.

---

## 🔄 Próximas Mejoras

- [ ] Implementar JWT para autenticación
- [ ] Hash de contraseñas con bcrypt
- [ ] Validación de entrada más robusta
- [ ] Paginación en listados
- [ ] Búsqueda full-text
- [ ] Filtros avanzados
- [ ] Auditoría de cambios
- [ ] Integración con transacciones reales

---

**Última actualización**: Noviembre 30, 2025
