import { getProjects, categoryColor } from "../data/projects.js";

class cardProject extends HTMLElement {
  constructor() {
    super();
    this.currentPage = 1;
    this.totalPages = 1;
    this.listenerAttached = false;
  }

  connectedCallback() {
    this.render();
  }

  perPage() {
    return parseInt(this.getAttribute("per-page"), 10);
  }

  limit() {
    return parseInt(this.getAttribute("limit"), 10);
  }

  getPaginationEl() {
    return this.parentElement ? this.parentElement.querySelector("pagination-com") : null;
  }

  async render() {
    this.innerHTML = this.skeleton();

    const per = this.perPage();
    const max = this.limit();

    try {
      const projects = await getProjects();

      let shown = projects;
      if (Number.isInteger(per) && per > 0) {
        this.totalPages = Math.max(1, Math.ceil(projects.length / per));
        this.currentPage = Math.min(this.currentPage, this.totalPages);
        shown = projects.slice((this.currentPage - 1) * per, this.currentPage * per);
      } else if (Number.isInteger(max) && max > 0) {
        shown = projects.slice(0, max);
      }

      this.innerHTML = `
        <div
          class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,350px),1fr))] gap-6 mt-20 px-5"
        >
          ${shown.map((project) => this.cardTemplate(project)).join("")}
        </div>
      `;

      this.syncPagination();
    } catch {
      this.innerHTML = this.errorTemplate();
      this.querySelector("button").addEventListener("click", () => this.render());
    }
  }

  syncPagination() {
    const pagination = this.getPaginationEl();
    if (!pagination) return;

    pagination.setState(this.currentPage, this.totalPages);

    if (!this.listenerAttached) {
      this.listenerAttached = true;
      pagination.addEventListener("pagination-change", (e) => {
        this.currentPage = e.detail.page;
        this.render();
        window.scrollTo({ top: this.offsetTop - 80, behavior: "smooth" });
      });
    }
  }

  cardTemplate(project) {
    return `
      <article
        class="flex flex-col gap-4 bg-white border-3 shadow-[3px_3px_0] p-4 transition-all duration-300 hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[0_0_0]"
      >
        <img
          src="${project.image}"
          alt="${project.alt}"
          onerror="this.onerror=null; this.src='src/assets/img/img-error.png';"
          class="w-full aspect-video object-cover border-2"
        />

        <div class="mt-3 flex justify-between items-center">
          <span
            class="w-fit text-sm font-label font-medium ${categoryColor(project.category)} px-3 py-1 border-2 shadow-[2px_2px_0]"
          >
            ${project.category}
          </span>

          <tooltip-com label="Tanggal upload" no-style class="font-label font-medium text-sm shadow-[2px_2px_0] bg-sidebar border-2 px-3 py-1">${project.date}</tooltip-com>
        </div>

        <h4 class="font-title font-bold text-2xl">${project.title}</h4>
        <p class="font-body font-medium text-base line-clamp-3">
          ${project.desc}
        </p>

        <div
          class="flex justify-between items-center gap-4 bg-transparent font-label font-medium mt-3"
        >
          <a
            href="${project.demo || "#"}"
            class="inline-flex items-center gap-2 text-sm"
            >Pertinjau <i class="fa-solid fa-eye leading-none"></i
          ></a>
          <a
            href="/project-detail.html?id=${project.id}"
            class="inline-flex items-center gap-2 text-sm"
            >Lihat Projek <i class="fa-solid fa-arrow-right leading-none"></i
          ></a>
        </div>
      </article>
    `;
  }

  skeleton() {
    const placeholder = `
      <div
        class="flex flex-col gap-4 bg-white border-3 shadow-[3px_3px_0] p-4 h-104 animate-pulse"
      >
        <div class="bg-gray-200 border-2 aspect-video"></div>
        <div class="bg-gray-200 border-2 h-6 w-24"></div>
        <div class="bg-gray-200 border-2 h-7 w-3/4"></div>
        <div class="bg-gray-200 border-2 h-5"></div>
        <div class="bg-gray-200 border-2 h-5 w-5/6"></div>
      </div>
    `;

    return `
      <div
        class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,350px),1fr))] gap-6 mt-20 px-5"
        aria-hidden="true"
      >
        ${placeholder.repeat(6)}
      </div>
    `;
  }

  errorTemplate() {
    return `
      <div
        class="flex flex-col items-center gap-5 mt-20 mx-5 bg-pink border-3 shadow-[6px_6px_0] px-5 py-10 text-center"
      >
        <i class="fa-solid fa-triangle-exclamation text-4xl"></i>
        <p class="font-title font-bold text-xl">Gagal memuat projek.</p>
        <button
          type="button"
          class="font-label font-medium bg-nav-bg border-3 shadow-[4px_4px_0] px-5 py-2 transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-[0_0_0]"
        >
          Coba Lagi <i class="fa-solid fa-rotate-right"></i>
        </button>
      </div>
    `;
  }
}

customElements.define("card-project", cardProject);
