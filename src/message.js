const form = document.getElementById("form-kontak");
if (form) {
  const status = document.getElementById("form-kontak-status");

  const showStatus = (msg, ok) => {
    status.textContent = msg;
    status.classList.remove("hidden");
    status.classList.toggle("bg-green-100", ok);
    status.classList.toggle("border-green-700", ok);
    status.classList.toggle("text-green-800", ok);
    status.classList.toggle("bg-red-100", !ok);
    status.classList.toggle("border-red-700", !ok);
    status.classList.toggle("text-red-800", !ok);
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.classList.add("hidden");

    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value,
      message: form.message.value.trim(),
    };

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Gagal mengirim pesan");
      }
      form.reset();
      showStatus("Pesan berhasil dikirim. Terima kasih!", true);
    } catch (err) {
      showStatus(err.message, false);
    }
  });
}
