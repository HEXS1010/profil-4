class Breadcrumb extends HTMLElement {
  connectedCallback() {
    this.render();

    // Listen to history state changes (popstate) so it updates if they navigate or change search params
    this.handleLocationChange = this.handleLocationChange.bind(this);
    window.addEventListener("popstate", this.handleLocationChange);

    // Listen to a custom event in case of dynamic SPA-like route/filter changes
    this.handleCustomUpdate = this.handleCustomUpdate.bind(this);
    document.addEventListener("breadcrumb-update", this.handleCustomUpdate);
  }

  disconnectedCallback() {
    window.removeEventListener("popstate", this.handleLocationChange);
    document.removeEventListener("breadcrumb-update", this.handleCustomUpdate);
  }

  handleLocationChange() {
    this.render();
  }

  handleCustomUpdate(e) {
    if (e.detail) {
      this.render(e.detail);
    }
  }

  render(customPaths = null) {
    let paths = [];

    if (customPaths) {
      paths = customPaths;
    } else {
      const pathsAttr = this.getAttribute("paths");
      if (pathsAttr) {
        try {
          paths = JSON.parse(pathsAttr);
        } catch (e) {
          console.error(
            "Failed to parse paths attribute in breadcrumb-com:",
            e,
          );
        }
      }
    }

    // If paths are still empty, auto-detect from URL
    if (paths.length === 0) {
      // 1. Always start with Beranda (Home)
      paths.push({
        name: "Beranda",
        url: "index.html",
        icon: "fa-solid fa-house",
      });

      const pathname = window.location.pathname;
      const filename = pathname.split("/").pop() || "index.html";

      // If the current file is not index.html, resolve the page name
      if (filename !== "index.html" && filename !== "") {
        // Handle Project Page
        if (filename.toLowerCase().includes("project")) {
          paths.push({
            name: "Projek",
            url: "project.html",
            icon: "fa-solid fa-folder",
          });

          // Check if there is a category query parameter (e.g. ?category=website)
          const urlParams = new URLSearchParams(window.location.search);
          const category = urlParams.get("category");
          if (category) {
            let categoryName = category;
            let icon = "fa-solid fa-code";

            // Format standard category names nicely
            if (category === "website" || category === "webside") {
              categoryName = "Website";
              icon = "fa-solid fa-code";
            } else if (
              category === "uiux" ||
              category === "ui-ux" ||
              category === "design"
            ) {
              categoryName = "UI/UX Design";
              icon = "fa-solid fa-palette";
            } else {
              categoryName =
                category.charAt(0).toUpperCase() + category.slice(1);
            }

            paths.push({
              name: categoryName,
              url: `project.html?category=${category}`,
              icon: icon,
            });
          }
        } else if (filename.toLowerCase().includes("about-me")) {
          paths.push({
            name: "Tentang Saya",
            url: filename,
            icon: "fa-solid fa-circle-user",
          });
        } else {
          // General fallback for other future pages (e.g., about.html, skills.html)
          const cleanName = filename.replace(".html", "");
          const formattedName =
            cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
          paths.push({
            name: formattedName,
            url: filename,
            icon: "fa-solid fa-message",
          });
        }
      }
    }

    // Render HTML with Neo-Brutalist design: border-2, black outline, flat shadow, font-label
    let htmlContent = `
      <nav aria-label="Breadcrumb" class="flex flex-wrap items-center text-xs md:text-base gap-2 md:gap-3 font-label mb-6">
    `;

    paths.forEach((path, index) => {
      const isLast = index === paths.length - 1;

      if (isLast) {
        htmlContent += `
          <div class="flex items-center gap-1.5 text-black font-medium
           cursor-default">
            ${path.icon ? `<i class="${path.icon}"></i>` : ""}
            <span>${path.name}</span>
          </div>
        `;
      } else {
        htmlContent += `
          <a href="${path.url}" class="flex items-center gap-1.5 text-black font-medium focus:outline-none focus:ring-0">
            ${path.icon ? `<i class="${path.icon}"></i>` : ""}
            <span>${path.name}</span>
          </a>
          <span class="text-black flex items-center justify-center h-full text-xs" aria-hidden="true">
            <i class="fa-solid fa-chevron-right"></i>
          </span>
        `;
      }
    });

    htmlContent += `</nav>`;
    this.innerHTML = htmlContent;
  }
}

customElements.define("breadcrumb-com", Breadcrumb);
