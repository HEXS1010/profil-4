class Pagination extends HTMLElement {
  constructor() {
    super();
    this.current = 1;
    this.total = 1;
  }

  connectedCallback() {
    this.current = parseInt(this.getAttribute("current")) || 1;
    this.total = parseInt(this.getAttribute("total")) || 1;
    this.render();
    this.bindEvents();
  }

  setState(current, total) {
    this.current = current;
    this.total = total;
    this.render();
  }

  render() {
    const { current, total } = this;
    this.innerHTML = `
      <div class="flex justify-center items-center gap-2 md:gap-4 mt-16 mb-10 font-label">
        <!-- Previous Button -->
        <button
          data-nav="prev"
          class="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black shadow-[3px_3px_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
          ${current === 1 ? "disabled" : ""}
        >
          <i class="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          <span class="hidden md:inline">Sebelumnya</span>
        </button>

        <!-- Page Numbers -->
        <div class="flex items-center gap-2">
          ${this.renderPageNumbers(current, total)}
        </div>

        <!-- Next Button -->
        <button
          data-nav="next"
          class="font-label font-medium flex items-center gap-2 px-4 py-2 bg-white border-2 border-black shadow-[3px_3px_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
          ${current === total ? "disabled" : ""}
        >
          <span class="hidden md:inline">Selanjutnya</span>
          <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
        </button>
      </div>
    `;
  }

  renderPageNumbers(current, total) {
    let pages = "";
    for (let i = 1; i <= total; i++) {
      const isActive = i === current;
      pages += `
        <button
          data-page="${i}"
          class="w-10 h-10 flex items-center justify-center border-2 border-black font-bold transition-all duration-200
          ${
            isActive
              ? "bg-nav-bg shadow-none translate-x-0.5 translate-y-0.5"
              : "bg-white shadow-[3px_3px_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-bro"
          }"
        >
          ${i}
        </button>
      `;
    }
    return pages;
  }

  goTo(page) {
    if (page < 1 || page > this.total || page === this.current) return;
    this.dispatchEvent(new CustomEvent("pagination-change", { detail: { page } }));
  }

  bindEvents() {
    this.addEventListener("click", (e) => {
      const pageBtn = e.target.closest("[data-page]");
      if (pageBtn) {
        this.goTo(parseInt(pageBtn.dataset.page, 10));
        return;
      }
      const nav = e.target.closest("[data-nav]");
      if (!nav || nav.disabled) return;
      this.goTo(nav.dataset.nav === "next" ? this.current + 1 : this.current - 1);
    });
  }
}

customElements.define("pagination-com", Pagination);
