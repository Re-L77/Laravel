// UI Module
const UI = (() => {
    const showToast = (title, message, type = 'success') => {
        const toastContainer = document.querySelector('.toast-container');
        const toastId = 'toast-' + Date.now();

        const bgColor = type === 'success' ? 'bg-success' :
            type === 'error' ? 'bg-danger' :
                type === 'warning' ? 'bg-warning' : 'bg-info';

        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white ${bgColor} border-0`;
        toast.id = toastId;
        toast.setAttribute('role', 'alert');
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <strong>${title}</strong><br>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;

        toastContainer.appendChild(toast);

        const bsToast = new bootstrap.Toast(toast, { delay: 3000 });
        bsToast.show();

        toast.addEventListener('hidden.bs.toast', function () {
            toast.remove();
        });
    };

    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');

        if (window.innerWidth <= 992) {
            sidebar.classList.toggle('show');
        } else {
            sidebar.classList.toggle('hidden');
            mainContent.classList.toggle('expanded');
        }
    };

    const navigateToScreen = (screen) => {
        const currentScreen = screen;

        // Update active nav button
        document.querySelectorAll('.nav-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll(`.nav-button[data-screen="${screen}"]`).forEach(btn => {
            btn.classList.add('active');
        });

        // Update header
        const titles = {
            dashboard: { title: 'Panel de Control', subtitle: 'Vista general de métricas y estadísticas' },
            materials: { title: 'Gestión de Materiales', subtitle: 'Administración de inventario de materiales' },
            sales: { title: 'Registro de Ventas', subtitle: 'Registro y seguimiento de transacciones' }
        };

        document.getElementById('headerTitle').textContent = titles[screen].title;
        document.getElementById('headerSubtitle').textContent = titles[screen].subtitle;

        // Show/hide screens
        document.querySelectorAll('.screen-content').forEach(el => {
            el.classList.add('hidden');
        });
        document.getElementById(`${screen}Screen`).classList.remove('hidden');

        // Render screen-specific content
        if (screen === 'materials') {
            Materials.render();
        } else if (screen === 'sales') {
            Sales.renderRecent();
        }

        // Close sidebar on mobile
        if (window.innerWidth <= 992) {
            document.getElementById('sidebar').classList.remove('show');
        }
    };

    return {
        showToast,
        toggleSidebar,
        navigateToScreen
    };
})();
