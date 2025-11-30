// Permissions Module - Gestión de permisos y roles
const Permissions = (() => {
    // Definir roles y sus permisos
    const rolePermissions = {
        admin: {
            name: 'Administrador',
            permissions: [
                'view_dashboard',
                'view_materials',
                'create_material',
                'edit_material',
                'delete_material',
                'view_sales',
                'create_sale',
                'view_reports',
                'manage_users'
            ]
        },
        manager: {
            name: 'Gerente',
            permissions: [
                'view_dashboard',
                'view_materials',
                'create_material',
                'edit_material',
                'view_sales',
                'create_sale',
                'view_reports'
            ]
        },
        employee: {
            name: 'Empleado',
            permissions: [
                'view_materials',
                'view_sales',
                'create_sale'
            ]
        }
    };

    let currentUser = null;
    let currentRole = null;

    // Obtener usuario actual
    const getCurrentUser = () => {
        const user = localStorage.getItem('ecocycle_user');
        return user ? JSON.parse(user) : null;
    };

    // Obtener rol del usuario actual
    const getCurrentRole = () => {
        const user = getCurrentUser();
        return user ? user.role || 'employee' : null;
    };

    // Verificar si el usuario tiene un permiso específico
    const hasPermission = (permission) => {
        const role = getCurrentRole();
        if (!role || !rolePermissions[role]) {
            return false;
        }
        return rolePermissions[role].permissions.includes(permission);
    };

    // Verificar si el usuario tiene alguno de los permisos
    const hasAnyPermission = (permissions) => {
        return permissions.some(permission => hasPermission(permission));
    };

    // Verificar si el usuario tiene todos los permisos
    const hasAllPermissions = (permissions) => {
        return permissions.every(permission => hasPermission(permission));
    };

    // Obtener nombre del rol
    const getRoleName = () => {
        const role = getCurrentRole();
        return rolePermissions[role] ? rolePermissions[role].name : 'Desconocido';
    };

    // Obtener todos los permisos del usuario
    const getUserPermissions = () => {
        const role = getCurrentRole();
        return rolePermissions[role] ? rolePermissions[role].permissions : [];
    };

    // Mostrar/ocultar elementos basado en permisos
    const restrictElement = (elementId, permission) => {
        const element = document.getElementById(elementId);
        if (element) {
            if (!hasPermission(permission)) {
                element.style.display = 'none';
            }
        }
    };

    // Deshabilitar/Habilitar botones basado en permisos
    const restrictButton = (buttonId, permission) => {
        const button = document.getElementById(buttonId);
        if (button) {
            if (!hasPermission(permission)) {
                button.disabled = true;
                button.style.opacity = '0.5';
                button.title = 'No tienes permiso para realizar esta acción';
            }
        }
    };

    // Inicializar restricciones de permisos
    const initializePermissions = () => {
        // Restringir vista de dashboard
        if (!hasPermission('view_dashboard')) {
            const dashboardBtn = document.querySelector('.nav-button[data-screen="dashboard"]');
            if (dashboardBtn) dashboardBtn.style.display = 'none';
        }

        // Restringir vista de materiales
        if (!hasPermission('view_materials')) {
            const materialsBtn = document.querySelector('.nav-button[data-screen="materials"]');
            if (materialsBtn) materialsBtn.style.display = 'none';
        }

        // Restringir vista de ventas
        if (!hasPermission('view_sales')) {
            const salesBtn = document.querySelector('.nav-button[data-screen="sales"]');
            if (salesBtn) salesBtn.style.display = 'none';
        }

        // Restringir botón de agregar material
        if (!hasPermission('create_material')) {
            const addBtn = document.getElementById('addMaterialBtn');
            if (addBtn) {
                addBtn.disabled = true;
                addBtn.style.opacity = '0.5';
                addBtn.title = 'No tienes permiso para crear materiales';
            }
        }
    };

    return {
        getCurrentUser,
        getCurrentRole,
        getRoleName,
        getUserPermissions,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        restrictElement,
        restrictButton,
        initializePermissions,
        rolePermissions
    };
})();
