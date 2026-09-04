import { categoryColor } from "../assets/data/projects.js";

const grid = document.getElementById("projek-grid");
const empty = document.getElementById("projek-empty");
const btnTambah = document.getElementById("btn-tambah-projek");
const modal = document.getElementById("modal-projek");
const modalTitle = document.getElementById("modal-projek-title");
const form = document.getElementById("form-projek");

const fieldJudul = document.getElementById("pj-judul");
const fieldKategori = document.getElementById("pj-kategori");
const fieldDeskripsi = document.getElementById("pj-deskripsi");
const fieldKonten = document.getElementById("pj-konten");
const fieldDemo = document.getElementById("pj-demo");
const fieldRepo = document.getElementById("pj-repo");
const fieldFoto = document.getElementById("pj-foto");
const fotoPreviewWrap = document.getElementById("pj-foto-preview");
const fotoPreview = document.getElementById("pj-foto-preview-img");
const fieldImage = document.getElementById("pj-image");
const formError = document.getElementById("pj-form-error");
const formErrorText = document.getElementById("pj-form-error-text");

let editingId = null;
let uploadedImage = "";

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isoToDisplay = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
};

export async function fetchProjects() {
  const res = await fetch("/api/projects");
  if (!res.ok) throw new Error("Gagal memuat projek");
  return res.json();
}

export async function loadHistoris() {
  try {
    const res = await fetch("/api/historis");
    if (!res.ok) return;
    const list = await res.json();
    renderHistoris(list);
  } catch {
    /* abaikan gagal historis */
  }
}

export function openModal(project = null) {
  editingId = project ? project.id : null;
  uploadedImage = project ? project.image || "" : "";
  modalTitle.textContent = project ? "Edit Projek" : "Tambah Projek";
  fieldJudul.value = project ? project.title : "";
  fieldKategori.value = project ? project.category : "";
  fieldDeskripsi.value = project ? project.desc : "";
  fieldKonten.value = project ? project.content : "";
  fieldDemo.value = project ? project.demo || "" : "";
  fieldRepo.value = project ? project.repo || "" : "";
  fieldImage.value = uploadedImage;
  fieldFoto.value = "";
  formError.classList.add("hidden");

  if (uploadedImage) {
    fotoPreviewWrap.classList.remove("hidden");
    fotoPreview.src = uploadedImage;
  } else {
    fotoPreviewWrap.classList.add("hidden");
    fotoPreview.removeAttribute("src");
  }

  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  editingId = null;
  uploadedImage = "";
  form.reset();
}

function showError(msg) {
  formErrorText.textContent = msg;
  formError.classList.remove("hidden");
}

async function uploadFoto(file) {
  const fd = new FormData();
  fd.append("image", file);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Upload foto gagal");
  }
  return res.json();
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  formError.classList.add("hidden");

  const payload = {
    title: fieldJudul.value.trim(),
    category: fieldKategori.value,
    desc: fieldDeskripsi.value.trim(),
    content: fieldKonten.value,
    demo: fieldDemo.value.trim(),
    repo: fieldRepo.value.trim(),
    image: uploadedImage,
  };

  try {
    const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
    const method = editingId ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Gagal menyimpan projek");
    }
    closeModal();
    await loadProjects();
    await loadHistoris();
    await updateStats();
  } catch (err) {
    showError(err.message);
  }
});

export async function deleteProject(id) {
  if (!confirm("Yakin ingin menghapus projek ini?")) return;
  try {
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Gagal menghapus projek");
    await loadProjects();
    await updateStats();
  } catch (err) {
    alert(err.message);
  }
}

function cardTemplate(p) {
  const catBg = categoryColor(p.category);
  return `
    <div class="flex flex-col gap-4 bg-white border-3 shadow-[3px_3px_0] p-4 transition-all duration-300 hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[0_0_0]">
      <img src="${esc(p.image || "src/assets/img/ilustrasi.png")}" alt="${esc(p.alt || p.title)}" onerror="this.onerror=null; this.src='src/assets/img/img-error.png';" class="w-full aspect-video object-cover border-2 border-black">
      <div class="flex flex-col gap-2">
        <span class="${catBg} self-start px-2 py-1 font-label font-bold text-xs border-2 border-black">${esc(p.category)}</span>
        <h4 class="font-title font-bold text-xl">${esc(p.title)}</h4>
        <p class="font-body font-medium text-sm line-clamp-3">${esc(p.desc)}</p>
      </div>
      <div class="flex justify-between items-center border-dashed border-t-2 pt-3">
        <p class="font-label font-medium text-sm">${esc(p.date || isoToDisplay(p.created_at))}</p>
        <div class="flex items-center gap-3">
          <button type="button" data-edit="${esc(p.id)}" class="font-label font-medium text-sm flex items-center gap-2 hover:underline">Edit <i class="fa-solid fa-arrow-right"></i></button>
          <button type="button" data-delete="${esc(p.id)}" class="font-label font-medium text-sm text-red-600 hover:underline"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    </div>
  `;
}

