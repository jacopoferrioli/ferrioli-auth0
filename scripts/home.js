// Configurazione servizi
const services = {
    admin: [
        { id: 'webmail', title: 'WEBMAIL', url: 'https://webmail.aruba.it', icon: 'fas fa-envelope' },
        { id: 'notion', title: 'NOTION', url: 'https://www.notion.so', icon: 'fas fa-book' },
        { id: 'billetto', title: 'BILLETTO', url: 'https://www.billetto.com', icon: 'fas fa-ticket-alt' },
        { id: 'basebear', title: 'BASEBEAR', url: 'https://www.basebear.com', icon: 'fas fa-paw' }
    ],
    ferrioli: [
        { id: 'webmail', title: 'WEBMAIL', url: 'https://webmail.aruba.it', icon: 'fas fa-envelope' },
        { id: 'notion', title: 'NOTION', url: 'https://www.notion.so', icon: 'fas fa-book' },
        { id: 'billetto', title: 'BILLETTO', url: 'https://www.billetto.com', icon: 'fas fa-ticket-alt' },
        { id: 'basebear', title: 'BASEBEAR', url: 'https://www.basebear.com', icon: 'fas fa-paw' }
    ],
    subdomain: [
        { id: 'webmail', title: 'WEBMAIL', url: 'https://mail.zoho.com', icon: 'fas fa-envelope' },
        { id: 'notion', title: 'NOTION', url: 'https://www.notion.so', icon: 'fas fa-book' },
        { id: 'billetto', title: 'BILLETTO', url: 'https://www.billetto.com', icon: 'fas fa-ticket-alt' },
        { id: 'basebear', title: 'BASEBEAR', url: 'https://www.basebear.com', icon: 'fas fa-paw' }
    ]
};

const adminEmails = [
    'jacopo@ferrioli.eu',
    'postmaster@ferrioli.eu',
    'amministrazione.generale@cas.ferrioli.eu'
];

// Inizializzazione
auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    updateProfileInfo(user);
    setupDropdown();
    renderServices(user.email);
});

function updateProfileInfo(user) {
    const name = user.email.split('@')[0].replace('.', ' ');
    document.getElementById('user-name').textContent = name;
    document.getElementById('user-email').textContent = user.email;
}

function setupDropdown() {
    const profileBtn = document.getElementById('profile-button');
    const dropdown = document.getElementById('dropdown-menu');
    const logoutBtn = document.getElementById('logout-button');

    profileBtn.addEventListener('click', () => {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    logoutBtn.addEventListener('click', () => {
        auth.signOut().then(() => window.location.href = 'index.html');
    });

    document.addEventListener('click', (e) => {
        if (!profileBtn.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
}

function renderServices(email) {
    const container = document.getElementById('services-container');
    let servicesToShow;

    if (adminEmails.includes(email.toLowerCase())) {
        servicesToShow = services.admin;
    } else if (email.endsWith('@ferrioli.eu')) {
        servicesToShow = services.ferrioli;
    } else if (email.match(/@[a-z0-9-]+\.ferrioli\.eu$/i)) {
        servicesToShow = services.subdomain;
    } else {
        container.innerHTML = '<p class="no-access">Non hai accesso a nessun servizio</p>';
        return;
    }

    container.innerHTML = servicesToShow.map(service => `
        <div class="service-card">
            <div class="service-icon"><i class="${service.icon}"></i></div>
            <h3>${service.title}</h3>
            <button onclick="window.open('${service.url}', '_blank')">Accedi</button>
        </div>
    `).join('');
}
