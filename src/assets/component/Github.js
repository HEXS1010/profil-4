const LEVEL_COLORS = ["#ffffff", "#c9ead1", "#88d498", "#52ab74", "#2f7f4f"];

class Github extends HTMLElement {
  connectedCallback() {
    this.username = this.getAttribute("username") || "octocat";
    this.noHeader = this.hasAttribute("no-header");
    this.innerHTML = this.skeleton();
    this.init();
  }

  skeleton() {
    return `
      <div class="animate-pulse flex flex-col gap-6 px-5">
        <div class="h-8 w-44 bg-white border-2"></div>
        <div class="h-72 w-full max-w-md bg-white border-2"></div>
      </div>
    `;
  }

  esc(str) {
    return String(str ?? "").replace(/[&<>"']/g, (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c]
    );
  }

  fmtFull(iso) {
    return new Date(iso).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  async init() {
    const getJson = (url) =>
      fetch(url).then((res) => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      });

    const [profil, kontribusi] = await Promise.allSettled([
      getJson(`https://api.github.com/users/${this.username}`),
      getJson(
        `https://github-contributions-api.jogruber.de/v4/${this.username}?y=last`
      ),
    ]);

    if (
      profil.status === "rejected" &&
      kontribusi.status === "rejected"
    ) {
      this.innerHTML = `
        <div class="mx-5 bg-white border-3 border-black shadow-[3px_3px_0] p-8 text-center">
          <i class="fa-solid fa-triangle-exclamation text-2xl"></i>
          <p class="font-body font-medium mt-3">
            Gagal memuat data GitHub. Coba refresh halaman ya.
          </p>
        </div>
      `;
      return;
    }

    const user = profil.status === "fulfilled" ? profil.value : null;
    const data =
      kontribusi.status === "fulfilled" ? kontribusi.value : null;

    const total =
      data?.contributions?.reduce((sum, d) => sum + d.count, 0) ?? 0;

    this.innerHTML = `
      ${
        this.noHeader
          ? ""
          : `
      <div class="flex flex-col gap-6 px-5">
        <span
          class="w-fit flex items-center gap-2 text-sm font-label font-medium bg-nav-bg px-3 py-1 border-2 shadow-[2px_2px_0]"
        >
          <i class="fa-brands fa-github"></i> GitHub
        </span>
        <h4 class="font-title font-bold text-3xl md:text-5xl">
          Kode Hari Ini, Jejak Selamanya.
        </h4>
        <p class="font-body font-medium max-w-2xl text-sm md:text-base">
          Rekam jejak kontribusi saya di GitHub — diambil langsung dan
          real-time dari API GitHub.
        </p>
      </div>

      `
      }
      <div
        class="grid gap-6 ${this.noHeader ? "mt-10" : "mt-20"} px-5 grid-cols-1 lg:grid-cols-[1fr_1.6fr] items-start"
      >
        ${
          user
            ? `<div class="bg-white border-3 border-black shadow-[3px_3px_0] p-4 md:p-5 flex flex-col justify-center items-center gap-3 md:gap-4">
        <img
          src="${this.esc(user.avatar_url)}"
          alt="Avatar ${this.esc(user.login)}"
          class="w-20 h-20 md:w-24 md:h-24 rounded-full border-3 object-cover"
        />
        <div class="text-center">
          <p class="font-title font-bold text-xl md:text-2xl leading-tight">
            ${this.esc(user.name || user.login)}
          </p>
          <a
            href="https://github.com/${this.esc(user.login)}"
            target="_blank"
            rel="noopener"
            class="font-label text-xs text-slate-600 hover:underline"
          >
            @${this.esc(user.login)}
          </a>
        </div>
        ${
          user.bio
            ? `<p class="font-body font-medium text-xs md:text-sm text-slate-700 text-center">${this.esc(user.bio)}</p>`
            : ""
        }
        <div class="flex flex-wrap gap-2 md:gap-3 justify-center">
          <span
            class="flex items-center gap-1.5 md:gap-2 font-label text-[10px] md:text-xs bg-krim border-2 shadow-[2px_2px_0] px-2 md:px-3 py-1 md:py-1.5"
          >
            <i class="fa-solid fa-users"></i> ${user.followers} followers
          </span>
          <span
            class="flex items-center gap-1.5 md:gap-2 font-label text-[10px] md:text-xs bg-krim border-2 shadow-[2px_2px_0] px-2 md:px-3 py-1 md:py-1.5"
          >
            <i class="fa-solid fa-folder-open"></i> ${user.public_repos} repo
          </span>
        </div>
      </div>`
            : ""
        }

        <div
          class="bg-bro border-3 border-black shadow-[3px_3px_0] p-4 md:p-6 flex flex-col gap-4 md:gap-5"
        >
          <p class="font-body text-sm md:text-base">
            <span class="font-title font-bold text-2xl md:text-4xl mr-2"
              >${total}</span
            >
            kontribusi dalam setahun terakhir
          </p>

          ${
            data
              ? `<div class="overflow-x-auto pb-1">${this.heatmap(data.contributions)}</div>`
              : `<p class="font-body text-sm">Data heatmap tidak tersedia saat ini.</p>`
          }

          <div
            class="flex items-center gap-1.5 font-label text-[10px] text-slate-700"
          >
            Sedikit
            ${LEVEL_COLORS.map(
              (c) =>
                `<span class="gh-cell" style="background:${c}"></span>`
            ).join("")}
            Banyak
          </div>
        </div>
      </div>
    `;
  }

  heatmap(contributions) {
    const pad = new Date(contributions[0].date).getDay();
    let cells = "";

    for (let i = 0; i < pad; i++) {
      cells += `<span class="gh-cell" style="background:transparent;border-color:transparent"></span>`;
    }

    for (const d of contributions) {
      cells += `<span class="gh-cell" style="background:${
        LEVEL_COLORS[d.level]
      }" title="${d.count} kontribusi · ${this.fmtFull(d.date)}"></span>`;
    }

    return `<div class="gh-grid">${cells}</div>`;
  }
}

customElements.define("github-com", Github);
