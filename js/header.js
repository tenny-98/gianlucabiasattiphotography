**
 * Carica header.html dinamicamente
 */
document.addEventListener('DOMContentLoaded', () => {
    fetch('html/header.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('afterbegin', html);
        })
        .catch(err => console.error('Errore caricamento header:', err));
});
