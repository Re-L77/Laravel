# EcoCycle - Estructura del Proyecto

## 📁 Organización de Carpetas

```
proyecto/
├── index.html           # Archivo principal (HTML puro)
├── css/
│   └── styles.css      # Todos los estilos del proyecto
├── js/
│   └── main.js         # Toda la lógica JavaScript
├── assets/             # Carpeta reservada para futuros recursos
└── ESTRUCTURA.md       # Este archivo
```

## 📊 Estadísticas de Refactorización

| Aspecto | Antes | Después |
|---------|-------|---------|
| Líneas en index.html | 1424 | 640 |
| Estilos inline | Sí | No |
| Scripts inline | Sí | No |
| Archivos CSS | 0 (inline) | 1 |
| Archivos JS | 0 (inline) | 1 |
| **Total de líneas** | 1424 | 1422 |

## 🎯 Beneficios de la Refactorización

✅ **Separación de Responsabilidades**
- HTML: Estructura semántica
- CSS: Estilos y diseño
- JavaScript: Lógica e interactividad

✅ **Mantenibilidad**
- Más fácil encontrar y editar código
- Mejor organización visual
- Reutilización de estilos

✅ **Performance**
- Posibilidad de cachear archivos CSS/JS
- Potencial para minificación
- Carga más eficiente

✅ **Escalabilidad**
- Fácil agregar más módulos
- Preparado para modularizar aún más si es necesario
- Estructura lista para crecimiento

## 🔧 Características del Proyecto

### Aplicación EcoCycle
Sistema de gestión de reciclaje con:
- ✅ Autenticación de usuarios (localStorage)
- ✅ Dashboard con métricas y gráficos (Chart.js)
- ✅ Gestión de materiales (CRUD operations)
- ✅ Registro de ventas
- ✅ Sistema de notificaciones (Toast)
- ✅ Diseño responsive
- ✅ Interfaz moderna con Bootstrap 5

### Stack Tecnológico
- **HTML5**: Estructura semántica
- **CSS3**: Variables, gradientes, transiciones
- **JavaScript Vanilla**: Sin dependencias externas
- **Bootstrap 5.3.0**: Framework CSS responsivo
- **Chart.js 4.4.0**: Gráficos interactivos
- **Font Awesome 6.4.0**: Iconografía
- **localStorage**: Persistencia de datos

## 🚀 Cómo Usar

1. **Abrir la aplicación**
   ```bash
   # En navegador (desde cualquier servidor HTTP)
   open proyecto/index.html
   ```

2. **Credenciales de prueba**
   - Email: `admin@ecocycle.com`
   - Password: `admin123`

3. **Funcionalidades**
   - Navegar entre Dashboard, Materiales y Ventas
   - Agregar/Editar/Eliminar materiales
   - Ver gráficas de métricas
   - Buscar materiales
   - Registrar ventas

## 📝 Notas Importantes

- Los datos se almacenan en `localStorage` del navegador
- Cada pantalla es una sección dinámica controlada por JavaScript
- Los gráficos se inicializan solo en el Dashboard
- El sistema responde a cambios de ventana para dispositivos móviles

## 🔮 Mejoras Futuras Posibles

- [ ] Agregar backend (Laravel/Node.js)
- [ ] Implementar Base de Datos
- [ ] Separar JS en módulos (auth.js, charts.js, materials.js)
- [ ] Agregar más pantallas (reportes, configuración)
- [ ] Exportación de datos (PDF, Excel)
- [ ] Sistema de permisos avanzado
- [ ] API REST

---

**Última actualización**: Noviembre 14, 2025
**Versión**: 2.0 (Refactorizada)
