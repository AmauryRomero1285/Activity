export function initSidebar() {
  const btnMenu = document.getElementById("btn-menu");
  const sidebarCont = document.getElementById("sidebar-content");
  const sidebar = document.getElementById("sidebar");

  if (!btnMenu || !sidebarCont) return;

  const toggleMenu = (forceClose = false) => {
    const isOpen = !sidebarCont.hidden;
    
    if (isOpen || forceClose) {
      sidebarCont.hidden = true;
      btnMenu.classList.remove("open");
      document.body.style.overflow = "auto";
    } else {
      sidebarCont.hidden = false;
      btnMenu.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  };

  // Click en la Pokebola
  btnMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Click en el fondo del overlay
  sidebarCont.addEventListener("click", (e) => {
    if (window.innerWidth <= 600 || e.target === sidebarCont) {
      toggleMenu(true);
    }
  });

  // Evitar que el click dentro del menú blanco lo cierre en escritorio
  sidebar.addEventListener("click", (e) => {
    if (window.innerWidth > 600) {
      e.stopPropagation();
    } else {
      // En móvil, si tocan una opción (link), cerramos para navegar
      toggleMenu(true);
    }
  });
}
