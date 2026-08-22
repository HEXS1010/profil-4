class Tooltip extends HTMLElement {
  connectedCallback() {
    const label = this.getAttribute("label") || "Tooltip";
    const bg = this.getAttribute("bg") || "bg-sidebar";
    const text = this.textContent.trim();

    this.innerHTML = `
      <div class="relative group inline-block">
        <span
          class="font-label font-medium text-sm ${bg} px-3 py-1 border-2 shadow-[2px_2px_0] cursor-default"
        >
          ${text}
        </span>

        <div
          class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150 whitespace-nowrap z-10"
        >
          <div
            class="bg-white text-black text-xs font-label font-medium px-3 py-1.5 border-2 shadow-[2px_2px_0]"
          >
            ${label}
          </div>
          <div
            class="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-black"
          ></div>
        </div>
      </div>
    `;
  }
}

customElements.define("tooltip-com", Tooltip);
