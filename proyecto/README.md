# 🌱 EcoCycle - Sistema de Gestión de Reciclaje

**EcoCycle** es una aplicación web moderna para administrar eficientemente materiales reciclables, registrar ventas y visualizar métricas en tiempo real. Está construida con HTML5, CSS3 vanilla y JavaScript puro, sin dependencias externas de frameworks.

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Stack Tecnológico](#stack-tecnológico)
- [Credenciales de Prueba](#credenciales-de-prueba)
- [Cómo Funciona](#cómo-funciona)
- [Módulos](#módulos)
- [Sistema de Permisos](#sistema-de-permisos)
- [Almacenamiento](#almacenamiento)
- [Arquitectura](#arquitectura)
- [Interfaz de Usuario](#interfaz-de-usuario)
- [Instalación y Uso](#instalación-y-uso)
- [Notas de Seguridad](#notas-de-seguridad)

---

## ✨ Características

✅ **Autenticación**: Sistema de login con validación  
✅ **Sistema de Permisos**: Tres roles con permisos diferenciados (Admin, Gerente, Empleado)  
✅ **Dashboard**: Panel de control con métricas y gráficos interactivos  
✅ **Gestión de Materiales**: CRUD completo (Crear, Leer, Actualizar, Eliminar)  
✅ **Registro de Ventas**: Cálculo automático de totales y comisiones  
✅ **Gráficos Dinámicos**: Visualización de datos con Chart.js  
✅ **Notificaciones**: Sistema de Toast para feedback del usuario  
✅ **Diseño Responsivo**: Funciona en escritorio, tablet y móvil  
✅ **Interfaz Moderna**: Diseño limpio con colores verdes (tema ambiental)  
✅ **Almacenamiento Local**: Datos persistentes con localStorage  

---

## 📁 Estructura del Proyecto

```
proyecto/
│
├── index.html                 # Archivo principal con toda la app
├── home.html                  # Archivo de bienvenida y login
│
├── css/
│   └── styles.css            # Estilos globales (250 líneas)
│
├── js/
│   ├── main.js               # Orquestador (punto de entrada)
│   ├── api.js                # Cliente API para backend
│   └── modules/
│       ├── auth.js           # Autenticación y login
│       ├── charts.js         # Gráficos (Chart.js)
│       ├── materials.js      # CRUD de materiales
│       ├── sales.js          # Gestión de ventas
│       ├── permissions.js    # Control de permisos por roles
│       └── ui.js             # Interfaz de usuario
│
├── screens/
│   ├── dashboard.html        # Pantalla de dashboard
│   ├── materials.html        # Pantalla de gestión de materiales
│   └── sales.html            # Pantalla de registro de ventas
│
├── assets/
│   └── rec.png               # Imagen para sección ambiental
│
├── database.sql              # Esquema y datos iniciales de la BD
├── README.md                 # Documentación (este archivo)
├── package.json              # Dependencias del proyecto
└── .env                      # Variables de entorno (BD, puertos, etc)
```

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **HTML5** | - | Estructura semántica |
| **CSS3** | - | Estilos y diseño responsivo |
| **JavaScript** | ES6+ | Lógica e interactividad |
| **Bootstrap** | 5.3.0 | Framework CSS responsivo |
| **Chart.js** | 4.4.0 | Gráficos interactivos |
| **Font Awesome** | 6.4.0 | Iconografía |
| **localStorage** | - | Persistencia de datos |

---

## 🚀 Cómo Funciona

### Flujo General

```
Usuario abre app (index.html)
    ↓
¿Usuario autenticado en localStorage?
    ├─ NO → Muestra pantalla de LOGIN
    │   └─ Usuario ingresa credenciales
    │       └─ Si son correctas → Sesión iniciada
    │
    └─ SÍ → Muestra DASHBOARD
        ├─ Carga materiales
        ├─ Inicializa gráficos
        └─ Usuario puede navegar entre pantallas
```

### Credenciales de Prueba

**Administrador**:
- **Email**: `admin@ecocycle.com`
- **Contraseña**: `123456`
- **Permisos**: Acceso completo a todas las funciones

**Gerente**:
- **Email**: `manager@ecocycle.com`
- **Contraseña**: `123456`
- **Permisos**: Ver/crear/editar materiales, ventas y reportes (sin eliminar)

**Empleado**:
- **Email**: `employee@ecocycle.com`
- **Contraseña**: `123456`
- **Permisos**: Ver materiales y crear/ver ventas solo

---

## 🧩 Módulos

### 1. **Auth Module** (`auth.js`)

**Responsabilidad**: Gestión de autenticación y sesiones

**Métodos Públicos**:
- `checkAuth()` - Verifica si hay usuario logeado al cargar
- `handleLogin(e)` - Procesa el formulario de login
- `handleLogout()` - Cierra sesión y recarga la página
- `showMainApp(email)` - Muestra la app principal tras autenticación

**Flujo**:
1. Al cargar: busca `ecocycle_user` en localStorage
2. Si existe: muestra dashboard
3. Si no existe: muestra pantalla de login
4. Al hacer login: valida contra email/password hardcodeados
5. Si es válido: guarda en localStorage y muestra app

```javascript
// Ejemplo de uso
Auth.checkAuth(); // Ejecutado en DOMContentLoaded
Auth.handleLogin(event); // Ejecutado al submit del formulario
```

---

### 2. **Materials Module** (`materials.js`)

**Responsabilidad**: CRUD completo de materiales

**Métodos Públicos**:
- `initialize()` - Carga materiales de localStorage
- `render()` - Renderiza grid de materiales con búsqueda
- `add(e)` - Agrega nuevo material
- `edit(id)` - Abre modal para editar
- `update(e)` - Guarda cambios
- `showDeleteModal(id)` - Confirma antes de eliminar
- `delete()` - Elimina material

**Estructura de Material**:
```javascript
{
    id: number,              // ID único (timestamp)
    name: string,            // Nombre del material
    type: string,            // 'Papel', 'Plástico', 'Cartón', 'Vidrio'
    stock: number,           // Cantidad en kg
    price: number,           // Precio por kg
    image: string            // URL de imagen
}
```

**Persistencia**: Los datos se guardan en `localStorage['ecocycle_materials']`

**Ejemplo de Flujo**:
```
Usuario clica "Nuevo Material"
    ↓
Modal de agregar se abre
    ↓
Usuario llena formulario y envía
    ↓
Materials.add() crea objeto con ID único (Date.now())
    ↓
Actualiza localStorage
    ↓
Re-renderiza grid de materiales
    ↓
Muestra notificación de éxito
```

---

### 3. **Sales Module** (`sales.js`)

**Responsabilidad**: Gestión de ventas y cálculos

**Métodos Públicos**:
- `renderRecent()` - Muestra últimas 5 ventas
- `updateCalculations()` - Calcula total en tiempo real
- `submit(e)` - Registra nueva venta

**Cálculos Automáticos**:
```
Total = Material Price × Quantity
Comisión = Total × 10%
Neto = Total - Comisión
```

**Validaciones**:
- Material seleccionado
- Cantidad > 0
- Stock suficiente del material

**Flujo**:
```
Usuario selecciona material
    ↓
Sistema busca precio en Materials
    ↓
Usuario ingresa cantidad
    ↓
updateCalculations() recalcula totales en tiempo real
    ↓
Usuario envía formulario
    ↓
sales.submit() valida y guarda venta
    ↓
Se recargan ventas recientes
```

---

### 4. **Charts Module** (`charts.js`)

**Responsabilidad**: Inicialización y gestión de gráficos

**Métodos Públicos**:
- `initialize()` - Crea todos los gráficos

**Gráficos Disponibles**:

1. **Bar Chart** - Materiales reciclados por mes
   - Muestra cantidad (kg) de Papel, Plástico, Cartón
   - Visualiza tendencias mensuales

2. **Pie Chart** - Distribución de materiales
   - Porcentaje de cada tipo de material
   - Colores distintivos

3. **Line Chart** - Evolución de ingresos
   - Ingresos acumulados por mes
   - Tendencia de ventas

**Datos Dinámicos**:
- Se populan con valores demo
- Pueden actualizarse al agregar ventas
- Chart.js gestiona animations automáticamente

---

### 5. **UI Module** (`ui.js`)

**Responsabilidad**: Interfaz de usuario e interactividad

**Métodos Públicos**:
- `showToast(title, message, type)` - Muestra notificación
- `toggleSidebar()` - Abre/cierra sidebar en móvil
- `navigateToScreen(screen)` - Cambia entre pantallas

**Toast Types**: `success` | `error` | `warning` | `info`

**Pantallas Disponibles**:
- `dashboard` - Panel principal
- `materials` - Gestión de materiales
- `sales` - Registro de ventas

**Ejemplo**:
```javascript
// Mostrar notificación
UI.showToast('Éxito', 'Material agregado correctamente', 'success');

// Navegar a otra pantalla
UI.navigateToScreen('materials');

// Alternar sidebar en móvil
UI.toggleSidebar();
```

---

## 🔐 Sistema de Permisos (`permissions.js`)

**Responsabilidad**: Control de acceso basado en roles de usuario

### Tres Roles Disponibles

**1. Administrador**
- Permisos: Vista de dashboard, crear/editar/eliminar materiales, ver/crear ventas, ver reportes, gestionar usuarios
- Acceso completo a todas las funciones

**2. Gerente**
- Permisos: Vista de dashboard, crear/editar materiales (no eliminar), ver/crear ventas, ver reportes
- Sin acceso a gestión de usuarios

**3. Empleado**
- Permisos: Ver materiales (no crear/editar/eliminar), ver/crear ventas
- Sin acceso a dashboard ni reportes

### Métodos Públicos

- `getCurrentUser()` - Retorna objeto del usuario actual
- `getCurrentRole()` - Retorna rol del usuario ('admin', 'manager', 'employee')
- `hasPermission(permission)` - Verifica si usuario tiene permiso específico
- `hasAnyPermission(permissions)` - Verifica si tiene al menos uno de los permisos
- `hasAllPermissions(permissions)` - Verifica si tiene todos los permisos
- `restrictElement(elementId, permission)` - Oculta elemento si no tiene permiso
- `restrictButton(buttonId, permission)` - Deshabilita botón si no tiene permiso
- `initializePermissions()` - Aplica restricciones de permisos al cargar la página

### Implementación

Los permisos se verifican en dos niveles:

1. **Nivel UI**: Se ocultan/deshabilan elementos según permisos
   ```javascript
   // Botones Editar y Eliminar en Materiales
   <button onclick="Materials.edit(${material.id})" 
           ${!Permissions.hasPermission('edit_material') ? 'disabled' : ''}>
   ```

2. **Nivel Función**: Se valida antes de ejecutar acción
   ```javascript
   // En Materials.add()
   if (!Permissions.hasPermission('create_material')) {
       UI.showToast('Error', 'No tienes permiso para crear materiales', 'error');
       return;
   }
   ```

---

## 💾 Almacenamiento

### localStorage Keys

**`ecocycle_user`**
- Almacena el email del usuario autenticado
- Se usa para validar sesión al recargar
- Se elimina al logout

**`ecocycle_materials`**
- Array JSON de todos los materiales
- Se actualiza en cada CRUD operation
- Formato:
```json
[
    {
        "id": 1700000000000,
        "name": "Papel Bond Blanco",
        "type": "Papel",
        "stock": 500,
        "price": 1.50,
        "image": "https://..."
    },
    ...
]
```

### Datos Demo Iniciales

Si es la primera vez que se carga, el sistema crea materiales de ejemplo:
- Papel Bond Blanco (500 kg)
- Botellas Plásticas PET (300 kg)
- Cajas de Cartón (450 kg)
- Vidrio Transparente (200 kg)

---

## 🏗️ Arquitectura

### Patrón: Module Pattern (IIFE)

Cada módulo es una **Immediately Invoked Function Expression** que encapsula lógica:

```javascript
const ModuleName = (() => {
    // Variables privadas (no accesibles desde fuera)
    let privateVar = null;
    
    // Funciones privadas
    const privateFunction = () => {
        // Lógica privada
    };
    
    // API Pública (retornada)
    return {
        publicMethod: () => {
            privateFunction(); // Puede usar privadas
        }
    };
})();
```

**Ventajas**:
✅ Encapsulación de variables privadas  
✅ Evita contaminación del scope global  
✅ Organización clara de código público/privado  
✅ Fácil de testear aisladamente  

### Diagrama de Dependencias

```
main.js (orquestador)
    │
    ├─→ Auth (autenticación)
    ├─→ Materials (CRUD)
    ├─→ Sales (ventas)
    ├─→ Charts (gráficos)
    └─→ UI (interfaz)
```

### Flujo de Ejecución

```
1. HTML carga
   ├─ Bootstrap CSS (CDN)
   ├─ Font Awesome (CDN)
   └─ Custom CSS (styles.css)

2. Scripts cargan
   ├─ Chart.js (CDN)
   ├─ auth.js
   ├─ charts.js
   ├─ materials.js
   ├─ sales.js
   ├─ ui.js
   └─ main.js

3. DOMContentLoaded dispara
   ├─ Auth.checkAuth() → verifica sesión
   ├─ Materials.initialize() → carga datos
   ├─ initializeEventListeners() → conecta eventos
   └─ setTimeout() → render inicial
```

---

## 📊 Flujo de Datos

### Agregar Material

```
Usuario clica "Nuevo Material" (Dashboard/Sidebar)
    ↓
UI.navigateToScreen('materials')
    ↓
Modal de formulario se abre
    ↓
Usuario ingresa: nombre, tipo, stock, precio, imagen
    ↓
Submit del formulario dispara Materials.add(event)
    ↓
Crea objeto: { id: Date.now(), name, type, stock, price, image }
    ↓
Valida campos
    ↓
Obtiene array actual de localStorage
    ↓
Pushea nuevo material
    ↓
Guarda en localStorage['ecocycle_materials']
    ↓
Materials.render() re-renderiza grid
    ↓
UI.showToast('Éxito', 'Material agregado', 'success')
    ↓
Cierra modal automáticamente
```

### Registrar Venta

```
Usuario navega a "Ventas"
    ↓
Sales.renderRecent() muestra últimas 5 ventas
    ↓
Usuario selecciona material del dropdown
    ↓
Sales.updateCalculations() dispara
    ├─ Busca precio en Materials
    └─ Re-calcula totales en tiempo real
    ↓
Usuario ingresa cantidad
    ↓
updateCalculations() re-calcula
    ↓
Usuario clica "Registrar Venta"
    ↓
Sales.submit(event) valida:
    ├─ ¿Material seleccionado?
    ├─ ¿Cantidad > 0?
    ├─ ¿Stock suficiente?
    └─ Procede si todo OK
    ↓
Crea objeto de venta: { id, material, quantity, price, total, date }
    ↓
Guarda en localStorage
    ↓
Recalcula stock del material
    ↓
Sales.renderRecent() se actualiza
    ↓
UI.showToast() muestra confirmación
```

---

## 🎨 Interfaz de Usuario

### Pantallas Principales

**1. Login Screen**
- Dos columnas (lado izq: contenido, lado der: formulario)
- En móvil: Una columna
- Campos: Email, Contraseña
- Botón: "Iniciar Sesión"
- Muestra credenciales de prueba

**2. Dashboard**
- 4 tarjetas de métricas (Total Reciclado, Ingresos, Stock, Transacciones)
- Sección de imagen ambiental
- 3 botones de acceso rápido (Nuevo Material, Venta, Reportes)
- Gráficos (Bar, Pie, Line) - Chart.js

**3. Gestión de Materiales**
- Barra de búsqueda
- Botón "Nuevo Material"
- Grid responsive de materiales
- Cada material: nombre, tipo, stock, precio, botones Editar/Eliminar

**4. Registro de Ventas**
- Dropdown de materiales
- Input de cantidad
- Cálculos automáticos (total, comisión, neto)
- Tabla de últimas 5 ventas
- Botón "Registrar Venta"

### Componentes UI

**Sidebar**
- Logo y nombre de app
- Menú de navegación (3 opciones)
- Botón de logout
- Footer con versión
- En móvil: se oculta, se abre como overlay

**Header**
- Botón toggle sidebar (solo móvil)
- Título dinámico según pantalla
- Nombre y email del usuario
- Avatar

**Toasts**
- Notificaciones auto-closing (3 segundos)
- 4 tipos: success (verde), error (rojo), warning (amarillo), info (azul)
- Esquina inferior derecha

---

## 📱 Responsividad

Bootstrap 5 breakpoints utilizados:

| Breakpoint | Tamaño | Uso |
|-----------|--------|-----|
| xs | < 576px | Móvil |
| sm | ≥ 576px | Tablet pequeña |
| md | ≥ 768px | Tablet |
| lg | ≥ 992px | Desktop pequeño |
| xl | ≥ 1200px | Desktop |

**Cambios según pantalla**:
- Sidebar se oculta en `< lg` (< 992px)
- Grid de materiales: 1 columna en xs, 2 en md, 3 en lg
- Gráficos se redimensionan automáticamente
- Header info se oculta en móvil

---

## 🎯 Casos de Uso

### Caso 1: Usuario Nuevo

```
1. Abre aplicación
2. Ve pantalla de login
3. Ingresa: admin@ecocycle.com / admin123
4. Entra a dashboard
5. Ve métricas y gráficos
6. Puede navegar a otras pantallas
```

### Caso 2: Agregar Material

```
1. En dashboard o sidebar, clica "Nuevo Material"
2. Va a pantalla de Materiales
3. Clica "Agregar Nuevo Material"
4. Llena formulario:
   - Nombre: "Papel Periódico"
   - Tipo: "Papel"
   - Stock: 1000 kg
   - Precio: 0.75 $/kg
   - Imagen: URL
5. Clica "Guardar"
6. Material aparece en la lista
7. Se muestra notificación de éxito
```

### Caso 3: Registrar Venta

```
1. Va a "Registro de Ventas"
2. Selecciona material: "Papel Bond Blanco"
3. Ingresa cantidad: 50 kg
4. Sistema calcula:
   - Total: 50 × 1.50 = $75
   - Comisión 10%: $7.50
   - Neto: $67.50
5. Clica "Registrar Venta"
6. Stock de Papel disminuye (500 - 50 = 450)
7. Venta aparece en tabla de recientes
```

### Caso 4: Editar Material

```
1. En Gestión de Materiales
2. Clica botón Editar de un material
3. Modal se abre con datos actuales
4. Modifica campo (ej: precio)
5. Clica "Actualizar"
6. Material se actualiza en lista
7. Se muestra notificación
```

### Caso 5: Logout

```
1. Clica "Cerrar Sesión" en sidebar
2. Se elimina `ecocycle_user` de localStorage
3. Página se recarga
4. Aparece pantalla de login nuevamente
```

---

## 🔒 Notas de Seguridad

⚠️ **IMPORTANTE**: Este es un proyecto **EDUCATIVO**. Para producción se necesita:

### Problemas Actuales

❌ Credenciales hardcodeadas en código  
❌ Contraseña sin encriptación  
❌ Datos en localStorage (accesibles por JavaScript)  
❌ Sin validación de servidor  
❌ Sin HTTPS  
❌ Sin control de permisos  

### Para Producción

✅ Implementar backend (Node.js, Laravel, etc.)  
✅ Hash seguro de contraseñas (bcrypt, Argon2)  
✅ JWT tokens con expiración  
✅ Validación de datos en servidor  
✅ HTTPS obligatorio  
✅ Base de datos segura (MySQL, PostgreSQL)  
✅ Rate limiting para login  
✅ Logs de auditoría  
✅ CORS configurado  

---

## 🚀 Instalación y Uso

### Requisitos

- Node.js v14+ 
- MariaDB/MySQL
- Navegador moderno

### Configuración Inicial

**1. Clonar y configurar el repositorio**

```bash
cd /home/teto/dev/Laravel/proyecto
npm install
```

**2. Configurar base de datos**

```bash
# Crear usuario en MariaDB
mariadb -u root -p
> CREATE USER 'ecocycle'@'localhost' IDENTIFIED BY 'ecocycle123';
> GRANT ALL ON ecocycle.* TO 'ecocycle'@'localhost';

# Ejecutar script de BD
mariadb -u ecocycle -pecocycle123 < database.sql
```

**3. Iniciar el servidor backend**

```bash
npm start
# Backend disponible en http://localhost:3000
```

**4. Iniciar el servidor frontend**

```bash
# En otra terminal
cd src/frontend
python -m http.server 8081
# Frontend disponible en http://localhost:8081
```

**5. Abrir la aplicación**

```
http://localhost:8081/home.html
```

### Credenciales de Prueba para Login

- **Admin**: admin@ecocycle.com / 123456
- **Gerente**: manager@ecocycle.com / 123456
- **Empleado**: employee@ecocycle.com / 123456

### Uso del Sistema

1. **Login** → Ingresa con una de las credenciales de prueba
2. **Dashboard** → Visualiza métricas y gráficos
3. **Materiales** → Gestiona inventario (CRUD)
4. **Ventas** → Registra transacciones
5. **Logout** → Cierra sesión

### Restricciones por Rol

**Admin**: Acceso completo a todo
**Gerente**: Puede crear/editar materiales, NO eliminar
**Empleado**: Solo puede ver materiales y crear ventas

---

## 🎓 Conceptos Clave

### Module Pattern

```javascript
const Module = (() => {
    // Privado
    let count = 0;
    
    // Privado
    const increment = () => count++;
    
    // Público
    return {
        getCount: () => count,
        add: () => increment()
    };
})();

Module.add();
Module.getCount(); // 1
```

### Event Delegation

Conecta eventos una sola vez al contenedor:
```javascript
document.addEventListener('click', (e) => {
    if (e.target.matches('.delete-btn')) {
        // Manejar clic en botón delete
    }
});
```

### localStorage

```javascript
// Guardar
localStorage.setItem('key', JSON.stringify(data));

// Obtener
const data = JSON.parse(localStorage.getItem('key'));

// Eliminar
localStorage.removeItem('key');
```

### Template Literals

```javascript
const html = `
    <div class="card">
        <h3>${material.name}</h3>
        <p>Stock: ${material.stock} kg</p>
    </div>
`;
```

---

## 📈 Flujo Típico de Desarrollo

Si quieres **agregar una nueva funcionalidad**:

### 1. Crear nuevo módulo

```javascript
// js/modules/reports.js
const Reports = (() => {
    const generate = () => {
        // Lógica aquí
    };
    
    return {
        generate
    };
})();
```

### 2. Agregar script en index.html

```html
<script src="js/modules/reports.js"></script>
```

### 3. Usar en main.js

```javascript
// Agregar evento
document.getElementById('reportBtn').addEventListener('click', Reports.generate);
```

### 4. Agregar pantalla

```html
<!-- Agregar en index.html -->
<div id="reportsScreen" class="screen-content hidden">
    <!-- Contenido de pantalla -->
</div>
```

### 5. Conectar navegación

```javascript
// En UI.navigateToScreen()
case 'reports':
    // Mostrar pantalla
```

---

## 📚 Recursos Externos

- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.0/)
- [Chart.js Docs](https://www.chartjs.org/docs/latest/)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [MDN Web Docs - localStorage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage)
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)

---

## 📝 Changelog

### v1.0.0 (Actual)
- ✅ Autenticación básica
- ✅ CRUD de materiales
- ✅ Registro de ventas
- ✅ Gráficos interactivos
- ✅ Interfaz responsive
- ✅ Sistema de notificaciones
- ✅ Backend con Express.js y MariaDB
- ✅ API RESTful completa
- ✅ Sistema de permisos (3 roles: Admin, Gerente, Empleado)
- ✅ Múltiples usuarios con autenticación real

### Mejoras Futuras (v2.0)
- [ ] Autenticación con JWT tokens
- [ ] Reportes avanzados (PDF, Excel)
- [ ] Exportación de datos
- [ ] Gráficos más complejos
- [ ] Filtros avanzados
- [ ] Integración con APIs externas
- [ ] Dashboard personalizado por rol
- [ ] Auditoría de cambios

---

## 👨‍💻 Autor

**Re-L77**  
Proyecto Educativo - EcoCycle v1.0.0

---

## 📄 Licencia

Proyecto libre para uso y modificación educativa.

---

**Última actualización**: Noviembre 19, 2025  
**Estado**: ✅ Completamente funcional
