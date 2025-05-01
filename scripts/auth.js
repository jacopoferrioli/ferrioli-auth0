// Gestione Login
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const button = document.querySelector('.login-button');
    
    button.disabled = true;
    button.textContent = 'Accesso in corso...';
    
    try {
        // Verifica dominio email
        if (!email.endsWith('@ferrioli.eu') && !email.endsWith('.ferrioli.eu')) {
            throw new Error('Accesso consentito solo con email @ferrioli.eu');
        }
        
        await auth.signInWithEmailAndPassword(email, password);
        window.location.href = 'home.html';
    } catch (error) {
        alert(error.message);
        button.disabled = false;
        button.textContent = 'Accedi';
    }
});

// Password dimenticata
document.getElementById('forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    
    if (!email) {
        alert('Inserisci la tua email per recuperare la password');
        return;
    }
    
    auth.sendPasswordResetEmail(email)
        .then(() => alert('Email di recupero inviata!'))
        .catch(error => alert(error.message));
});

// Supporto
document.getElementById('support-button').addEventListener('click', () => {
    window.location.href = 'mailto:supporto@ferrioli.eu?subject=RICHIESTA SUPPORTO - LOGIN PAGE';
});

// Controlla se già loggato
auth.onAuthStateChanged(user => {
    if (user && window.location.pathname.endsWith('index.html')) {
        window.location.href = 'home.html';
    }
});
