import { getProjectFromUrl, categoryColor } from "../data/projects.js";

class DetailHeader extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  async render() {
    this.innerHTML = this.skeleton();

    const project = await getProjectFromUrl();

    if (!project) {
      document.title = "Projek Tidak Ditemukan";
      this.innerHTML = this.notFoundTemplate();
      return;
    }

    document.title = `${project.title} · Projek`;
    this.innerHTML = `
      <div class="flex flex-col gap-7">
        <h1 class="font-title font-bold text-xl md:text-5xl">
          <i class="fa-solid fa-folder"></i> ${project.title}
        </h1>
        <p class="font-body font-medium text-base max-w-7xl">
          ${project.desc}
        </p>
      </div>

      <div class="flex flex-wrap gap-5 mt-10">
        <span
          class="${categoryColor(project.category)} px-5 py-2 font-label font-medium text-base border-3 shadow-[2px_2px_0]"
          ><i class="fa-solid fa-code"></i> ${project.category}</span
        >
        <span
          class="bg-sidebar px-5 py-2 font-label font-medium text-base border-3 shadow-[2px_2px_0]"
          ><i class="fa-regular fa-calendar"></i> ${project.date}</span
        >
      </div>
    `;

    this.updateBreadcrumb(project);
  }

  updateBreadcrumb(project) {
    document.dispatchEvent(
      new CustomEvent("breadcrumb-update", {
        detail: [
          { name: "Beranda", url: "index.html", icon: "fa-solid fa-house" },
          { name: "Projek", url: "project.html", icon: "fa-solid fa-folder" },
          { name: project.title, icon: "fa-solid fa-code" },
        ],
      })
    );
  }

  skeleton() {
    return `
      <div class="flex flex-col gap-7 animate-pulse" aria-hidden="true">
        <div class="bg-gray-200 border-2 h-12 w-2/3"></div>
        <div class="bg-gray-200 border-2 h-6 w-full"></div>
        <div class="bg-gray-200 border-2 h-6 w-1/2"></div>
        <div class="flex gap-5 mt-10">
          <div class="bg-gray-200 border-2 h-11 w-32"></div>
          <div class="bg-gray-200 border-2 h-11 w-32"></div>
        </div>
      </div>
    `;
  }

  notFoundTemplate() {
    return `
      <div
        class="flex flex-col items-center gap-5 bg-pink border-3 shadow-[6px_6px_0] px-5 py-10 text-center"
      >
        <i class="fa-solid fa-folder-open text-4xl"></i>
        <p class="font-title font-bold text-xl">Oops! Projek tidak ditemukan.</p>
        <p class="font-body font-medium text-sm max-w-md">
          Coba periksa kembali alamatnya atau lihat semua koleksi projek yang
          tersedia.
        </p>
        <a
          href="/project.html"
          class="inline-flex items-center gap-3 font-label font-medium bg-nav-bg border-3 shadow-[4px_4px_0] px-5 py-2 transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-[0_0_0]"
          >Daftar Projek <i class="fa-solid fa-arrow-right"></i></a
        >
      </div>
    `;
  }
}

customElements.define("detail-header-com", DetailHeader);
