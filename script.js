/* =========================
   AOS con retry + fallback
   ========================= */
(function initAOSWithRetry() {
  const MAX_MS = 5000;     // reintenta hasta 5s
  const INTERVAL_MS = 150; // cada 150ms
  const start = Date.now();

  function tryInit() {
    if (window.AOS && typeof AOS.init === 'function') {
      document.documentElement.classList.remove('no-aos'); // quita el fallback si estaba
      AOS.init({
        once: true,
        offset: 80,
        easing: 'ease-out-cubic',
        duration: 700
      });
      return; // listo
    }
    if (Date.now() - start < MAX_MS) {
      setTimeout(tryInit, INTERVAL_MS);
    } else {
      // no cargó AOS: garantizamos que se vea todo igual
      document.documentElement.classList.add('no-aos');
    }
  }

  if (document.readyState === 'complete') {
    tryInit();
  } else {
    window.addEventListener('load', tryInit);
  }
})();

/* =========================
   Código "escribiéndose"
   ========================= */
(function typingEffect() {
  const typingEl = document.getElementById('typing-code');
  if (!typingEl) return; // no hay consola en la página

  // EDITABLE: poné true si querés que el efecto se repita en bucle
  const REPEAT = false;

  const codeLines = [
    "const opifex = createOrchestrator({",
    "  printers: ['MK3S', 'Ender3'],",
    "  strategy: 'predictive-queue',",
    "});",
    "",
    "opifex.on('ready', () => {",
    "  console.log('OPIFEX listo 🚀');",
    "});",
    "",
    "opifex.enqueue('pieza_flex.ini');"
  ];

  const SPEED = 28;   // ms por carácter
  const PAUSE = 200;  // ms entre líneas

  let lineIndex = 0;
  let charIndex = 0;

  function typeNext() {
    if (lineIndex < codeLines.length) {
      if (charIndex < codeLines[lineIndex].length) {
        typingEl.innerHTML += codeLines[lineIndex][charIndex++];
        setTimeout(typeNext, SPEED);
      } else {
        typingEl.innerHTML += "<br>";
        lineIndex++; charIndex = 0;
        setTimeout(typeNext, PAUSE);
      }
    } else if (REPEAT) {
      // limpiar y repetir
      setTimeout(() => {
        typingEl.innerHTML = "";
        lineIndex = 0; charIndex = 0;
        typeNext();
      }, 800);
    }
  }

  // Arranca cuando el DOM está listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', typeNext);
  } else {
    typeNext();
  }
})();

/* =========================
   Año dinámico en el footer
   ========================= */
(function setYear() {
  const yEl = document.getElementById('y');
  if (yEl) yEl.textContent = String(new Date().getFullYear());
})();
