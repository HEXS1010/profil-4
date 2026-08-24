import "./style.css";
import "./assets/font-awesome/css/all.min.css";
import "./assets/component/Navbar.js";
import "./assets/component/SideBar.js";
import "./assets/component/Tooltip.js";
import "./assets/component/Breadcrumb.js";
import "./assets/component/Pagination.js";
import "./assets/component/Github.js";
import "./assets/component/Footer.js";
import "./assets/component/card-project.js";
import "./assets/component/project-detail.js";
import "./assets/component/colaboration.js";
import { initDotGrid } from "./assets/dot-grid.js";
// import { initLogoSlider } from "./assets/logo-slider.js";

const heroWrapper = document.querySelector(".dot-grid-wrapper");
if (heroWrapper) initDotGrid(heroWrapper);

// initLogoSlider("logoTrack");