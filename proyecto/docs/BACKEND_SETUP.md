# EcoCycle - Setup Backend

## Instalación

### 1. Instalar MySQL
```bash
# Ubuntu/Debian
sudo apt-get install mysql-server

# macOS (Homebrew)
brew install mysql
```

### 2. Crear la base de datos
```bash
mysql -u root -p < database.sql
```
Deja la contraseña vacía o ingresa tu contraseña de MySQL.

### 3. Configurar variables de entorno
El archivo `.env` ya está configurado con valores por defecto:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ecocycle
DB_PORT=3306
PORT=3000
```

Modifica según tus credenciales de MySQL.

### 4. Iniciar el servidor
```bash
npm start          # Producción
npm run dev        # Desarrollo (con auto-reload)
```

El servidor correrá en `http://localhost:3000`

## Endpoints API

### Materiales
- `GET /api/materials` - Obtener todos
- `GET /api/materials/:id` - Obtener por ID
- `POST /api/materials` - Crear
- `PUT /api/materials/:id` - Actualizar
- `DELETE /api/materials/:id` - Eliminar

### Ventas
- `GET /api/sales` - Obtener todas
- `GET /api/sales/:id` - Obtener por ID
- `POST /api/sales` - Crear
- `DELETE /api/sales/:id` - Eliminar

## Conectar desde el frontend

Usa `fetch` para conectarte a la API:

```javascript
// Obtener materiales
fetch('http://localhost:3000/api/materials')
  .then(res => res.json())
  .then(data => console.log(data));

// Crear material
fetch('http://localhost:3000/api/materials', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Vidrio', category: 'Vidrio', price: 1.5, stock: 100 })
})
  .then(res => res.json())
  .then(data => console.log(data));
```
