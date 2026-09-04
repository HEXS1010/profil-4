const list = document.getElementById("pesan-list");
const empty = document.getElementById("pesan-empty");
const modal = document.getElementById("modal-pesan-detail");
const dNama = document.getElementById("pesan-detail-nama");
const dEmail = document.getElementById("pesan-detail-email");
const dSubject = document.getElementById("pesan-detail-subject");
const dMessage = document.getElementById("pesan-detail-message");
const dStatus = document.getElementById("pesan-detail-status");

let activeId = null;

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isoToDisplay = (iso) => {
  if (!iso) return "";
  const d = new Date(iso.replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return "";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()} ${hh}:${mi}`;
};

const PALET = [
  "bg-sidebar",
  "bg-nav-bg",
  "bg-oren",
  "bg-merah",
  "bg-biru",
  "bg-ungu",
  "bg-pink",
  "bg-krim",
  "bg-bro",
];

function avatarHtml(m) {
  const initial = (m.name || "?").trim().charAt(0).toUpperCase() || "?";
  const color = PALET[(m.name || "").length % PALET.length];
  if (m.avatar) {
    return `<img src="/avatar/${esc(m.avatar)}" alt="" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'${color} w-9 h-9 border-2 border-black rounded-full flex items-center justify-center font-title font-bold text-sm shrink-0',textContent:'${initial}'}))" class="w-9 h-9 border-2 border-black rounded-full object-cover shrink-0">`;
  }
  return `<span class="${color} w-9 h-9 border-2 border-black rounded-full flex items-center justify-center font-title font-bold text-sm shrink-0">${initial}</span>`;
}

function rowTemplate(m) {
  const unread = !m.is_read;
  const date = isoToDisplay(m.created_at);
  return `
    <div data-open-pesan="${esc(m.id)}" class="bg-sidebar border-3 flex items-center gap-4 px-5 py-2 shrink-0 cursor-pointer">
      <div class="flex items-center gap-3 min-w-0 w-1/3">
        ${avatarHtml(m)}
        <h5 class="font-title font-bold text-sm truncate">${esc(m.name)}</h5>
      </div>
      <p class="font-label font-medium text-sm truncate w-1/3">${esc(m.email || "—")}</p>
      <div class="flex items-center justify-end gap-3 w-1/3">
        <span class="font-label font-medium text-sm shrink-0">${date}</span>
        <span class="font-label font-bold text-[10px] px-2 py-1 border-2 ${unread ? "bg-merah text-white" : "bg-krim"}">${unread ? "BELUM DIBACA" : "DIBACA"}</span>
      </div>
    </div>
  `;
}

export async function loadMessages() {
  try {
    const res = await fetch("/api/messages");
    if (!res.ok) throw new Error("Gagal memuat pesan");
    const messages = await res.json();
    if (messages.length === 0) {
      list.innerHTML = "";
      empty.classList.remove("hidden");
      return;
    }
    empty.classList.add("hidden");
    list.innerHTML = messages.map(rowTemplate).join("");
  } catch {
    empty.classList.remove("hidden");
    list.innerHTML =
      '<p class="font-body font-medium text-sm text-red-600 text-center">Gagal memuat pesan dari server.</p>';
  }
}

function openDetail(m) {
  activeId = m.id;
  dNama.textContent = m.name;
  dEmail.textContent = m.email;
  dSubject.textContent = m.subject || "—";
  dMessage.textContent = m.message || "";
  dStatus.textContent = m.is_read ? "DIBACA" : "BELUM DIBACA";
  dStatus.classList.toggle("bg-krim", !!m.is_read);
  dStatus.classList.toggle("bg-merah", !m.is_read);
  dStatus.classList.toggle("text-white", !m.is_read);
  modal.classList.remove("hidden");
}

const closeDetail = () => modal.classList.add("hidden");

list.addEventListener("click", async (e) => {
  const row = e.target.closest("[data-open-pesan]");
  if (!row) return;
  const id = row.dataset.openPesan;
  try {
    const res = await fetch("/api/messages");
    if (!res.ok) return;
    const messages = await res.json();
    const m = messages.find((x) => x.id === id);
    if (!m) return;
    if (!m.is_read) {
      await fetch(`/api/messages/${id}/read`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_read: true }),
      });
      m.is_read = true;
      await loadMessages();
    }
    openDetail(m);
  } catch {
    openDetail({ id, name: "?", email: "", subject: "", message: "" });
  }
});

document.querySelectorAll("[data-close-pesan]").forEach((el) => {
  el.addEventListener("click", closeDetail);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && activeId) closeDetail();
});
