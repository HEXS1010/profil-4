class colaboration extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="border-t-3 relative">
      <div class="max-w-345 mx-auto border-x-3"> 
      <img class="hero-icon absolute w-40 top-[20%] left-[5%] z-[-1] rotate-50 hidden md:block" src="src/assets/img/com/com-6.png" alt="icon" style="animation-delay: 0.8s">
      <img class="hero-icon absolute w-50 bottom-[20%] right-[4%] z-[-1] hidden md:block" src="src/assets/img/com/com-7.png" alt="icon">
      </div>
        <div class="max-w-5xl mx-auto py-20 px-5 md:px-10">
          <div
            class="px-5 py-5 md:py-10 md:px-20 bg-sidebar border-3 shadow-[4px_4px_0] flex flex-col justify-center md:flex-row md:justify-between items-center -rotate-1 transition-all duration-400 hover:rotate-0"
          >
            <div class="flex flex-col justify-center items-center md:justify-start gap-5">
              <span
                class="flex items-center gap-2 w-fit text-sm font-label font-medium bg-nav-bg px-3 py-1 border-2 shadow-[2px_2px_0]"
                ><i class="fa-solid fa-code-branch"></i> Kolaborasi</span
              >
              <h5 class="font-title font-bold text-xl text-center md:text-left sm:text-4xl">
                Punya Projek Menarik? <br />
                Mari Kolaborasi!
              </h5>
              <p class="font-label font-medium text-sm text-center md:text-left sm:text-base">
                Saya selalu terbuka untuk berkolaborasi, <br />
                seputar mendisain website.
              </p>

              <div class="flex flex-col gap-5 justify-center md:justify-start mt-1 text-center md:text-left">
                <p class="font-label font-normal text-black text-sm sm:text-base">
                  Bisa juga lewat:
                </p>

                <div class="flex flex-wrap gap-4">
                  <tooltip-com label="Instagram" no-style>
                    <div
                      class="bg-merah border-3 text-base shadow-[3px_3px_0] px-2 py-1 transition-all duration-300 hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[0_0_0]"
                    >
                      <i class="fa-brands fa-instagram"></i>
                    </div>
                  </tooltip-com>
                  <tooltip-com label="LinkedIn" no-style>
                    <div
                      class="bg-biru border-3 text-base shadow-[3px_3px_0] px-2 py-1 transition-all duration-300 hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[0_0_0]"
                    >
                      <i class="fa-brands fa-linkedin-in"></i>
                    </div>
                  </tooltip-com>
                  <tooltip-com label="Facebook" no-style>
                    <div
                      class="bg-oren border-3 text-base shadow-[3px_3px_0] px-2 py-1 transition-all duration-300 hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[0_0_0]"
                    >
                      <i class="fa-brands fa-facebook"></i>
                    </div>
                  </tooltip-com>
                  <tooltip-com label="WhatsApp" no-style>
                    <div
                      class="bg-nav-bg border-3 text-base shadow-[3px_3px_0] px-2 py-1 transition-all duration-300 hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[0_0_0]"
                    >
                      <i class="fa-brands fa-whatsapp"></i>
                    </div>
                  </tooltip-com>
                </div>
              </div>
            </div>

            <!-- tombol -->
            <a
              href="message.html"
              class="font-label font-medium text-sm md:text-base px-6 py-2 mt-10 bg-nav-bg border-3 shadow-[4px_4px_0] transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-[0_0_0]"
              >Kirim Pesan <i class="fa-solid fa-arrow-right"></i
            ></a>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("colaboration-com", colaboration);
