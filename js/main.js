import { initSidebar } from "../js/modules/sidebar.js";
import { getData } from "./services/api.js";
import { initCarousel } from "./modules/carousel.js";
import { darkMode } from "./modules/darkMode.js";




async function app() {
  initSidebar();
  darkMode();

  // Ejecutamos las tres cargas al mismo tiempo
  Promise.all([
    getData(0, 151).then(data => initCarousel("prom1", data)),
    getData(151, 100).then(data => initCarousel("prom2", data)),
    getData(251, 135).then(data => initCarousel("prom3", data))
  ]);
}


app();
