document.addEventListener('DOMContentLoaded', function() {
    if (!getCookie('cookieConsent')) {
        showCookieBanner();
    }
});

function showCookieBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-content">
            <p>Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Al continuar navegando, aceptas nuestra 
            <a href="/privacy" class="text-primary">política de privacidad</a> y el uso de cookies.</p>
            <div class="cookie-buttons">
                <button class="btn btn-primary btn-sm" onclick="acceptCookies()">Aceptar</button>
                <button class="btn btn-outline-secondary btn-sm" onclick="rejectCookies()">Rechazar</button>
            </div>
        </div>
    `;
    document.body.appendChild(banner);
}

function acceptCookies() {
    setCookie('cookieConsent', 'accepted', 365);
    hideCookieBanner();
}

function rejectCookies() {
    setCookie('cookieConsent', 'rejected', 365);
    hideCookieBanner();
}

function hideCookieBanner() {
    const banner = document.querySelector('.cookie-banner');
    if (banner) {
        banner.remove();
    }
}

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/;SameSite=Lax';
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
