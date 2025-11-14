// EcoCycle - Main Application
// Initialize app on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize data
    Auth.checkAuth();
    Materials.initialize();
    
    // Initialize event listeners
    initializeEventListeners();
});

// Initialize all event listeners
function initializeEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', Auth.handleLogin);
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', Auth.handleLogout);
    
    // Sidebar toggle
    document.getElementById('toggleSidebar').addEventListener('click', UI.toggleSidebar);
    
    // Navigation buttons
    document.querySelectorAll('.nav-button[data-screen]').forEach(btn => {
        btn.addEventListener('click', function() {
            UI.navigateToScreen(this.dataset.screen);
        });
    });
    
    // Quick access buttons
    document.querySelectorAll('.quick-access').forEach(btn => {
        btn.addEventListener('click', function() {
            UI.navigateToScreen(this.dataset.screen);
        });
    });
    
    // Search materials
    const searchInput = document.getElementById('searchMaterial');
    if (searchInput) {
        searchInput.addEventListener('input', () => Materials.render());
    }
    
    // Add material form
    document.getElementById('addMaterialForm').addEventListener('submit', Materials.add);
    
    // Edit material form
    document.getElementById('editMaterialForm').addEventListener('submit', Materials.update);
    
    // Delete material confirmation
    document.getElementById('confirmDeleteBtn').addEventListener('click', () => Materials.delete());
    
    // Sales form
    document.getElementById('salesForm').addEventListener('submit', Sales.submit);
    document.getElementById('saleMaterial').addEventListener('change', Sales.updateCalculations);
    document.getElementById('saleQuantity').addEventListener('input', Sales.updateCalculations);
    
    // Initialize sales screen
    setTimeout(() => {
        Sales.renderRecent();
    }, 500);
}
