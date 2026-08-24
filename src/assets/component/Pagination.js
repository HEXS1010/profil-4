class Pagination extends HTMLElement {
  connectedCallback() {
    // Attributes for current page and total pages (defaults for styling demo)
    const current = parseInt(this.getAttribute("current")) || 1;
    const total = parseInt(this.getAttribute("total")) || 3;

    this.innerHTML = `
      <div class="flex justify-center items-center gap-2 md:gap-4 mt-16 mb-10 font-label">
        <!-- Previous Button -->
        <button 
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
}

customElements.define("pagination-com", Pagination);
