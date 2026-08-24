class Sidebar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id="sidebar-overlay" class="fixed inset-0 bg-black/50 z-[99] opacity-0 pointer-events-none transition-opacity duration-500 ease-in-out"></div>
      <aside
        class="fixed right-0 top-0 h-screen w-64 bg-background border-l-2 z-[100] translate-x-full transition-all duration-500 ease-in-out"
      >
        <div class="flex flex-col h-full p-6">

          <div class="flex justify-between items-center mb-8">
            <div>
              <p class="font-label text-xs uppercase tracking-widest text-gray-400">
                Menu
              </p>

              <p class="font-title font-bold text-xl mt-2">
                Portfolio
              </p>
            </div>

            <button id="sidebar-close" type="button" class="text-2xl w-10 h-10 flex items-center justify-center rounded-full bg-sidebar shadow-[2px_2px_0] border-2 hover:rotate-90 transition-all duration-200" aria-label="Tutup sidebar">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <nav>
            <ul class="flex flex-col gap-2 font-label">

              <li>
                <a
                  href="#beranda"
                  class="sidebar-link active flex items-center gap-3
                         px-4 py-3 rounded-lg
                         transition-all duration-200"
                >
                  <i class="fa-solid fa-house w-5 text-center"></i>
                  <span>Beranda</span>
                </a>
              </li>

              <li>
                <a
                  href="#tentang"
                  class="sidebar-link flex items-center gap-3
                         px-4 py-3 rounded-lg
                         transition-all duration-200"
                >
                  <i class="fa-solid fa-user w-5 text-center"></i>
                  <span>Tentang Saya</span>
                </a>
              </li>

              <li>
                <a
                  href="#projek"
                  class="sidebar-link flex items-center gap-3
                         px-4 py-3 rounded-lg
                         transition-all duration-200"
                >
                  <i class="fa-solid fa-diagram-project w-5 text-center"></i>
                  <span>Projek</span>
                </a>
              </li>

              <li>
                <a
                  href="#skill"
                  class="sidebar-link flex items-center gap-3
                         px-4 py-3 rounded-lg
                         transition-all duration-200"
                >
                  <i class="fa-solid fa-code w-5 text-center"></i>
                  <span>Skill</span>
                </a>
              </li>

              <li>
                <a
                  href="#kontak"
                  class="sidebar-link flex items-center gap-3
                         px-4 py-3 rounded-lg
                         transition-all duration-200"
                >
                  <i class="fa-solid fa-envelope w-5 text-center"></i>
                  <span>Kontak</span>
                </a>
              </li>

            </ul>
          </nav>

          <!-- Social Media -->
          <div class="mt-auto pt-6 border-t">
            <div class="flex gap-4">
              <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full bg-sidebar shadow-[2px_2px_0] border-2 hover:scale-110 transition-all duration-200" aria-label="GitHub">
                <i class="fa-brands fa-github"></i>
              </a>
              <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full bg-sidebar shadow-[2px_2px_0] border-2 hover:scale-110 transition-all duration-200" aria-label="LinkedIn">
                <i class="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full bg-sidebar shadow-[2px_2px_0] border-2 hover:scale-110 transition-all duration-200" aria-label="Instagram">
                <i class="fa-brands fa-instagram"></i>
              </a>
              <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full bg-sidebar shadow-[2px_2px_0] border-2 hover:scale-110 transition-all duration-200" aria-label="Twitter">
                <i class="fa-brands fa-x-twitter"></i>
              </a>
            </div>
          </div>

        </div>
      </aside>
    `;

    const sidebarLinks = this.querySelectorAll(".sidebar-link");

    sidebarLinks.forEach((link) => {
      link.addEventListener("click", () => {
        sidebarLinks.forEach((item) => {
          item.classList.remove("active");
        });

        link.classList.add("active");
      });
    });

    const sidebar = this.querySelector("aside");
    const overlay = this.querySelector("#sidebar-overlay");
    const closeBtn = this.querySelector("#sidebar-close");

    const toggleSidebar = () => {
      sidebar.classList.toggle("translate-x-full");
      sidebar.classList.toggle("shadow-2xl");
      overlay.classList.toggle("opacity-0");
      overlay.classList.toggle("pointer-events-none");
    };

    document.addEventListener("toggle-sidebar", toggleSidebar);

    closeBtn.addEventListener("click", toggleSidebar);

    overlay.addEventListener("click", toggleSidebar);
  }
}

customElements.define("sidebar-com", Sidebar);
