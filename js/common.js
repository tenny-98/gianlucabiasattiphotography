/**
 * CONFIGURAZIONE CENTRALIZZATA
 */
const CONFIG = {
    email: 'biasattig@gmail.com',
    notificationDuration: 1500
};

/**
 * UTILITY - Gestione email
 */
function handleEmailCopy(e) {
    e.preventDefault();
    
    navigator.clipboard.writeText(CONFIG.email)
        .then(() => showNotification())
        .catch(() => emailCopyFallback());
}

/**
 * Fallback per browser vecchi
 */
function emailCopyFallback() {
    const textarea = document.createElement('textarea');
    textarea.value = CONFIG.email;
    textarea.style.position = 'fixed';
    textarea.style.left = '-999999px';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showNotification();
    } catch (err) {
        console.error('Errore copia email:', err);
    } finally {
        document.body.removeChild(textarea);
    }
}

/**
 * Mostra notifica
 */
function showNotification() {
    const notify = document.getElementById('copyNotify');
    notify.classList.add('show');
    setTimeout(() => notify.classList.remove('show'), CONFIG.notificationDuration);
}

/**
 * Inizializzazione email copy
 */
document.addEventListener('DOMContentLoaded', () => {
    const mailIcon = document.getElementById('mailIcon');
    if (mailIcon) {
        mailIcon.addEventListener('click', handleEmailCopy);
    }
});

/**
 * Disabilita click destro
 */
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
