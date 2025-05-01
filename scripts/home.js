// Configurazione Auth0
const auth0 = new Auth0Client({
    domain: 'dev-bqn2ekncrfcvoc7a.us.auth0.com',
    client_id: 'vX3qBVAN46OKXqpwJVGqpWGF8dNYQaR3',
    redirect_uri: window.location.origin + '/home.html'
});

// Servizi in base al dominio email
const servicesConfig = {
    admin: {
        webmail: { title: 'WEBMAIL', url: 'https://webmail.aruba.it', icon: 'fas fa-envelope' },
        notion: { title: 'NOTION', url: 'https://www.notion.so', icon: 'fas fa-book' },
        billetto: { title: 'BILLETTO', url: 'https://www.billetto.com', icon: 'fas fa-ticket-alt' },
        basebear: { title: 'BASEBEAR', url: 'https://www.basebear.com', icon: 'fas fa-paw' }
    },
    ferrioli: {
        webmail: { title: 'WEBMAIL', url: 'https://webmail.aruba.it', icon: 'fas fa-envelope' },
        notion: { title: 'NOTION', url: 'https://www.notion.so', icon: 'fas fa-book' },
        billetto: { title: 'BILLETTO', url: 'https://www.billetto.com', icon: 'fas fa-ticket-alt' },
        basebear: { title: 'BASEBEAR', url: 'https://www.basebear.com', icon: 'fas fa-paw' }
    },
    subdomain: {
        webmail: { title: 'WEBMAIL', url: 'https://mail.zoho.com', icon: 'fas fa-envelope' },
        notion: { title: 'NOTION', url: 'https://www.notion.so', icon: 'fas fa-book' },
        billetto: { title: 'BILLETTO', url: 'https://www.billetto.com', icon: 'fas fa-ticket-alt' },
        basebear: { title: 'BASEBEAR', url: 'https://www.basebear.com', icon: 'fas fa-paw' }
    }
};

const adminEmails = [
    'jacopo@ferrioli.eu',
    'postmaster@ferrioli.eu',
    'amministrazione.generale@cas.ferrioli.eu'
];

async function init() {
    const isAuthenticated = await auth0.isAuthenticated();
    if (!isAuthenticated) return window.location.href = 'index.html';

    const user = await auth0.getUser();
    updateProfileInfo(user);
    setupDropdown();
    renderServices(user.email);
}

function updateProfileInfo(user) {
    const nameParts = user.email.split('@')[0].split('.');
    const formattedName = nameParts.map(part => 
        part.charAt(0).toUpperCase() + part.slice(1)
    ).join(' ');

    document.getElementById('user-name').textContent = formattedName;
    document.getElementById('user-email').textContent = user.email;
}

function setupDropdown() {
    const profileButton = document.getElementById('profile-button');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const logoutButton = document.getElementById('logout-button');

    profileButton.addEventListener('click', () => {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    logoutButton.addEventListener('click', () => {
        auth0.logout({ returnTo: window.location.origin });
    });

    document.addEventListener('click', (event) => {
        if (!profileButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
}

function renderServices(email) {
    const servicesContainer = document.getElementById('services-container');
    servicesContainer.innerHTML = '';

    let config;
    if (adminEmails.includes(email.toLowerCase())) {
        config = servicesConfig.admin;
    } else if (email.endsWith('@ferrioli.eu')) {
        config = servicesConfig.ferrioli;
    } else if (email.match(/@[a-zA-Z0-9-]+\.ferrioli\.eu$/)) {
        config = servicesConfig.subdomain;
    }

    if (!config) {
        servicesContainer.innerHTML = `
            <div class="no-services">
                <p>Nessun servizio disponibile per il tuo account.</p>
            </div>
        `;
        return;
    }

    ['webmail', 'notion', 'billetto', 'basebear'].forEach(key => {
        if (config[key]) {
            const service = config[key];
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            serviceCard.innerHTML = `
                <div class="service-icon"><i class="${service.icon}"></i></div>
                <h3 class="service-title">${service.title}</h3>
                <button class="service-button" onclick="window.open('${service.url}', '_blank')">Accedi</button>
            `;
            servicesContainer.appendChild(serviceCard);
        }
    });
}

window.addEventListener('load', init);
