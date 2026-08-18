import "./style.css";
import "./assets/font-awesome/css/all.min.css";
import "./assets/component/Navbar.js";
import "./assets/component/SideBar.js";
import { initDotGrid } from "./assets/dot-grid.js";

const heroWrapper = document.querySelector(".dot-grid-wrapper");
if (heroWrapper) initDotGrid(heroWrapper);