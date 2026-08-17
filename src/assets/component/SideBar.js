class Sidebar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <aside
        class="fixed right-0 top-20 h-[calc(100vh-5rem)] w-64
               bg-white border-r-2 z-40"
      >
        <div class="flex flex-col h-full p-6">

          <div class="mb-8">
            <p class="font-label text-xs uppercase tracking-widest text-gray-400">
              Menu
            </p>

            <h2 class="font-title font-bold text-xl mt-2">
              Portfolio
            </h2>
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
                  <span>⌂</span>
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
                  <span>○</span>
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
                  <span>▣</span>
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
                  <span>◇</span>
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
                  <span>✉</span>
                  <span>Kontak</span>
                </a>
              </li>

            </ul>
          </nav>

          <!-- Footer Sidebar -->
          <div class="mt-auto pt-6 border-t">
            <p class="font-label text-xs text-gray-400">
              © 2026
            </p>

            <p class="font-label text-sm mt-1">
              Portfolio Saya
            </p>
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

    document.addEventListener("toggle-sidebar", () => {
      const sidebar = this.querySelector("aside");

      sidebar.classList.toggle("translate-x-full");
    });
  }
}

customElements.define("sidebar-com", Sidebar);
