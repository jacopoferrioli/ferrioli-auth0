// DEBUG INITIAL
console.log("Script auth.js caricato correttamente");

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente caricato");
    
    // Verifica che gli elementi esistano
    const loginBtn = document.getElementById('login-button');
    const forgotBtn = document.getElementById('forgot-password');
    const supportBtn = document.getElementById('support-button');
    
    console.log("Elementi trovati:", {
        loginBtn,
        forgotBtn,
        supportBtn
    });

    // Test base degli event listener
    loginBtn.addEventListener('click', () => console.log("Login button clicked"));
    forgotBtn.addEventListener('click', () => console.log("Forgot password clicked"));
    supportBtn.addEventListener('click', () => console.log("Support clicked"));

// Configurazione Auth0
const auth0 = new Auth0Client({
    domain: 'dev-bqn2ekncrfcvoc7a.us.auth0.com',
    client_id: 'vX3qBVAN46OKXqpwJVGqpWGF8dNYQaR3',
    redirect_uri: window.location.origin + '/home.html',
    audience: 'https://ferrioli.eu/api',
    scope: 'openid profile email'
});

// Funzione per gestire il login
async function handleLogin() {
    try {
        await auth0.loginWithRedirect({
            authorizationParams: {
                connection: 'Username-Password-Authentication'
            }
        });
    } catch (err) {
        console.error('Login error:', err);
    }
}

// Funzione per recupero password
async function handleForgotPassword(e) {
    e.preventDefault();
    try {
        await auth0.loginWithRedirect({
            authorizationParams: {
                screen_hint: 'forgot_password',
                connection: 'Username-Password-Authentication'
            }
        });
    } catch (err) {
        console.error('Password recovery error:', err);
    }
}

// Funzione per contattare il supporto
function handleSupport() {
    window.location.href = 'mailto:supporto@ferrioli.eu?subject=RICHIESTA SUPPORTO - LOGIN PAGE';
}

// Inizializzazione al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {
    // Collegamento degli eventi
    document.getElementById('login-button').addEventListener('click', handleLogin);
    document.getElementById('forgot-password').addEventListener('click', handleForgotPassword);
    document.getElementById('support-button').addEventListener('click', handleSupport);

    // Verifica se l'utente è già autenticato
    (async function() {
        const isAuthenticated = await auth0.isAuthenticated();
        if (isAuthenticated) {
            window.location.href = 'home.html';
        }
    })();
});
