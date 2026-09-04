import "../assets/component/Tooltip.js";
import "../assets/component/card-project.js";
import { loadProjects, loadHistoris, updateStats } from "./projects-admin.js";

const loginView = document.getElementById("login-view");
const dashboardView = document.getElementById("dashboard-view");
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");
const logoutBtn = document.getElementById("logout-btn");

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin";
const AUTH_KEY = "admin-login";

const showDashboard = () => {
  loginView.classList.add("hidden");
  dashboardView.classList.remove("hidden");
  loadProjects();
  loadHistoris();
  updateStats();
};

const showLogin = () => {
  dashboardView.classList.add("hidden");
  loginView.classList.remove("hidden");
};

if (sessionStorage.getItem(AUTH_KEY) === "1") {
  showDashboard();
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = loginForm.username.value.trim();
  const password = loginForm.password.value;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, "1");
    showDashboard();
  } else {
    loginError.classList.remove("hidden");
  }
});

logoutBtn.addEventListener("click", () => {
  sessionStorage.removeItem(AUTH_KEY);
  showLogin();
});

// ===== navigasi antar view (dashboard / projek / pesan) =====
const viewTitle = document.getElementById("view-title");
const viewDesc = document.getElementById("view-desc");

const views = {
  dashboard: {
    el: document.getElementById("view-dashboard"),
    title: "Dashboard",
    desc: "Ringkasan projek & pesan portofoliomu dalam satu bento.",
  },
  projek: {
    el: document.getElementById("view-projek"),
    title: "Projek",
    desc: "Kelola projek portofoliomu: tambah, edit, hapus.",
  },
  pesan: {
    el: document.getElementById("view-pesan"),
    title: "Pesan",
    desc: "Balas pesan masuk dan pantau statusnya.",
  },
};

const showView = (name) => {
  Object.entries(views).forEach(([key, view]) => {
    view.el.classList.toggle("hidden", key !== name);
  });

  const current = views[name];
  if (current) {
    viewTitle.textContent = current.title;
    viewDesc.textContent = current.desc;
  }

  document.querySelectorAll(".sidebar-item").forEach((link) => {
    link.classList.toggle("active", link.dataset.view === name);
  });
};

document.querySelectorAll(".sidebar-item").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    showView(link.dataset.view);
  });
});