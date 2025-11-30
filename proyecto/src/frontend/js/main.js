// EcoCycle - Main Application
// Initialize app on DOM load
document.addEventListener('DOMContentLoaded', async function () {
    // Initialize data
    Auth.checkAuth();

    try {
        await Materials.initialize();
        await Sales.loadMaterials();
    } catch (error) {
        console.error('Error initializing data:', error);
        UI.showToast('Error de Inicialización', 'Hubo un problema al cargar los datos de la aplicación', 'error');
    }

    // Initialize permissions
    Permissions.initializePermissions();

    // Initialize event listeners
    initializeEventListeners();

    // Render initial content after small delay to ensure DOM is ready
    setTimeout(() => {
        Materials.render();
        Sales.renderRecent();
    }, 100);
});

// Initialize all event listeners
function initializeEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', Auth.handleLogin);
    }

    // Logout buttons (sidebar and header menu)
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', Auth.handleLogout);
    }

    const logoutBtnMenu = document.getElementById('logoutBtnMenu');
    if (logoutBtnMenu) {
        logoutBtnMenu.addEventListener('click', Auth.handleLogout);
    }

    // Sidebar toggle
    const toggleBtn = document.getElementById('toggleSidebar');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', UI.toggleSidebar);
    }

    // Navigation buttons
    document.querySelectorAll('.nav-button[data-screen]').forEach(btn => {
        btn.addEventListener('click', function () {
            UI.navigateToScreen(this.dataset.screen);
        });
    });

    // Quick access buttons
    document.querySelectorAll('.quick-access').forEach(btn => {
        btn.addEventListener('click', function () {
            UI.navigateToScreen(this.dataset.screen);
        });
    });

    // Search materials
    const searchInput = document.getElementById('searchMaterial');
    if (searchInput) {
        searchInput.addEventListener('input', () => Materials.render());
    }

    // Add material form
    const addForm = document.getElementById('addMaterialForm');
    if (addForm) {
        addForm.addEventListener('submit', Materials.add);
    }

    // Edit material form
    const editForm = document.getElementById('editMaterialForm');
    if (editForm) {
        editForm.addEventListener('submit', Materials.update);
    }

    // Delete material confirmation
    const deleteBtn = document.getElementById('confirmDeleteBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => Materials.delete());
    }

    // Sales form
    const salesForm = document.getElementById('salesForm');
    if (salesForm) {
        salesForm.addEventListener('submit', Sales.submit);
    }

    const saleMaterial = document.getElementById('saleMaterial');
    if (saleMaterial) {
        saleMaterial.addEventListener('change', Sales.updateCalculations);
    }

    const saleQuantity = document.getElementById('saleQuantity');
    if (saleQuantity) {
        saleQuantity.addEventListener('input', Sales.updateCalculations);
    }
}
