export function darkMode() {
    const btnDark = document.getElementById('dark-mode');

    btnDark.addEventListener('click', () => {
        // Intercambia la clase 'dark-theme' en el body
        document.body.classList.toggle('dark-theme');
        
        // Opcional: Guardar preferencia en LocalStorage
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}
