/**
 * Carica footer.html dinamicamente
 */
document.addEventListener('DOMContentLoaded', () => {
    fetch('html/footer.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
        })
        .catch(err => console.error('Errore caricamento footer:', err));
});
