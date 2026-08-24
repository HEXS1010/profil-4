const localProjects = [
  {
    id: "web-ramen",
    title: "Web Ramen",
    category: "Lomba",
    date: "18/8/2026",
    image: "src/assets/img/ilustrasi.png",
    alt: "Tangkapan layar website Web Ramen",
    desc: "Landing page warung ramen interaktif dengan menu digital dan simulasi pemesanan online.",
    content: `
      <p>
        Web Ramen adalah proyek lomba yang mengangkat tema kuliner lokal ke
        dalam bentuk landing page interaktif. Pengunjung bisa melihat menu,
        mengatur porsi, dan mensimulasikan proses pemesanan dari awal sampai
        akhir.
      </p>
      <h3>Fitur Utama</h3>
      <ul>
        <li>Menu digital dengan kategori dan pencarian</li>
        <li>Keranjang pesanan tanpa reload halaman</li>
        <li>Animasi uap masakan memakai canvas 2D</li>
      </ul>
      <h3>Teknologi</h3>
      <p>
        Dibangun murni dengan HTML, CSS, dan JavaScript vanilla tanpa
        framework, sehingga ukuran bundle tetap kecil dan waktu muat cepat.
      </p>
    `,
    demo: "",
    repo: "",
  },
  {
    id: "portofolio-neo",
    title: "Portofolio Neo-Brutalisme",
    category: "Pribadi",
    date: "20/8/2026",
    image: "src/assets/img/ilustrasi.png",
    alt: "Tangkapan layar website portofolio",
    desc: "Website portofolio pribadi bergaya neo-brutalisme dengan Web Components dan heatmap GitHub real-time.",
    content: `
      <p>
        Proyek ini adalah website portofolio yang sedang Anda lihat sekarang.
        Seluruh antarmuka disusun dari Native Web Components agar setiap
        bagian (navbar, footer, kartu projek) modular dan mudah dipakai ulang.
      </p>
      <h3>Fitur Utama</h3>
      <ul>
        <li>Background dot-grid interaktif di hero</li>
        <li>Heatmap kontribusi GitHub langsung dari API</li>
        <li>Desain responsif dengan Tailwind CSS v4</li>
      </ul>
      <h3>Target Pengembangan</h3>
      <p>
        Rencana berikutnya adalah CMS sederhana supaya daftar projek bisa
        dikelola lewat halaman admin tanpa menyentuh kode sama sekali.
      </p>
    `,
    demo: "",
    repo: "",
  },
  {
    id: "kasir-warung",
    title: "Aplikasi Kasir Warung",
    category: "Klien",
    date: "2/7/2026",
    image: "src/assets/img/ilustrasi.png",
    alt: "Tangkapan layar aplikasi kasir warung",
    desc: "Aplikasi kasir sederhana untuk UMKM dengan rekap penjualan harian dan cetak struk.",
    content: `
      <p>
        Aplikasi kasir ini dibuat untuk membantu pemilik warung mencatat
        transaksi tanpa perlu mesin kasir mahal. Semua data tersimpan di
        perangkat sehingga tetap bisa dipakai saat internet mati.
      </p>
      <h3>Fitur Utama</h3>
      <ul>
        <li>Input barang cepat dengan barcode manual</li>
        <li>Rekap penjualan harian dan bulanan</li>
        <li>Cetak struk Thermal Printer</li>
      </ul>
    `,
    demo: "",
    repo: "",
  },
  {
    id: "cuaca-bali",
    title: "Info Cuaca Bali",
    category: "Pribadi",
    date: "14/6/2026",
    image: "src/assets/img/ilustrasi.png",
    alt: "Tangkapan layar aplikasi info cuaca Bali",
    desc: "Dashboard prakiraan cuaca untuk kabupaten di Bali menggunakan API cuaca terbuka.",
    content: `
      <p>
        Info Cuaca Bali menampilkan prakiraan cuaca beberapa hari ke depan
        untuk seluruh kabupaten di Bali. Data diambil dari API cuaca terbuka
        lalu ditampilkan sebagai kartu ringkas yang mudah dibaca.
      </p>
      <h3>Fitur Utama</h3>
      <ul>
        <li>Prakiraan 5 hari untuk tiap kabupaten</li>
        <li>Ikon cuaca yang berubah sesuai kondisi</li>
        <li>Mode gelap otomatis mengikuti jam perangkat</li>
      </ul>
    `,
    demo: "",
    repo: "",
  },
  {
    id: "kalkulator-diskon",
    title: "Kalkulator Diskon",
    category: "Lomba",
    date: "28/5/2026",
    image: "src/assets/img/ilustrasi.png",
    alt: "Tangkapan layar kalkulator diskon",
    desc: "Kalkulator diskon bertema neo-brutalisme untuk hitung harga akhir, pajak, dan hemat belanja.",
    content: `
      <p>
        Kalkulator diskon membantu pembeli online menghitung harga akhir
        setelah diskon bertingkat beserta pajaknya. Hasil perhitungan
        ditampilkan langsung saat angka diketik tanpa tombol submit.
      </p>
      <h3>Fitur Utama</h3>
      <ul>
        <li>Diskon bertingkat (misal 30% + 10%)</li>
        <li>Perhitungan pajak opsional</li>
        <li>Riwayat perhitungan yang bisa dihapus satu-satu</li>
      </ul>
    `,
    demo: "",
    repo: "",
  },
  {
    id: "web-sekolah",
    title: "Website Profil Sekolah",
    category: "Klien",
    date: "9/4/2026",
    image: "src/assets/img/ilustrasi.png",
    alt: "Tangkapan layar website profil sekolah",
    desc: "Website profil sekolah dengan pengumuman, agenda, dan galeri kegiatan siswa.",
    content: `
      <p>
        Website profil sekolah menjadi wajah digital sekolah sekaligus pusat
        informasi bagi siswa dan orang tua. Kontennya mencakup profil
        jurusan, pengumuman terbaru, dan galeri kegiatan.
      </p>
      <h3>Fitur Utama</h3>
      <ul>
        <li>Pengumuman dengan filter berdasarkan tanggal</li>
        <li>Galeri kegiatan dengan lightbox</li>
        <li>Halaman kontak terhubung WhatsApp</li>
      </ul>
    `,
    demo: "",
    repo: "",
  },
];

const categoryColors = {
  Lomba: "bg-nav-bg",
  Pribadi: "bg-sidebar",
  Klien: "bg-ungu",
};

export const categoryColor = (category) => categoryColors[category] || "bg-white";

export async function getProjects() {
  return localProjects;
}

// === NANTI (saat backend sudah jadi, ganti isi fungsi di atas) ===
// export async function getProjects() {
//   const res = await fetch("/api/projects");
//   if (!res.ok) throw new Error("Gagal memuat projek");
//   return res.json();
// }

export async function getProjectById(id) {
  const projects = await getProjects();
  return projects.find((project) => project.id === id);
}

let urlProjectPromise = null;

export function getProjectFromUrl() {
  if (!urlProjectPromise) {
    const id = new URLSearchParams(location.search).get("id");
    urlProjectPromise = getProjectById(id).catch(() => null);
  }
  return urlProjectPromise;
}
