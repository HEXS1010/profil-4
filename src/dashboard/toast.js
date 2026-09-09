const CONTAINER_ID = "toast-container";

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export function showToast(
  message = "berhasil upload projek",
  duration = 5000
) {
  let container = document.getElementById(CONTAINER_ID);
  if (!container) {
    container = document.createElement("div");
    container.id = CONTAINER_ID;
    container.setAttribute("aria-live", "polite");
    container.className = "fixed bottom-6 right-6 z-[100] flex flex-col gap-3";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className =
    "toast-item flex flex-col w-80 max-w-[calc(100vw-3rem)] bg-white border-2 border-black shadow-[5px_5px_0_#000] overflow-hidden";
  toast.innerHTML = `
    <div class="flex items-center gap-3 px-4 py-3">
      <span class="flex items-center justify-center bg-hijau-500 text-white border-2 border-black w-9 h-9 rounded-full shrink-0">
        <i class="fa-solid fa-check text-sm"></i>
      </span>
      <p class="font-label font-bold text-sm text-slate-800">${esc(message)}</p>
    </div>
    <div class="toast-progress h-1.5 w-full bg-black/5"></div>
  `;

  const bar = document.createElement("div");
  bar.className = "bg-hijau-500 h-full w-full";
  toast.querySelector(".toast-progress").appendChild(bar);

  container.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      bar.style.transition = `width ${duration}ms linear`;
      bar.style.width = "0%";
    });
  });

  let hideTimer = setTimeout(hide, duration);
  toast.addEventListener("click", () => {
    clearTimeout(hideTimer);
    hide();
  });

  function hide() {
    toast.classList.add("toast-hide");
    const removeOnSlideOut = (e) => {
      if (e.target !== toast || e.propertyName !== "transform") return;
      toast.removeEventListener("transitionend", removeOnSlideOut);
      toast.remove();
    };
    toast.addEventListener("transitionend", removeOnSlideOut);
    setTimeout(() => toast.remove(), 600);
  }
}