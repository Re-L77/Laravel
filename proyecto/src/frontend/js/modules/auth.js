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

        try {
            loginBtn.disabled = true;
            loginBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Iniciando sesión...';

            const response = await API.auth.login(email, password);

            localStorage.setItem('ecocycle_user', JSON.stringify(response.data));
            showMainApp(response.data);
            errorDiv.classList.add('d-none');

        } catch (error) {
            console.error('Login error:', error);
            errorDiv.textContent = 'Error al iniciar sesión. Verifica tus credenciales.';
            errorDiv.classList.remove('d-none');
        } finally {
            loginBtn.disabled = false;
            loginBtn.textContent = 'Iniciar Sesión';
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('ecocycle_user');
        location.reload();
    };

    return {
        checkAuth,
        showMainApp,
        handleLogin,
        handleLogout
    };
})();
