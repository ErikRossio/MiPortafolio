const grid = document.getElementById("portfolio-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalMedia = document.getElementById("modal-media");
const yearSpan = document.getElementById("year");
const hideTimers = new WeakMap();
const loadMoreBtn = document.getElementById("load-more");
const PAGE_SIZE = 6;
let currentFilter = "all";
const visibleByFilter = {
  all: PAGE_SIZE,
  streamers: PAGE_SIZE,
  emprendimientos: PAGE_SIZE,
  tiktoks: PAGE_SIZE
};

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear().toString();
}

function applyFilter(filter, resetPage = false) {
  if (!grid) return;
  currentFilter = filter || "all";

  if (resetPage || !visibleByFilter[currentFilter]) {
    visibleByFilter[currentFilter] = PAGE_SIZE;
  }

  const limit = visibleByFilter[currentFilter];
  const items = Array.from(grid.querySelectorAll("[data-category]"));
  let shown = 0;
  let totalMatches = 0;

  items.forEach((item) => {
    const category = item.getAttribute("data-category");
    const matches =
      currentFilter === "all" || category === currentFilter;

    const timer = hideTimers.get(item);
    if (timer) {
      clearTimeout(timer);
      hideTimers.delete(item);
    }

    if (!matches) {
      item.style.opacity = "0";
      const t = window.setTimeout(() => {
        item.style.display = "none";
        hideTimers.delete(item);
      }, 170);
      hideTimers.set(item, t);
      return;
    }

    totalMatches += 1;

    if (shown < limit) {
      item.style.display = "";
      requestAnimationFrame(() => {
        item.style.opacity = "1";
      });
      shown += 1;
    } else {
      item.style.opacity = "0";
      const t = window.setTimeout(() => {
        item.style.display = "none";
        hideTimers.delete(item);
      }, 170);
      hideTimers.set(item, t);
    }
  });

  if (loadMoreBtn) {
    loadMoreBtn.style.display =
      totalMatches > shown ? "inline-flex" : "none";
  }
}

if (grid && filterButtons.length) {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter") || "all";

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      applyFilter(filter, true);
    });
  });

  // estado inicial
  applyFilter("all", true);
}

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    const key = currentFilter || "all";
    visibleByFilter[key] = (visibleByFilter[key] || PAGE_SIZE) + PAGE_SIZE;
    applyFilter(key, false);
  });
}

