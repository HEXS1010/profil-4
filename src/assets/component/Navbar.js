class Navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav id="main-navbar" class="fixed top-0 left-0 w-full bg-white border-b-4 h-20 z-90 transition-transform duration-500 ease-in-out">
        <div class="mx-auto w-full h-full max-w-7xl px-6">
          <div class="flex justify-between items-center h-full">
            <div class>
              <img class="bg-black rounded-full p-1 w-15 h-15" src="src/assets/img/logo.png" alt="Logo" />
            </div>

            <ul
              id="nav-menu"
              class="items-center font-label hidden md:flex h-full"
            >
              <li class="h-full">  
                <a href="index.html" class="nav-link focus:outline-none focus:ring-0">Beranda</a>
              </li>
              <li class="h-full">
                <a href="#" class="nav-link focus:outline-none focus:ring-0">Tentang Saya</a>
              </li>
              <li class="h-full">
                <a href="Project.html" class="nav-link focus:outline-none focus:ring-0">Projek</a>
              </li>
              <li class="h-full">
                <a href="#" class="nav-link focus:outline-none focus:ring-0">Skill</a>
              </li>
              <li class="h-full">
                <a href="#" class="nav-link focus:outline-none focus:ring-0">Kontak</a>
              </li>
            </ul>

            <button
              id="sidebar-toggle"
              type="button"
              class="text-xl md:hidden"
              aria-label="Buka sidebar"
            >
              <i class="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>
    `;

    // 1. Logika untuk memberi kelas 'active' berdasarkan URL halaman saat ini
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = this.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      // Jika href link (tanpa hash) cocok dengan nama file saat ini, tambahkan class active
      if (href.split('#')[0] === currentPath) {
        link.classList.add("active");
      }
    });

    // 2. Logika Scroll Hide/Show
    const navbar = this.querySelector("#main-navbar");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        navbar.classList.add("-translate-y-full");
      } else {
        navbar.classList.remove("-translate-y-full");
      }
      
      lastScrollY = currentScrollY;
    }, { passive: true });

    const sidebarToggle = this.querySelector("#sidebar-toggle");
    sidebarToggle.addEventListener("click", () => {
      document.dispatchEvent(new CustomEvent("toggle-sidebar"));
    });
  }
}

customElements.define("navbar-com", Navbar);
