export function initDotGrid(wrapper) {
  const canvas = wrapper.querySelector(".dot-grid-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const GAP = 15;
  const BASE_RADIUS = 1.5;
  const MAX_RADIUS = 4;
  const INFLUENCE_RADIUS = 120;

  let dots = [];
  let mouse = { x: -1000, y: -1000 };
  let animId;

  function resize() {
    const rect = wrapper.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    createDots();
  }

  function createDots() {
    dots = [];
    const cols = Math.ceil(canvas.width / GAP);
    const rows = Math.ceil(canvas.height / GAP);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({
          x: c * GAP + GAP / 2,
          y: r * GAP + GAP / 2,
          baseR: BASE_RADIUS,
          currentR: BASE_RADIUS,
        });
      }
    }
  }

  function onMouseMove(e) {
    const rect = wrapper.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }

  function onMouseLeave() {
    mouse.x = -1000;
    mouse.y = -1000;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const dot of dots) {
      const dx = mouse.x - dot.x;
      const dy = mouse.y - dot.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let scale = 0;
      if (dist < INFLUENCE_RADIUS) {
        scale = 1 - dist / INFLUENCE_RADIUS;
        const targetR = dot.baseR + (MAX_RADIUS - dot.baseR) * scale;
        dot.currentR += (targetR - dot.currentR) * 0.08;
      } else {
        dot.currentR += (dot.baseR - dot.currentR) * 0.05;
      }

      const alpha = 0.15 + scale * 0.50;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.currentR, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
      ctx.fill();
    }

    animId = requestAnimationFrame(draw);
  }

  wrapper.addEventListener("mousemove", onMouseMove);
  wrapper.addEventListener("mouseleave", onMouseLeave);
  window.addEventListener("resize", resize);

  resize();
  draw();

  return () => {
    cancelAnimationFrame(animId);
    wrapper.removeEventListener("mousemove", onMouseMove);
    wrapper.removeEventListener("mouseleave", onMouseLeave);
    window.removeEventListener("resize", resize);
  };
}
