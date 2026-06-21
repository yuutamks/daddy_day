const btnNo = document.getElementById("no");
const btnSi = document.getElementById("si");
const gif = document.getElementById("gif");
const respuesta = document.getElementById("respuesta");
const musica = document.getElementById("musica");

let scale = 1;

// Botón NO se mueve y hace crecer "Sí"
btnNo.addEventListener("mouseover", () => {
  if (btnNo.style.display === "none" || btnSi.style.display === "none") return;

  // Limitar posición dentro de la ventana
  const maxX = window.innerWidth - btnNo.offsetWidth;
  const maxY = window.innerHeight - btnNo.offsetHeight;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  btnNo.style.left = `${x}px`;
  btnNo.style.top = `${y}px`;

  gif.src = "img/no.gif";

  // Hacer crecer el botón Sí continuamente
  scale += 0.8;
  btnSi.style.transform = `scale(${scale})`;
});

// Al hacer clic en Sí
btnSi.addEventListener("click", () => {
  // Iniciar música al hacer clic en Sí
  musica.volume = 0.5;
  musica.play().catch(() => console.log("El navegador bloqueó la reproducción."));

  // Cambiar gif y mensaje
  gif.src = "img/si.gif";
  respuesta.style.display = "block";
  document.querySelector("h1").innerText = "¡Sabía que dirías que sí! 💕✨";

  // Ocultar ambos botones
  btnSi.style.display = "none";
  btnNo.style.display = "none";

  // Reiniciar tamaño del botón Sí
  scale = 1;
  btnSi.style.transform = "scale(1)";

  // Iniciar fuegos artificiales
  startFireworks();
});

// --- Fuegos artificiales ---
function startFireworks() {
  const canvas = document.getElementById("fireworksCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    const colors = ['#ff4e50', '#f9d423', '#7b2ff7', '#f107a3', '#00ffff', '#ff69b4'];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.02;

      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      if (p.alpha <= 0) particles.splice(i, 1);
    });

    requestAnimationFrame(animate);
  }

  setInterval(createFirework, 300);
  animate();
}

// Ajustar canvas al cambiar tamaño de ventana
window.addEventListener('resize', () => {
  const canvas = document.getElementById("fireworksCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
