class Navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <nav class="bg-white border-b-2 h-20">
        <div class="mx-auto w-full h-full max-w-7xl px-6">
          <div class="flex justify-between items-center h-full">
            <div>
              <h1 class="font-title font-bold text-2xl">Protofolio saya</h1>
            </div>

            <ul id="nav-menu" class="flex items-center gap-8 font-label">
              <li>
                <a href="#" class="nav-link active focus:outline-none focus:ring-0"> Beranda </a>
              </li>

              <li>
                <a href="#" class="nav-link focus:outline-none focus:ring-0"> Tentang Saya </a>
              </li>

              <li>
                <a href="#" class="nav-link focus:outline-none focus:ring-0"> Projek </a>
              </li>

              <li>
                <a href="#" class="nav-link focus:outline-none focus:ring-0"> Skill </a>
              </li>

              <li>
                <a href="#" class="nav-link focus:outline-none focus:ring-0"> Kontak </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        `;

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.forEach((item) => {
          item.classList.remove("active");
        });

        link.classList.add("active");
      });
    });
  }
}

customElements.define("navbar-com", Navbar);
