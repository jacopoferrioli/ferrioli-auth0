const auth0 = new Auth0Client({
    domain: 'dev-bqn2ekncrfcvoc7a.us.auth0.com',
    client_id: 'vX3qBVAN46OKXqpwJVGqpWGF8dNYQaR3',
    redirect_uri: window.location.origin + '/home.html',
    audience: 'https://ferrioli.eu/api',
    scope: 'openid profile email'
});

// Fallback automatico se Auth0 non risponde
let auth0Ready = false;

const initAuth0 = async () => {
    try {
        await auth0.checkSession();
        auth0Ready = true;
    } catch (err) {
        console.warn("Auth0 non pronto, usando fallback");
        document.getElementById('auth0-login-container').style.display = 'block';
    }
};

document.getElementById('login-button').addEventListener('click', async () => {
    if (!auth0Ready) return;
    
    try {
        await auth0.loginWithRedirect({
            authorizationParams: {
                connection: 'Username-Password-Authentication'
            }
        });
    } catch (err) {
        // Attiva fallback automatico
        document.getElementById('auth0-fallback-link').click();
    }
});

initAuth0();
