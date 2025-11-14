# EcoCycle - Arquitectura Modular

Proyecto **EcoCycle**: Sistema de Gestión de Reciclaje con arquitectura moderna y separación de responsabilidades.

## 📁 Estructura del Proyecto

```
proyecto/
├── index.html                    # Archivo principal (HTML puro)
│
├── css/
│   └── styles.css               # Estilos globales
│
├── js/
│   ├── main.js                  # Orquestador (punto de entrada)
│   └── modules/
│       ├── auth.js              # Autenticación y login
│       ├── charts.js            # Gráficos (Chart.js)
│       ├── materials.js         # CRUD de materiales
│       ├── sales.js             # Gestión de ventas
│       └── ui.js                # Interfaz de usuario
│
├── screens/
│   ├── login.html               # Pantalla de login
│   ├── dashboard.html           # Dashboard principal
│   ├── materials.html           # Gestión de materiales
│   └── sales.html               # Registro de ventas
│
├── assets/                       # Recursos (imágenes, etc.)
└── ESTRUCTURA.md               # Documentación anterior
```

## 🎯 Arquitectura

### Patrón: Module Pattern + IIFE

Cada módulo es una función autoinvocada (IIFE) que retorna una API pública:

```javascript
const ModuleName = (() => {
    // Variables privadas
    let privateVar = null;
    
    // Funciones privadas
    const privateFunction = () => {};
    
    // API Pública
    return {
        publicMethod: () => {},
        anotherPublic: () => {}
    };
})();
```

### Beneficios

✅ **Encapsulación**: Variables privadas no contaminan el global scope  
✅ **Namespacing**: Evita conflictos de nombres  
✅ **Reutilización**: Módulos independientes  
✅ **Testabilidad**: Cada módulo testeable independientemente  

## 📦 Módulos

### 1. Auth Module (`auth.js`)

**Responsabilidad**: Autenticación y gestión de sesiones

**API Pública**:
- `checkAuth()` - Verifica si hay usuario logeado
- `handleLogin(e)` - Procesa formulario de login
- `handleLogout()` - Cierra sesión
- `showMainApp(email)` - Muestra app después de login

**Funcionalidad**:
- Valida credenciales (admin@ecocycle.com / admin123)
- Persiste usuario en localStorage
- Muestra/oculta pantalla de login y app principal
- Inicializa Charts y Materials al loguear

### 2. Charts Module (`charts.js`)

**Responsabilidad**: Inicialización y configuración de gráficos

**API Pública**:
- `initialize()` - Inicializa todos los gráficos

**Gráficos**:
- **Bar Chart**: Materiales reciclados por mes (papel, plástico, cartón)
- **Pie Chart**: Distribución de materiales
- **Line Chart**: Evolución de ingresos

**Dependencia**: Chart.js 4.4.0

### 3. Materials Module (`materials.js`)

**Responsabilidad**: CRUD completo de materiales

**API Pública**:
- `initialize()` - Carga materiales de localStorage
- `render()` - Renderiza grid de materiales
- `add(e)` - Agrega nuevo material
- `edit(id)` - Abre modal para editar
- `update(e)` - Guarda cambios
- `showDeleteModal(id)` - Abre confirmación de eliminación
- `delete()` - Elimina material

**Persistencia**: localStorage (`ecocycle_materials`)

**Estructura de Material**:
```javascript
{
    id: number,
    name: string,
    type: 'Papel' | 'Plástico' | 'Cartón',
    stock: number,
    price: number,
    image: string (URL)
}
```

### 4. Sales Module (`sales.js`)

**Responsabilidad**: Gestión de ventas y cálculos

**API Pública**:
- `renderRecent()` - Muestra ventas recientes
- `updateCalculations()` - Calcula total según cantidad
- `submit(e)` - Registra nueva venta

**Funcionalidad**:
- Cálculo automático de totales
- Listado de últimas ventas
- Validación de datos

### 5. UI Module (`ui.js`)

**Responsabilidad**: Interfaz de usuario e interactividad

**API Pública**:
- `showToast(title, message, type)` - Notificaciones
- `toggleSidebar()` - Abre/cierra sidebar
- `navigateToScreen(screen)` - Cambia entre pantallas

**Funcionalidad**:
- Toast notifications con auto-close (3s)
- Toggle sidebar responsivo
- Gestión de screens (dashboard, materials, sales)
- Headers dinámicos

## 🚀 Flujo de Ejecución

### 1. Carga Inicial

```
index.html carga
    ↓
Bootstrap + Chart.js + Font Awesome (CDN)
    ↓
auth.js (módulo de autenticación)
    ↓
charts.js (módulo de gráficos)
    ↓
materials.js (módulo de materiales)
    ↓
sales.js (módulo de ventas)
    ↓
ui.js (módulo de interfaz)
    ↓
main.js (orquestador)
```

