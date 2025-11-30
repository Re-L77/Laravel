## 🔗 Integración Frontend - API Backend

### Estado de Conexión: ✅ COMPLETADO

Todos los módulos frontend han sido conectados exitosamente con la API backend.

---

## 📋 Módulos Integrados

### 1. **API Service** (`js/api.js`)
Servicio centralizado que gestiona todas las peticiones HTTP a la API.

**Endpoints disponibles:**
- `API.auth.login(email, password)` - Autenticación
- `API.materials.getAll()` - Obtener todos los materiales
- `API.materials.create()` - Crear material
- `API.materials.update()` - Actualizar material
- `API.materials.delete()` - Eliminar material
- `API.sales.getAll()` - Obtener todas las ventas
- `API.sales.create()` - Registrar venta
- `API.sales.getRecent()` - Últimas ventas
- `API.users.getAll()` - Obtener usuarios

---

### 2. **Authentication Module** (`js/modules/auth.js`)

**Cambios realizados:**
- ✅ Integración con `API.auth.login()`
- ✅ Validación de credenciales contra base de datos
- ✅ Almacenamiento de usuario en localStorage
- ✅ Manejo de errores con toasts

**Ejemplo de flujo:**
```javascript
// Antes: validación local hardcodeada
if (email === 'admin@ecocycle.com' && password === 'admin123')

// Ahora: autenticación contra API
const response = await API.auth.login(email, password);
```

---

### 3. **Materials Module** (`js/modules/materials.js`)

**Funcionalidad integrada:**

| Operación | Antes | Ahora |
|-----------|-------|-------|
| Obtener materiales | localStorage | `API.materials.getAll()` |
| Agregar material | localStorage.push | `API.materials.create()` |
| Actualizar material | localStorage update | `API.materials.update()` |
| Eliminar material | Array splice | `API.materials.delete()` |
| Buscar materiales | Array filter | API + filtrado local |

**Flujo de datos:**
```
1. Materials.initialize() → API.materials.getAll()
2. Datos → materials array (en memoria)
3. Materials.render() → Renderiza datos
4. Add/Edit/Delete → API calls → Update local array
```

---

### 4. **Sales Module** (`js/modules/sales.js`)

**Funcionalidad integrada:**

| Operación | Antes | Ahora |
|-----------|-------|-------|
| Obtener ventas | datos hardcodeados | `API.sales.getRecent()` |
| Registrar venta | localStorage | `API.sales.create()` |
| Cargar materiales | datos locales | `API.materials.getAll()` |
| Calcular comisión | manual | automática (10%) |

**Nuevas características:**
- ✅ Carga dinámica de materiales en dropdown
- ✅ Precio actualizado según material seleccionado
- ✅ Cálculo automático de comisión (10%)
- ✅ Almacenamiento de ventas en BD

---

### 5. **UI Module** (`js/modules/ui.js`)
Sin cambios - Gestiona interfaz de usuario
- Muestra/oculta pantallas
- Gestiona sidebar
- Muestra notificaciones (toasts)

---

## 🔌 Endpoints API Utilizados

### Login
```
POST /api/auth/login
Body: { email, password }
Response: { success, data: { id, email, role }, message }
```

### Materiales
```
GET /api/materials              → Lista todos
POST /api/materials             → Crear
PUT /api/materials/:id          → Actualizar
DELETE /api/materials/:id       → Eliminar
```

### Ventas
```
GET /api/sales/recent/:limit    → Últimas ventas
POST /api/sales                 → Registrar venta
GET /api/sales/statistics       → Estadísticas
```

---

## 🧪 Datos de Prueba

**API devuelve materiales reales:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Plástico PET",
      "category": "Plástico",
      "price": "2.50",
      "stock": 1000,
      "unit": "kg"
    },
    {
      "id": 2,
      "name": "Aluminio",
      "category": "Metal",
      "price": "5.00",
      "stock": 500,
      "unit": "kg"
    }
    // ... más materiales
  ]
}
```

---

## 🚀 Cómo Usar

### Ejecutar el proyecto completo:
```bash
npm run all
```

Esto inicia:
- **Backend API**: http://localhost:3000
- **Frontend**: http://localhost:8081

### Desarrollo con auto-reload:
```bash
npm run dev      # Solo backend con nodemon
npm run frontend # Solo frontend
```

---

## 🔄 Flujo de Datos Completo

### Login
```
Usuario ingresa credenciales
    ↓
auth.js → handleLogin()
    ↓
API.auth.login(email, password)
    ↓
POST /api/auth/login
    ↓
Validación en BD
    ↓
localStorage.setItem('ecocycle_user')
    ↓
Mostrar mainApp
```

### Cargar Materiales
```
Auth.checkAuth() → showMainApp()
    ↓
Materials.initialize()
    ↓
API.materials.getAll()
    ↓
GET /api/materials
    ↓
materials = response.data
    ↓
Materials.render() → Mostrar tarjetas
```

### Registrar Venta
```
Usuario completa formulario
    ↓
Sales.submit()
    ↓
API.sales.create(saleData)
    ↓
POST /api/sales
    ↓
Se calcula comisión automáticamente
    ↓
Se actualiza stock del material
    ↓
Toast de éxito
    ↓
Sales.renderRecent() → Mostrar nueva venta
```

---

## ⚙️ Configuración Necesaria

### CORS en Backend
```javascript
app.use(cors()); // Habilitado en server.js
```

### API Base URL
```javascript
const BASE_URL = 'http://localhost:3000/api'; // En api.js
```

---

## ✨ Mejoras Implementadas

1. **Centralización de API**: Todas las llamadas en un único módulo
2. **Manejo de errores**: Try/catch con mensajes de usuario
3. **Estado reactivo**: Datos sincronizados entre frontend y BD
4. **UX mejorada**: Indicadores de carga, mensajes de éxito/error
5. **Validación**: Campos requeridos, tipos de datos
6. **Comisión automática**: Cálculo del 10% en ventas

---

## 📊 Estado Actual

| Componente | Status | Notas |
|-----------|--------|-------|
| API Service | ✅ | Funcional |
| Auth | ✅ | Conectada a BD |
| Materials | ✅ | CRUD completo |
| Sales | ✅ | Registro con comisión |
| UI/UX | ✅ | Responsive |
| Base de Datos | ✅ | MariaDB conectada |

---

## 🔐 Próximas Mejoras (Roadmap)

- [ ] JWT Tokens (reemplazar localStorage)
- [ ] Hash de contraseñas (bcrypt)
- [ ] Roles y permisos
- [ ] Validación avanzada
- [ ] Cacheing de datos
- [ ] Filtros avanzados
- [ ] Export a PDF/Excel
- [ ] Reportes detallados

---

## 📝 Notas

- La API devuelve `success: true/false` en cada respuesta
- Los errores se muestran como toasts en rojo
- Las operaciones exitosas se confirman con toast verde
- Los datos se sincronizan en tiempo real
- El servidor reinicia automáticamente con cambios (nodemon)

