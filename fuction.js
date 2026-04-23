document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("intro-effects");
  if (!container) return;

  const icons = ["💖", "💕", "🌹", "🌸", "🌷", "✨"];

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createFloatingItem() {
    const item = document.createElement("span");
    item.className = "effect-item";
    item.textContent = icons[Math.floor(Math.random() * icons.length)];

    item.style.left = `${random(0, window.innerWidth)}px`;
    item.style.top = `${window.innerHeight + random(20, 200)}px`;
    item.style.animationDuration = `${random(2.5, 5)}s`;

    container.appendChild(item);

    setTimeout(() => {
      item.remove();
    }, 5500);
  }

  function createBurst(x, y) {
    const total = 12;

    for (let i = 0; i < total; i++) {
      const particle = document.createElement("span");
      particle.className = "burst-particle";
      particle.textContent = icons[Math.floor(Math.random() * icons.length)];

      const angle = (Math.PI * 2 * i) / total + random(-0.15, 0.15);
      const distance = random(90, 190);

      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty("--tx", `${tx}px`);
      particle.style.setProperty("--ty", `${ty}px`);

      container.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 1500);
    }
  }

  for (let i = 0; i < 28; i++) {
    setTimeout(() => {
      createFloatingItem();
    }, random(0, 2500));
  }

  for (let i = 0; i < 7; i++) {
    setTimeout(() => {
      const x = random(window.innerWidth * 0.1, window.innerWidth * 0.9);
      const y = random(window.innerHeight * 0.1, window.innerHeight * 0.55);
      createBurst(x, y);
    }, i * 350);
  }

  setTimeout(() => {
    container.classList.add("fade-out");
  }, 3500);

  setTimeout(() => {
    container.remove();
  }, 4400);
});
