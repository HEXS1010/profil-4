import { getProjectFromUrl } from "../data/projects.js";

class DetailBody extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  async render() {
    this.innerHTML = this.skeleton();

    const project = await getProjectFromUrl();
    if (!project) {
      this.innerHTML = "";
      return;
    }

    this.innerHTML = `
      <img
        src="${project.image}"
        alt="${project.alt}"
        class="w-full aspect-video object-cover border-3 shadow-[6px_6px_0]"
      />

      <div
        class="project-content font-body font-medium text-base md:text-lg mt-10"
      >
        ${project.content}
      </div>

      ${this.actionLinks(project)}
    `;
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

    return `<div class="flex flex-wrap items-center gap-4 mt-10">${links.join("")}</div>`;
  }

  skeleton() {
    return `
      <div class="animate-pulse" aria-hidden="true">
        <div class="bg-gray-200 border-3 shadow-[3px_3px_0] aspect-video"></div>
        <div class="bg-gray-200 border-2 h-5 w-5/6 mt-10"></div>
        <div class="bg-gray-200 border-2 h-5 w-4/6 mt-4"></div>
      </div>
    `;
  }
}

customElements.define("detail-body-com", DetailBody);
