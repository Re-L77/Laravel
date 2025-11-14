// Authentication Module
const Auth = (() => {
    const checkAuth = () => {
        const user = localStorage.getItem('ecocycle_user');
        if (user) {
            showMainApp(user);
        }
    };

    const showMainApp = (email) => {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
        document.getElementById('userEmail').textContent = email;
        Charts.initialize();
        Materials.render();
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const errorDiv = document.getElementById('loginError');
        
        if (email === 'admin@ecocycle.com' && password === 'admin123') {
            localStorage.setItem('ecocycle_user', email);
            showMainApp(email);
            errorDiv.classList.add('d-none');
        } else {
            errorDiv.textContent = 'Credenciales incorrectas. Usa: admin@ecocycle.com / admin123';
            errorDiv.classList.remove('d-none');
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
