export function initLogoSlider(trackId) {
  const track = document.getElementById(trackId);
  if (!track) return;

  const speed = 0.3;
  let pos = 0;

  function setup() {
    const items = track.querySelectorAll(".logo-item");
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });
  }

  function animate() {
    pos -= speed;
    const halfWidth = track.scrollWidth / 2;
    if (Math.abs(pos) >= halfWidth) {
      pos = 0;
    }
    track.style.transform = `translateX(${pos}px)`;
    requestAnimationFrame(animate);
  }

  setup();
  animate();
}
