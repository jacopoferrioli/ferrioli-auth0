// Configurazione Auth0 con i tuoi parametri
const auth0Client = new Auth0Client({
    domain: 'dev-bqn2ekncrfcvoc7a.us.auth0.com',
    client_id: 'vX3qBVAN46OKXqpwJVGqpWGF8dNYQaR3',
    redirect_uri: window.location.origin + '/home.html',
    audience: 'https://ferrioli.eu/api',
    scope: 'openid profile email'
});

// Gestione login
document.getElementById('login-button').addEventListener('click', async () => {
    try {
        await auth0Client.loginWithRedirect({
            authorizationParams: {
                connection: 'Username-Password-Authentication'
            }
        });
    } catch (err) {
        console.error('Login error:', err);
    }
});

// Password dimenticata
document.getElementById('forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    auth0Client.loginWithRedirect({
        authorizationParams: {
            screen_hint: 'forgot_password'
        }
    });
});

// Contatta supporto
document.getElementById('support-button').addEventListener('click', () => {
    window.location.href = 'mailto:supporto@ferrioli.eu?subject=RICHIESTA SUPPORTO - LOGIN PAGE';
});

// Verifica autenticazione al caricamento
window.addEventListener('load', async () => {
    const isAuthenticated = await auth0Client.isAuthenticated();
    if (isAuthenticated) {
        window.location.href = 'home.html';
    }
});
