import { getProjectById, categoryColor } from "../data/projects.js";

class ProjectDetail extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  async render() {
    this.innerHTML = this.skeleton();

    const id = new URLSearchParams(location.search).get("id");

    let project;
    try {
      project = await getProjectById(id);
    } catch {
      this.innerHTML = this.notFoundTemplate("Gagal memuat projek.");
      return;
    }

    if (!project) {
      document.title = "Projek Tidak Ditemukan";
      this.innerHTML = this.notFoundTemplate(
        id
          ? `Projek dengan id "<span class="font-bold">${id}</span>" tidak ditemukan.`
          : "Id projek tidak ada pada alamat URL."
      );
      return;
    }

    document.title = `${project.title} · Projek`;
    this.innerHTML = `
      <article class="flex flex-col gap-8">
        <header class="flex flex-col gap-5">
          <div class="flex flex-wrap justify-between items-center gap-4">
            <span
              class="w-fit text-sm font-label font-medium ${categoryColor(project.category)} px-3 py-1 border-2 shadow-[2px_2px_0]"
            >
              ${project.category}
            </span>

            <tooltip-com label="Tanggal upload">${project.date}</tooltip-com>
          </div>

          <h1 class="font-title font-bold text-3xl md:text-5xl">
            ${project.title}
          </h1>

          <p class="font-body font-medium text-base md:text-lg max-w-3xl">
            ${project.desc}
          </p>
        </header>

        <img
          src="${project.image}"
          alt="${project.alt}"
          class="w-full border-3 shadow-[6px_6px_0]"
        />

        <div class="project-content font-body font-medium text-base md:text-lg">
          ${project.content}
        </div>

        ${this.actionLinks(project)}
      </article>
    `;

    this.updateBreadcrumb(project);
  }

  actionLinks(project) {
    const linkClass =
      "inline-flex items-center gap-3 font-label font-medium border-3 shadow-[6px_6px_0] px-5 py-3 transition-all duration-300 hover:translate-x-1.5 hover:translate-y-1.5 hover:shadow-[0_0_0]";

    const links = [];

    if (project.demo) {
      links.push(`
        <a href="${project.demo}" target="_blank" rel="noopener" class="${linkClass} bg-nav-bg"
          >Pertinjau Demo <i class="fa-solid fa-eye"></i></a>
      `);
    }

    if (project.repo) {
      links.push(`
        <a href="${project.repo}" target="_blank" rel="noopener" class="${linkClass} bg-sidebar"
          ><i class="fa-brands fa-github"></i> Source Code</a>
      `);
    }

    if (links.length === 0) return "";

    return `<div class="flex flex-wrap items-center gap-4 mt-2">${links.join("")}</div>`;
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
      <div class="flex flex-col gap-8 animate-pulse" aria-hidden="true">
        <div class="bg-gray-200 border-2 h-7 w-28"></div>
        <div class="bg-gray-200 border-2 h-12 w-3/4"></div>
        <div class="bg-gray-200 border-2 h-6 w-2/3"></div>
        <div class="bg-gray-200 border-3 shadow-[3px_3px_0] h-72 md:h-96"></div>
        <div class="bg-gray-200 border-2 h-5"></div>
        <div class="bg-gray-200 border-2 h-5 w-5/6"></div>
        <div class="bg-gray-200 border-2 h-5 w-4/6"></div>
      </div>
    `;
  }

  notFoundTemplate(message) {
    return `
      <div
        class="flex flex-col items-center gap-5 bg-pink border-3 shadow-[6px_6px_0] px-5 py-10 text-center"
      >
        <i class="fa-solid fa-folder-open text-4xl"></i>
        <p class="font-title font-bold text-xl">Oops! ${message}</p>
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

customElements.define("project-detail-com", ProjectDetail);
