// Authentication Module
const Auth = (() => {
    const checkAuth = () => {
        const user = localStorage.getItem('ecocycle_user');
        if (user) {
            showMainApp(JSON.parse(user));
        }
    };

    const showMainApp = (user) => {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
        document.getElementById('userEmail').textContent = user.email;

        // Update user header information
        if (document.getElementById('userName')) {
            document.getElementById('userName').textContent = user.name || 'Usuario';
        }
        if (document.getElementById('userRole')) {
            const roleTranslation = {
                'admin': 'Administrador',
                'manager': 'Gerente',
                'employee': 'Empleado'
            };
            document.getElementById('userRole').textContent = roleTranslation[user.role] || user.role;
        }

        if (Charts && Charts.initialize) {
            Charts.initialize();
        }
        if (Materials && Materials.initialize) {
            Materials.initialize();
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const errorDiv = document.getElementById('loginError');
        const loginBtn = e.target.querySelector('button[type="submit"]');

        // Validar campos
        if (!email || !password) {
            UI.showToast('Campos incompletos', 'Por favor ingresa email y contraseña', 'warning');
            return;
        }

        try {
            loginBtn.disabled = true;
            loginBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Iniciando sesión...';

            const response = await API.auth.login(email, password);

            localStorage.setItem('ecocycle_user', JSON.stringify(response.data));
            showMainApp(response.data);
            errorDiv.classList.add('d-none');
            UI.showToast('Bienvenido', `Has iniciado sesión como ${email}`, 'success');

        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.message || 'Error al iniciar sesión. Verifica tus credenciales.';
            errorDiv.textContent = errorMessage;
            errorDiv.classList.remove('d-none');
            UI.showToast('Error de Autenticación', errorMessage, 'error');
        } finally {
            loginBtn.disabled = false;
            loginBtn.textContent = 'Iniciar Sesión';
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('ecocycle_user');
        UI.showToast('Sesión cerrada', 'Has cerrado sesión correctamente', 'success');
        setTimeout(() => {
            location.reload();
        }, 1500);
    };

    return {
        checkAuth,
        showMainApp,
        handleLogin,
        handleLogout
    };
})();
