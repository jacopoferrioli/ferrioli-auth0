// CONFIGURAZIONE AUTH0
const auth0Config = {
    domain: 'dev-bqn2ekncrfcvoc7a.us.auth0.com',
    client_id: 'vX3qBVAN46OKXqpwJVGqpWGF8dNYQaR3',
    redirect_uri: window.location.origin + '/home.html',
    audience: 'https://ferrioli.eu/api',
    scope: 'openid profile email'
};

let auth0;

async function initializeAuth0() {
    try {
        auth0 = new Auth0Client(auth0Config);
        console.log("Auth0 inizializzato con successo", auth0);
        return true;
    } catch (err) {
        console.error("Errore inizializzazione Auth0:", err);
        return false;
    }
}

// FUNZIONI PRINCIPALI
async function handleLogin() {
    try {
        console.log("Avvio login...");
        await auth0.loginWithRedirect({
            authorizationParams: {
                connection: 'Username-Password-Authentication'
            }
        });
    } catch (err) {
        console.error("Errore durante il login:", err);
        alert("Errore durante l'accesso. Ricarica la pagina e riprova.");
    }
}

async function handleForgotPassword(e) {
    e.preventDefault();
    try {
        console.log("Avvio recupero password...");
        await auth0.loginWithRedirect({
            authorizationParams: {
                screen_hint: 'forgot_password',
                connection: 'Username-Password-Authentication'
            }
        });
    } catch (err) {
        console.error("Errore recupero password:", err);
        alert("Errore durante il recupero password. Contatta il supporto.");
    }
}

function handleSupport(e) {
    e.preventDefault();
    console.log("Apertura client email...");
    window.location.href = 'mailto:supporto@ferrioli.eu?subject=RICHIESTA SUPPORTO - LOGIN PAGE';
}

// INIZIALIZZAZIONE
document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM pronto");
    
    if (!await initializeAuth0()) {
        document.getElementById('login-button').disabled = true;
        document.getElementById('forgot-password').style.color = 'gray';
        return;
    }
    
    // Controlla se già autenticato
    try {
        const isAuthenticated = await auth0.isAuthenticated();
        if (isAuthenticated) {
            window.location.href = 'home.html';
            return;
        }
    } catch (err) {
        console.error("Errore verifica autenticazione:", err);
    }
    
    // Collegamento eventi
    bindEvents();
});

function bindEvents() {
    const elements = {
        login: document.getElementById('login-button'),
        forgot: document.getElementById('forgot-password'),
        support: document.getElementById('support-button')
    };
    
    // Verifica esistenza elementi
    Object.entries(elements).forEach(([key, el]) => {
        if (!el) console.error(`Elemento ${key} non trovato`);
    });
    
    // Listener con fallback
    elements.login?.addEventListener('click', async (e) => {
        e.preventDefault();
        elements.login.disabled = true;
        elements.login.innerHTML = 'Caricamento...';
        await handleLogin();
        elements.login.disabled = false;
        elements.login.innerHTML = 'Accedi con Auth0';
    });
    
    elements.forgot?.addEventListener('click', handleForgotPassword);
    elements.support?.addEventListener('click', handleSupport);
}