### 2. DOMContentLoaded Event

```javascript
Auth.checkAuth()              // Verifica usuario
    ↓
Materials.initialize()        // Carga datos
    ↓
initializeEventListeners()    // Conecta eventos
```

### 3. Flujo de Usuario

```
Usuario abre app
    ↓
Login check fallido → Muestra pantalla de login
    ↓
Usuario ingresa credenciales
    ↓
Auth.handleLogin() válida
    ↓
Auth.showMainApp() inicia:
    - Esconde login
    - Muestra app
    - Charts.initialize()
    - Materials.render()
    ↓
Usuario interactúa:
    - Clica botones → UI.navigateToScreen()
    - Agrega material → Materials.add()
    - Registra venta → Sales.submit()
    - Etc...
```

## 🔄 Interacción entre Módulos

```
main.js (orquestador)
    ├─ Auth (autenticación)
    ├─ Charts (gráficos)
    ├─ Materials (CRUD)
    ├─ Sales (ventas)
    └─ UI (interfaz)
        ├─ Llama a Auth cuando usuario se loguea
        ├─ Llama a Materials cuando navega a panel
        ├─ Llama a Sales cuando registra venta
        └─ Maneja notificaciones de todos los módulos
```

## 💾 Persistencia

### localStorage Keys

- `ecocycle_user` - Email del usuario logeado
- `ecocycle_materials` - Array de materiales

```javascript
// Ejemplo de estructura
localStorage.ecocycle_materials = JSON.stringify([
    {
        id: 1,
        name: 'Papel Bond Blanco',
        type: 'Papel',
        stock: 500,
        price: 1.50,
        image: 'url...'
    },
    // ... más materiales
])
```

## 🎨 Tema de Color

Variables CSS en `styles.css`:

```css
--emerald-50 a --emerald-900   /* Paleta de verdes */
```

Usados para:
- Sidebar y headers
- Buttons y accents
- Badges y status indicators

## 📱 Responsividad

Breakpoints Bootstrap:
- `xs`: < 576px (móvil)
- `sm`: ≥ 576px (tablet pequeña)
- `md`: ≥ 768px (tablet)
- `lg`: ≥ 992px (desktop pequeño)
- `xl`: ≥ 1200px (desktop)

Sidebar se oculta en `lg` y se abre como overlay.

## 🔐 Seguridad

⚠️ **IMPORTANTE**: Este es un proyecto educativo

- Credenciales hardcodeadas (admin@ecocycle.com / admin123)
- No hay validación de servidor
- No hay encryption
- Datos guardados en localStorage (accesible)

**Para producción**:
- Implementar backend real
- Hash de contraseñas
- JWT tokens
- HTTPS
- Validación de servidor

## 🧪 Testing

Cada módulo puede testearse independientemente:

```javascript
// Ejemplo con Jest
describe('Materials Module', () => {
    test('agrega nuevo material', () => {
        // Arrange
        const initialCount = Materials.materials.length;
        
        // Act
        Materials.add({...})
        
        // Assert
        expect(Materials.materials.length).toBe(initialCount + 1);
    });
});
```

## 📈 Performance

- ✅ Módulos lazy-loadables
- ✅ CSS combinado (1 archivo)
- ✅ Gráficos se inicializan solo en dashboard
- ✅ localStorage para caché local
- ✅ SPA sin recargas

**Optimizaciones futuras**:
- Webpack/Vite bundling
- Minificación CSS/JS
- Code splitting
- Service Workers

## 🛠️ Desarrollo

### Agregar nueva funcionalidad

1. **Crear nuevo módulo** en `js/modules/`:

```javascript
const NewModule = (() => {
    return {
        init: () => {},
        someMethod: () => {}
    };
})();
```

2. **Importar en index.html**:

```html
<script src="js/modules/newmodule.js"></script>
```

3. **Usar en main.js**:

```javascript
NewModule.init();
```

### Agregar nuevo screen

1. **Crear archivo** en `screens/`:

```html
<!-- screens/newscreen.html -->
<div id="newscreenScreen" class="screen-content hidden">
    <!-- HTML aquí -->
</div>
```

2. **Copiar contenido a index.html** (o usar fetch si se prefiere)

3. **Agregar botón de navegación** en sidebar

4. **Manejar en UI.navigateToScreen()**

## 📚 Recursos

- [Bootstrap 5 Docs](https://getbootstrap.com/)
- [Chart.js Docs](https://www.chartjs.org/)
- [Font Awesome Docs](https://fontawesome.com/)
- [localStorage API](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage)

## 📄 Licencia

Proyecto educativo - Libre para uso y modificación

---

**Última actualización**: Noviembre 14, 2025  
**Versión**: 2.0 - Arquitectura Modular  
**Autor**: Team EcoCycle
