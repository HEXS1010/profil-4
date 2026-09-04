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
        onerror="this.onerror=null; this.src='src/assets/img/img-error.png';"
        class="w-xl aspect-video object-cover border-3 block mx-auto"
      />

      <div
        class="project-content md:text-lg mt-10"
      >
        ${project.content}
      </div>
    `;
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