const modalContent = {
  // STREAMERS (imágenes)
  "streamer-pack-1": {
    title: "Overlay de presentación",
    description: "Diseño de overlay principal para stream, pensado para mostrar identidad de marca y mensaje de bienvenida.",
    mediaType: "image",
    src: "./stremers/presentaicon terminado.png"
  },
  "streamer-intro-1": {
    title: "Pantalla de stream en vivo",
    description: "Diseño para escena en vivo, con espacio para chat, cámara y elementos gráficos del canal.",
    mediaType: "image",
    src: "./stremers/sleep live.jpg"
  },
  "streamer-3": {
    title: "Diseño para stream – Brunenger & Mati",
    description: "Composición con dos creadores para pantalla o arte promocional de stream.",
    mediaType: "image",
    src: "./stremers/bruno y mati terminado.jpg"
  },
  "streamer-4": {
    title: "Flayer para stream",
    description: "Flyer con estética gamer para comunicar horarios o eventos especiales en el canal.",
    mediaType: "image",
    src: "./stremers/FLAYER 3 v2.jpg"
  },
  "streamer-5": {
    title: "Machete de slots",
    description: "Gráfico de apoyo para stream de slots, con elementos visuales claros y llamativos.",
    mediaType: "image",
    src: "./stremers/MacheteSlot.png"
  },
  "streamer-6": {
    title: "Arte para evento en Neuquén",
    description: "Pieza gráfica para anunciar evento con Brunenger en Neuquén.",
    mediaType: "image",
    src: "./stremers/neuquen brunenger.jpg"
  },
  "streamer-7": {
    title: "Arte de stream 1",
    description: "Versión de diseño para pantalla o anuncio de stream.",
    mediaType: "image",
    src: "./stremers/terminado 1.jpg"
  },
  "streamer-8": {
    title: "Arte de stream 1 (variante)",
    description: "Variante del diseño anterior con ajustes de composición y color.",
    mediaType: "image",
    src: "./stremers/terminado 1 (1).jpg"
  },
  "streamer-9": {
    title: "Arte para Brunenger",
    description: "Pieza gráfica centrada en el creador Brunenger para redes o stream.",
    mediaType: "image",
    src: "./stremers/Terminado Brunenger.jpg"
  },
  "streamer-10": {
    title: "Diseño con Wandi",
    description: "Arte con Brunenger y Wandi, pensado para promoción o miniatura.",
    mediaType: "image",
    src: "./stremers/terminado con el wandi.jpg"
  },
  "streamer-11": {
    title: "Arte de stream versión final",
    description: "Versión final pulida del diseño de stream, con detalles de color y luz.",
    mediaType: "image",
    src: "./stremers/terminadov2.jpg"
  },

  // EMPRENDIMIENTOS (imágenes)
  "brand-pack-1": {
    title: "Promo de bebida",
    description: "Pieza promocional para bebida, con foco en el producto y tipografía llamativa.",
    mediaType: "image",
    src: "./emprndimientos/Pormo birra.jpg"
  },
  "launch-ad-1": {
    title: "Flyer evento invierno",
    description: "Diseño para evento con estética invernal, ideal para redes sociales.",
    mediaType: "image",
    src: "./emprndimientos/sabadoinvierno.jpg"
  },
  "brand-2": {
    title: "Promo BB",
    description: "Gráfico promocional para emprendimiento con estética limpia y foco en el mensaje.",
    mediaType: "image",
    src: "./emprndimientos/BBTERMINADO.jpg"
  },
  "brand-3": {
    title: "Flyer Joda",
    description: "Flyer para fiesta o evento nocturno, con tipografía grande y colores intensos.",
    mediaType: "image",
    src: "./emprndimientos/Joda.jpg"
  },
  "brand-4": {
    title: "Flyer sábado cachengue",
    description: "Pieza para boliche / bar, destacando día, lugar y propuesta.",
    mediaType: "image",
    src: "./emprndimientos/sabado cachengue.jpg"
  },
  "brand-5": {
    title: "Diseño Sin título",
    description: "Composición experimental para redes, jugando con color y tipografía.",
    mediaType: "image",
    src: "./emprndimientos/Sin t\u00edtulo-1 (2).jpg"
  },
  "brand-6": {
    title: "Karaoke",
    description: "Flyer para noche de karaoke, con elementos que refuerzan la temática.",
    mediaType: "image",
    src: "./emprndimientos/terminado karaoke.jpg"
  },
  "brand-7": {
    title: "San Valentín",
    description: "Pieza temática de San Valentín para evento o promoción especial.",
    mediaType: "image",
    src: "./emprndimientos/terminado san valentin.jpg"
  },

  // TIKTOKS (videos)
  "tiktok-series-1": {
    title: "Video TikTok 1",
    description:
      "Contenido vertical editado para TikTok, con cortes y ritmo pensados para mantener la atención.",
    mediaType: "video",
    src: "./tiktoks/1.mp4"
  },
  "highlights-1": {
    title: "Video TikTok 2",
    description:
      "Video en formato corto, ideal para highlights o momentos clave de contenido.",
    mediaType: "video",
    src: "./tiktoks/2.mp4"
  },
  "tiktok-3": {
    title: "Video TikTok 3",
    description: "Tercer video de la serie, pensado para vertical y con edición dinámica.",
    mediaType: "video",
    src: "./tiktoks/3.mp4"
  },
  "tiktok-4": {
    title: "Video TikTok 4",
    description: "Cuarto video de la serie, ideal para Reels, Shorts o TikTok.",
    mediaType: "video",
    src: "./tiktoks/4.mp4"
  },
  "tiktok-5": {
    title: "Video TikTok 5",
    description: "Contenido corto con cortes rápidos y foco en el mensaje principal.",
    mediaType: "video",
    src: "./tiktoks/5.mp4"
  },
  "tiktok-6": {
    title: "Video TikTok 6",
    description: "Último video de la serie, listo para usar en plataformas verticales.",
    mediaType: "video",
    src: "./tiktoks/6.mp4"
  }
};

function openModal(key) {
  if (!modal) return;
  const content = modalContent[key];
  if (content) {
    modalTitle.textContent = content.title;
    modalDescription.textContent = content.description;
    if (modalMedia) {
      if (content.mediaType === "image") {
        modalMedia.innerHTML = `<img src="${content.src}" alt="${content.title}">`;
        modalMedia.style.display = "block";
      } else if (content.mediaType === "video") {
        modalMedia.innerHTML = `<video src="${content.src}" controls autoplay playsinline></video>`;
        modalMedia.style.display = "block";
      } else {
        modalMedia.innerHTML = "";
        modalMedia.style.display = "none";
      }
    }
  } else if (modalMedia) {
    modalMedia.innerHTML = "";
    modalMedia.style.display = "none";
  }
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("open");
  document.body.style.overflow = "";
  if (modalMedia) {
    const video = modalMedia.querySelector("video");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }
}

document.querySelectorAll("[data-modal]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.getAttribute("data-modal");
    if (key) {
      openModal(key);
    }
  });
});

document.querySelectorAll("[data-close-modal]").forEach((el) => {
  el.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

function scrollToWork() {
  const section = document.getElementById("trabajos");
  if (section) section.scrollIntoView({ behavior: "smooth" });
}

function scrollToContact() {
  const section = document.getElementById("contacto");
  if (section) section.scrollIntoView({ behavior: "smooth" });
}

window.scrollToWork = scrollToWork;
window.scrollToContact = scrollToContact;

