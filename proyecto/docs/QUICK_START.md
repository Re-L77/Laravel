# 🚀 Quick Start Guide - EcoCycle

## 📦 Instalación Rápida (5 minutos)

### Paso 1: Instalar MariaDB
```bash
sudo pacman -S mysql
```

### Paso 2: Inicializar BD
```bash
sudo mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
sudo systemctl start mariadb
sudo systemctl enable mariadb
```

### Paso 3: Crear la Base de Datos
```bash
cd /home/teto/dev/Laravel/proyecto
sudo mariadb -u root < database.sql
```

### Paso 4: Instalar Dependencias Node
```bash
npm install
```

### Paso 5: Iniciar Servidores
```bash
npm run all
```

✅ **¡Listo!** Ahora tienes:
- Backend: http://localhost:3000
- Frontend: http://localhost:8081

---

## 🔑 Login Rápido

**Email**: `admin@ecocycle.com`
**Contraseña**: `123456`

---

## 📝 Comandos Útiles

### Desarrollo
```bash
npm start          # Solo backend (puerto 3000)
npm run dev        # Backend con auto-reload
npm run frontend   # Solo frontend (puerto 8081)
npm run all        # Ambos simultáneamente
```

### Base de Datos
```bash
# Ver tablas
sudo mariadb -u ecocycle -pecocycle123 ecocycle -e "SHOW TABLES;"

# Ver estructura de una tabla
sudo mariadb -u ecocycle -pecocycle123 ecocycle -e "DESCRIBE materials;"

# Recrear BD (borra todos los datos)
sudo mariadb -u root -e "DROP DATABASE IF EXISTS ecocycle;"
sudo mariadb -u root < database.sql
```

---

## 🧪 Probar API con cURL

### 1. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ecocycle.com","password":"123456"}'
```

### 2. Obtener Materiales
```bash
curl http://localhost:3000/api/materials | jq
```

### 3. Crear Material
```bash
curl -X POST http://localhost:3000/api/materials \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Cobre Reciclado",
    "category": "Metal",
    "price": 8.75,
    "stock": 100
  }'
```

### 4. Registrar Venta
```bash
curl -X POST http://localhost:3000/api/sales \
  -H "Content-Type: application/json" \
  -d '{
    "material_id": 1,
    "user_id": 1,
    "quantity": 50,
    "unit_price": 2.50
  }'
```

### 5. Obtener Estadísticas
```bash
curl "http://localhost:3000/api/sales/statistics?startDate=2025-01-01&endDate=2025-12-31" | jq
```

---

## 🔌 Usar API desde JavaScript

```javascript
// Importar el módulo (agregar a index.html)
<script src="API_CLIENT_EXAMPLE.js"></script>

// En tu código:
// 1. Login
const result = await API.login('admin@ecocycle.com', '123456');

// 2. Obtener materiales
const materials = await API.getMaterials();

// 3. Crear venta
const user = API.getCurrentUser();
const sale = await API.createSale({
  material_id: 1,
  user_id: user.id,
  quantity: 50,
  unit_price: 2.50
});

// 4. Obtener estadísticas
const stats = await API.getStatistics('2025-01-01', '2025-12-31');
```

---

## 📊 Estructura de Datos

### Material
```json
{
  "id": 1,
  "name": "Plástico PET",
  "category": "Plástico",
  "description": "Botellas plásticas",
  "price": 2.50,
  "stock": 1000,
  "unit": "kg",
  "image_url": "https://..."
}
```

### Venta
```json
{
  "id": 1,
  "material_id": 1,
  "user_id": 1,
  "quantity": 50,
  "unit_price": 2.50,
  "total_price": 125.00,
  "commission": 12.50,
  "net_price": 112.50,
  "sale_date": "2025-11-30T10:30:00Z",
  "status": "completed"
}
```

---

## 🆘 Solucionar Problemas

### El servidor no inicia
```bash
# Verificar si MariaDB está corriendo
sudo systemctl status mariadb

# Iniciar si está detenido
sudo systemctl start mariadb
```

### Error de conexión a BD
```bash
# Verificar credenciales en .env
cat .env

# Probar conexión
sudo mariadb -u ecocycle -pecocycle123 ecocycle -e "SELECT 1;"
```

### Puerto 3000 en uso
```bash
# Matar proceso en puerto 3000
sudo lsof -ti:3000 | xargs kill -9

# Cambiar puerto en .env
PORT=3001
```

### Puerto 8081 en uso
```bash
# Cambiar en package.json
"frontend": "http-server -p 8082 -c-1"
```

---

## 📚 Documentación Completa

- **Arquitectura MVC**: `MVC_ARCHITECTURE.md`
- **Resumen de Implementación**: `IMPLEMENTATION_SUMMARY.md`
- **Setup del Backend**: `BACKEND_SETUP.md`
- **Documentación Original**: `README.md`

---

## 🔐 Seguridad

⚠️ **Esta es una aplicación educativa**. Para producción:
- ✅ Usar JWT en lugar de usuario en localStorage
- ✅ Hash de contraseñas con bcrypt
- ✅ HTTPS obligatorio
- ✅ Validación de entrada más robusta
- ✅ Usar variables de entorno para credenciales

---

## 📞 Endpoints de Referencia Rápida

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /api/auth/login | Iniciar sesión |
| GET | /api/materials | Listar materiales |
| POST | /api/materials | Crear material |
| GET | /api/sales | Listar ventas |
| POST | /api/sales | Registrar venta |
| GET | /api/sales/statistics | Estadísticas |

---

## 🎯 Próximas Acciones

1. ✅ Backend funcional
2. ✅ BD con datos de ejemplo
3. ⏳ Conectar frontend con API
4. ⏳ Implementar JWT
5. ⏳ Agregar validaciones
6. ⏳ Deployment a servidor

---

**¿Necesitas ayuda?** Revisa los archivos de documentación o los ejemplos en `API_CLIENT_EXAMPLE.js`

**Última actualización**: Noviembre 30, 2025
