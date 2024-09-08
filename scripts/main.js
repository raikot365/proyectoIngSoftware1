// scripts/main.js
function toggleMenu() {
    var navLinks = document.getElementById('nav-links');
    
    if (navLinks.style.display === 'flex' || navLinks.style.display === '') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column'; // Asegura que los elementos se apilen verticalmente en dispositivos móviles
        navLinks.style.justifyContent = 'center'; // Centra las opciones verticalmente (si necesitas)
    }
}

// Verifica el tamaño de la pantalla y ajusta el menú
window.addEventListener('resize', function() {
    var navLinks = document.getElementById('nav-links');
    
    if (window.innerWidth > 800) {
        navLinks.style.display = 'flex'; // Muestra el menú en pantallas grandes
        navLinks.classList.remove('show-menu'); // Asegura que la clase se remueva
    } else {
        navLinks.style.display = 'none'; // Oculta el menú en pantallas pequeñas
    }
});

// Inicializa el estado del menú al cargar la página
window.addEventListener('DOMContentLoaded', function() {
    var navLinks = document.getElementById('nav-links');
    
    if (window.innerWidth > 800) {
        navLinks.style.display = 'flex';
    } else {
        navLinks.style.display = 'none';
    }
});

// Opcionalmente, puedes incluir código para verificar que el script está cargado
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded and ready.');
});
