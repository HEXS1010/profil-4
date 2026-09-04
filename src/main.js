import "./style.css";
import "./assets/font-awesome/css/all.min.css";
import "./assets/component/Tooltip.js";

// Lazy loading components
const loadComponent = (selector, path) => {
  if (document.querySelector(selector)) {
    import(/* @vite-ignore */ path);
  }
};

loadComponent("navbar-com", "./assets/component/Navbar.js");
loadComponent("sidebar-com", "./assets/component/SideBar.js");
loadComponent("breadcrumb-com", "./assets/component/Breadcrumb.js");
loadComponent("pagination-com", "./assets/component/Pagination.js");
loadComponent("github-com", "./assets/component/Github.js");
loadComponent("footer-com", "./assets/component/Footer.js");
loadComponent("card-project", "./assets/component/card-project.js");
loadComponent("detail-header-com", "./assets/component/detail-header.js");
loadComponent("detail-body-com", "./assets/component/detail-body.js");
loadComponent("colaboration-com", "./assets/component/colaboration.js");
loadComponent("#form-kontak", "./message.js");

import { initDotGrid } from "./assets/dot-grid.js";
// import { initLogoSlider } from "./assets/logo-slider.js";

const heroWrapper = document.querySelector(".dot-grid-wrapper");
if (heroWrapper) initDotGrid(heroWrapper);

// initLogoSlider("logoTrack");