export async function loadProjects() {
  try {
    const projects = await fetchProjects();
    if (projects.length === 0) {
      grid.innerHTML = "";
      empty.classList.remove("hidden");
      return;
    }
    empty.classList.add("hidden");
    grid.innerHTML = projects.map(cardTemplate).join("");
  } catch {
    empty.classList.remove("hidden");
    grid.innerHTML =
      '<p class="col-span-full font-body font-medium text-sm text-red-600 text-center">Gagal memuat projek dari server.</p>';
  }
}

function renderHistoris(list) {
  const container = document.getElementById("historis-list");
  if (!container) return;
  const icons = { upload: "fa-upload", balas: "fa-reply", "pesan-masuk": "fa-envelope" };
  container.innerHTML = list
    .map((h) => {
      const icon = icons[h.tipe] || "fa-circle";
      const date = isoToDisplay(h.created_at);
      return `
        <div class="flex items-center justify-between gap-3 px-4 py-2 bg-bro w-full h-12 border-2 shrink-0">
          <div class="flex items-center gap-3 min-w-0">
            <i class="fa-solid ${icon}"></i>
            <h3 class="font-title font-medium text-base truncate">${esc(h.judul)}</h3>
          </div>
          <p class="font-body font-semibold text-sm shrink-0">${date}</p>
        </div>
      `;
    })
    .join("");
}

export async function updateStats() {
  try {
    const projects = await fetchProjects();
    const stats = {
      "stat-projek": projects.length,
    };
    for (const [id, value] of Object.entries(stats)) {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    }
  } catch {
    /* abaikan */
  }

  try {
    const res = await fetch("/api/messages");
    if (res.ok) {
      const list = await res.json();
      const belum = list.filter((m) => !m.is_read).length;
      const sudah = list.filter((m) => m.is_read).length;
      const map = {
        "stat-pesan": list.length,
        "stat-pesan-belum": belum,
        "stat-pesan-sudah": sudah,
      };
      for (const [id, value] of Object.entries(map)) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
      }
    }
  } catch {
    /* abaikan */
  }
}

btnTambah.addEventListener("click", () => openModal());

document.querySelectorAll("[data-close-modal]").forEach((el) => {
  el.addEventListener("click", closeModal);
});

grid.addEventListener("click", (e) => {
  const editBtn = e.target.closest("[data-edit]");
  if (editBtn) {
    const id = editBtn.dataset.edit;
    fetchProjects()
      .then((list) => openModal(list.find((p) => p.id === id)))
      .catch(alert);
    return;
  }
  const delBtn = e.target.closest("[data-delete]");
  if (delBtn) deleteProject(delBtn.dataset.delete);
});

async function cropTo16x9(file) {
  const img = new Image();
  const objectUrl = URL.createObjectURL(file);
  await new Promise((resolve) => {
    img.onload = resolve;
    img.src = objectUrl;
  });

  const srcW = img.naturalWidth;
  const srcH = img.naturalHeight;
  let sx = 0;
  let sy = 0;
  let sWidth = srcW;
  let sHeight = srcH;

  if (srcW / srcH > 16 / 9) {
    sWidth = (srcH * 16) / 9;
    sx = (srcW - sWidth) / 2;
  } else {
    sHeight = (srcW * 9) / 16;
    sy = (srcH - sHeight) / 2;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1600;
  canvas.height = 900;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height);

  URL.revokeObjectURL(objectUrl);

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => resolve(new File([blob], file.name, { type: "image/webp" })),
      "image/webp",
      0.9
    );
  });
}

fieldFoto.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const cropped = await cropTo16x9(file);

    fotoPreviewWrap.classList.remove("hidden");
    fotoPreview.src = URL.createObjectURL(cropped);

    const data = await uploadFoto(cropped);
    uploadedImage = data.image;
    fieldImage.value = uploadedImage;
  } catch (err) {
    showError(err.message);
  }
});
