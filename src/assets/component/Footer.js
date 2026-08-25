class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="grid-bg border-t-3 ">
        <div class="max-w-7xl mx-auto py-15 px-5">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <!-- kontak -->
            <div class="flex flex-col gap-4 items-center md:items-end text-center md:text-right">
              <h5 class="font-title font-bold text-2xl">Kontak Saya</h5>
              <p class="flex flex-col gap-1">
                <span class="font-title font-medium">Email</span>
                <span>@gmail.com</span>
              </p>
              <p class="flex flex-col gap-1">
                <span class="font-title font-medium">Phone</span>
                <span>+62xxxxxxxxxx</span>
              </p>
              <p class="flex flex-col gap-1">
                <span class="font-title font-medium">Lokasi</span>
                <span>Indonesia</span>
              </p>
            </div>

            <!-- logo dan media sosial -->
            <div
              class="flex flex-col items-center justify-center gap-6 border-y-3 md:border-y-0 md:border-x-3 border-gray-600 col-span-1 md:col-span-2 py-8 md:py-0"
            >
              <img class="w-25 h-25" src="/src/assets/img/logo/logo.png" alt="Logo" />
              <p class="font-body font-medium text-sm text-center px-4 md:px-20">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni
                cumque harum ex accusamus, culpa quas quibusdam. Non nostrum ea
                porro.
              </p>

              <div class="flex flex-wrap gap-4 justify-center">
                <tooltip-com label="Instagram" no-style>
                  <div
                    class="bg-merah border-3 text-2xl shadow-[3px_3px_0] p-2 transition-all duration-300 hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[0_0_0]"
                  >
                    <i class="fa-brands fa-instagram"></i>
                  </div>
                </tooltip-com>
                <tooltip-com label="LinkedIn" no-style>
                  <div
                    class="bg-biru border-3 text-2xl shadow-[3px_3px_0] p-2 transition-all duration-300 hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[0_0_0]"
                  >
                    <i class="fa-brands fa-linkedin-in"></i>
                  </div>
                </tooltip-com>
                <tooltip-com label="Facebook" no-style>
                  <div
                    class="bg-oren border-3 text-2xl shadow-[3px_3px_0] p-2 transition-all duration-300 hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[0_0_0]"
                  >
                    <i class="fa-brands fa-facebook"></i>
                  </div>
                </tooltip-com>
                <tooltip-com label="WhatsApp" no-style>
                  <div
                    class="bg-nav-bg border-3 text-2xl shadow-[3px_3px_0] p-2 transition-all duration-300 hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[0_0_0]"
                  >
                    <i class="fa-brands fa-whatsapp"></i>
                  </div>
                </tooltip-com>
              </div>
            </div>

            <!-- navigasi -->
            <nav class="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
              <h6 class="font-title font-bold text-2xl">Menu</h6>
              <ul class="flex flex-col gap-4">
                <li class="font-label font-medium text-base">
                  <a href="index.html"> Beranda </a>
                </li>
                <li class="font-label font-medium text-base">
                  <a href="index.html#Tentang"> Tentang Saya </a>
                </li>
                <li class="font-label font-medium text-base">
                  <a href="Project.html"> Projek </a>
                </li>
                <li class="font-label font-medium text-base">
                  <a href="index.html#Skill"> Skill </a>
                </li>
                <li class="font-label font-medium text-base">
                  <a href="index.html#Kontak"> Kontak </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div class="py-5 bg-white border-t-3">
          <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-5 gap-2">
            <p class="font-label font-medium text-xs md:text-sm text-center">Copyright © 2026 HEXS/Aswameda. All rights reserved.</p>
            <p class="font-label font-medium text-xs md:text-sm text-center">Design by HEXS PROJCT</p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("footer-com", Footer);
