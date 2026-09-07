const body = document.body,
  opening = document.getElementById("opening"),
  enter = document.getElementById("enter"),
  menu = document.querySelector(".menu"),
  nav = document.querySelector(".topbar nav");
const invitationAudio = new Audio("assets/VIDEO-2026-09-05-09-45-31.aac");
invitationAudio.loop = true;
invitationAudio.volume = 0.8;
if (window.lucide) window.lucide.createIcons();
function setMenuIcon(name) {
  menu.innerHTML = `<i data-lucide="${name}" aria-hidden="true"></i>`;
  if (window.lucide) window.lucide.createIcons();
}
function revealHero() {
  document
    .querySelectorAll(".hero .anim")
    .forEach((el) => el.classList.add("visible"));
}
enter.addEventListener("click", () => {
  invitationAudio.play().catch(() => {});
  opening.classList.add("leave");
  body.classList.remove("locked");
  setTimeout(revealHero, 450);
  setTimeout(() => opening.remove(), 1500);
});
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") === "true";
  menu.setAttribute("aria-expanded", String(!open));
  menu.setAttribute(
    "aria-label",
    open ? "Open navigation" : "Close navigation",
  );
  setMenuIcon(open ? "menu" : "x");
  nav.classList.toggle("open", !open);
  body.classList.toggle("locked", !open);
});
nav.addEventListener("click", (event) => {
  if (!event.target.matches("a")) return;
  menu.setAttribute("aria-expanded", "false");
  setMenuIcon("menu");
  nav.classList.remove("open");
  body.classList.remove("locked");
});
const target = new Date("2026-12-19T10:00:00+02:00").getTime();
function countdown() {
  const left = Math.max(0, target - Date.now()),
    values = [
      Math.floor(left / 864e5),
      Math.floor(left / 36e5) % 24,
      Math.floor(left / 6e4) % 60,
      Math.floor(left / 1e3) % 60,
    ];
  ["days", "hours", "minutes", "seconds"].forEach(
    (id, i) =>
      (document.getElementById(id).textContent = String(values[i]).padStart(
        i ? 2 : 3,
        "0",
      )),
  );
}
countdown();
setInterval(countdown, 1000);
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }),
  { threshold: 0.14 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
const progress = document.querySelector(".progress span");
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${max ? (scrollY / max) * 100 : 0}%`;
    ticking = false;
  });
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Image layers provide the fixed-background look consistently on mobile browsers.
const quotePhoto = document.querySelector(".quote>img");
const rsvpSection = document.querySelector(".rsvp");
const rsvpPhoto = document.createElement("img");
rsvpPhoto.src = "assets/img/_MG_0181.webp";
rsvpPhoto.alt = "";
rsvpPhoto.loading = "lazy";
rsvpPhoto.setAttribute("aria-hidden", "true");
rsvpSection.prepend(rsvpPhoto);
const fixedPhotos = [quotePhoto, rsvpPhoto];
fixedPhotos.forEach((photo) => photo.classList.add("fixed-bg-photo"));
function positionFixedPhotos() {
  fixedPhotos.forEach((photo) => {
    const section = photo.parentElement,
      rect = section.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > innerHeight) return;
    const travel = (innerHeight - rect.top) / (innerHeight + rect.height);
    photo.style.transform = `translate3d(0,${(travel - 0.5) * 16}%,0) scale(1.04)`;
  });
}
addEventListener("scroll", positionFixedPhotos, { passive: true });
addEventListener("resize", positionFixedPhotos, { passive: true });
positionFixedPhotos();

// Subtle depth motion for editorial imagery and decorative details.
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const parallaxItems = reduceMotion
  ? []
  : [
      { element: document.querySelector(".hero-photo"), speed: -18 },
      { element: document.querySelector(".sun"), speed: 10 },
      { element: document.querySelector(".photo-back"), speed: -16 },
      { element: document.querySelector(".photo-front"), speed: 12 },
      ...Array.from(document.querySelectorAll(".event-image img")).map(
        (element, index) => ({ element, speed: index % 2 ? -14 : 14 }),
      ),
      ...Array.from(document.querySelectorAll(".look-orb")).map(
        (element, index) => ({ element, speed: index % 2 ? 9 : -9 }),
      ),
    ].filter((item) => item.element);
function updateParallax() {
  parallaxItems.forEach(({ element, speed }) => {
    const host = element.closest("section") || element,
      rect = host.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > innerHeight) return;
    const center = rect.top + rect.height / 2 - innerHeight / 2;
    const offset = Math.max(-1, Math.min(1, center / innerHeight)) * speed;
    element.style.setProperty("--parallax-y", `${offset}px`);
  });
}
let parallaxTicking = false;
function requestParallax() {
  if (parallaxTicking) return;
  parallaxTicking = true;
  requestAnimationFrame(() => {
    updateParallax();
    parallaxTicking = false;
  });
}
if (!reduceMotion) {
  addEventListener("scroll", requestParallax, { passive: true });
  addEventListener("resize", requestParallax, { passive: true });
  updateParallax();
}

// Keep the editorial gallery swipeable on mobile and clearly navigable on desktop.
const filmstrip = document.querySelector(".filmstrip");
const galleryImages = [
  ["_MG_0001.webp", "A quiet beginning"],
  ["_MG_0003.webp", "Together in the moment"],
  ["_MG_0008.webp", "A little more love"],
  ["_MG_0010.webp", "The way we look at each other"],
  ["_MG_0011.webp", "Always by your side"],
  ["_MG_0014.webp", "A memory to keep"],
  ["_MG_0017.webp", "Love, captured"],
  ["_MG_0020.webp", "Our kind of magic"],
  ["_MG_0022.webp", "Just us"],
  ["_MG_0040.webp", "A beautiful day"],
  ["_MG_0055.webp", "The happy couple"],
  ["_MG_0068.webp", "A shared smile"],
  ["_MG_0077.webp", "Forever starts here"],
  ["_MG_0090.webp", "In this together"],
  ["_MG_0149.webp", "Our favourite people"],
  ["_MG_0171.webp", "A moment of joy"],
  ["_MG_0192.webp", "With all our hearts"],
];
const existingGalleryImages = new Set(
  Array.from(filmstrip.querySelectorAll("img")).map((image) => image.src),
);
galleryImages.forEach(([file, alt]) => {
  const src = `assets/img/${file}`;
  if (existingGalleryImages.has(new URL(src, document.baseURI).href)) return;
  const figure = document.createElement("figure");
  figure.innerHTML = `<img src="${src}" alt="${alt}" loading="lazy" />`;
  filmstrip.append(figure);
});
const galleryLightbox = document.querySelector(".gallery-lightbox"),
  galleryViewer = galleryLightbox.querySelector(".gallery-viewer img"),
  galleryCount = galleryLightbox.querySelector(".gallery-count"),
  galleryCaption = galleryLightbox.querySelector(".gallery-caption");
let galleryIndex = 0,
  galleryWasLocked = false;
function galleryFigures() {
  return Array.from(filmstrip.querySelectorAll("figure"));
}
function showGalleryImage(index) {
  const figures = galleryFigures();
  galleryIndex = (index + figures.length) % figures.length;
  const image = figures[galleryIndex].querySelector("img");
  galleryViewer.src = image.currentSrc || image.src;
  galleryViewer.alt = image.alt;
  galleryCount.textContent = `${String(galleryIndex + 1).padStart(2, "0")} / ${String(figures.length).padStart(2, "0")}`;
  galleryCaption.textContent = image.alt;
}
function openGallery(index) {
  galleryWasLocked = body.classList.contains("locked");
  showGalleryImage(index);
  galleryLightbox.hidden = false;
  galleryLightbox.setAttribute("aria-hidden", "false");
  body.classList.add("locked");
  galleryLightbox.querySelector(".gallery-close").focus();
}
function closeGallery() {
  galleryLightbox.hidden = true;
  galleryLightbox.setAttribute("aria-hidden", "true");
  galleryViewer.src = "";
  if (!galleryWasLocked) body.classList.remove("locked");
}
galleryFigures().forEach((figure, index) => {
  figure.tabIndex = 0;
  figure.setAttribute("role", "button");
  figure.setAttribute("aria-label", `Open photo ${index + 1}`);
  figure.addEventListener("click", () => openGallery(index));
  figure.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openGallery(index);
    }
  });
});
galleryLightbox
  .querySelector(".gallery-close")
  .addEventListener("click", closeGallery);
galleryLightbox
  .querySelector(".gallery-prev")
  .addEventListener("click", () => showGalleryImage(galleryIndex - 1));
galleryLightbox
  .querySelector(".gallery-next")
  .addEventListener("click", () => showGalleryImage(galleryIndex + 1));
galleryLightbox.addEventListener("click", (event) => {
  if (event.target === galleryLightbox) closeGallery();
});
addEventListener("keydown", (event) => {
  if (galleryLightbox.hidden) return;
  if (event.key === "Escape") closeGallery();
  if (event.key === "ArrowLeft") showGalleryImage(galleryIndex - 1);
  if (event.key === "ArrowRight") showGalleryImage(galleryIndex + 1);
});
document.querySelectorAll("[data-gallery-direction]").forEach((button) =>
  button.addEventListener("click", () => {
    const direction = Number(button.dataset.galleryDirection);
    filmstrip.scrollBy({
      left: direction * filmstrip.clientWidth * 0.82,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }),
);

// Stagger related content as each composition enters the viewport.
document
  .querySelectorAll(".event-copy,.look,.party-title,.contacts article")
  .forEach((group) => {
    Array.from(group.children).forEach((child, index) => {
      child.style.setProperty("--stagger", `${Math.min(index * 75, 300)}ms`);
      child.classList.add("stagger-item");
    });
  });

// The invitation remains fully usable when the decorative 3D library is unavailable.
const threeLoader = document.createElement("script");
threeLoader.src =
  "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js";
threeLoader.defer = true;
threeLoader.onload = () => {
  initThreeScene();
  initSectionScenes();
};
document.head.appendChild(threeLoader);
function initThreeScene() {
  if (!window.THREE || matchMedia("(prefers-reduced-motion: reduce)").matches)
    return;
  const hero = document.querySelector(".hero"),
    canvas = document.createElement("canvas");
  canvas.className = "three-scene";
  canvas.setAttribute("aria-hidden", "true");
  hero.prepend(canvas);
  const scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(
      42,
      hero.clientWidth / hero.clientHeight,
      0.1,
      100,
    );
  camera.position.z = 8;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(
    Math.min(devicePixelRatio, innerWidth < 760 ? 1.35 : 1.8),
  );
  renderer.setSize(hero.clientWidth, hero.clientHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const group = new THREE.Group();
  scene.add(group);
  const gold = new THREE.MeshBasicMaterial({
    color: 0xc8a76a,
    transparent: true,
    opacity: 0.36,
    wireframe: true,
  });
  const ring = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.8, 0.018, 150, 12, 2, 3),
    gold,
  );
  ring.position.set(innerWidth < 760 ? 1.25 : 2.9, 0.5, -0.6);
  ring.rotation.x = 0.8;
  group.add(ring);
  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(2.55, 0.012, 8, 160),
    new THREE.MeshBasicMaterial({
      color: 0xe5c98d,
      transparent: true,
      opacity: 0.17,
      wireframe: true,
    }),
  );
  halo.position.set(innerWidth < 760 ? -1.2 : -3.2, -1.5, -1.2);
  halo.rotation.set(1.1, 0.4, 0.2);
  group.add(halo);
  const count = innerWidth < 760 ? 420 : 750,
    positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = 2 + Math.random() * 6,
      angle = Math.random() * Math.PI * 2;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
    positions[i * 3 + 2] = Math.sin(angle) * radius - 2;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      color: 0xe6c989,
      size: 0.025,
      transparent: true,
      opacity: 0.62,
      sizeAttenuation: true,
    }),
  );
  group.add(particles);
  const pointer = { x: 0, y: 0 };
  hero.addEventListener(
    "pointermove",
    (event) => {
      pointer.x = (event.clientX / innerWidth - 0.5) * 0.38;
      pointer.y = (event.clientY / innerHeight - 0.5) * 0.25;
    },
    { passive: true },
  );
  let visible = true;
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  }).observe(hero);
  const clock = new THREE.Clock();
  function render() {
    requestAnimationFrame(render);
    if (!visible || document.hidden) return;
    const elapsed = clock.getElapsedTime();
    ring.rotation.y = elapsed * 0.09 + pointer.x;
    ring.rotation.z = elapsed * 0.045;
    halo.rotation.z = -elapsed * 0.035;
    particles.rotation.y = elapsed * 0.012;
    group.rotation.x += (pointer.y - group.rotation.x) * 0.025;
    group.position.y =
      -Math.min(scrollY / Math.max(hero.clientHeight, 1), 1) * 0.8;
    renderer.render(scene, camera);
  }
  render();
  addEventListener(
    "resize",
    () => {
      camera.aspect = hero.clientWidth / hero.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(
        Math.min(devicePixelRatio, innerWidth < 760 ? 1.35 : 1.8),
      );
      renderer.setSize(hero.clientWidth, hero.clientHeight, false);
    },
    { passive: true },
  );
}

function initSectionScenes() {
  if (!window.THREE || matchMedia("(prefers-reduced-motion: reduce)").matches)
    return;
  const configurations = [
    { selector: ".save-date", color: 0xe4c98e, shape: "rings", count: 120 },
    { selector: ".gift-note", color: 0xb89558, shape: "petals", count: 150 },
    { selector: ".rsvp", color: 0xdabf83, shape: "rings", count: 100 },
  ];
  const scenes = [];
  configurations.forEach((config, index) => {
    const section = document.querySelector(config.selector);
    if (!section) return;
    const canvas = document.createElement("canvas");
    canvas.className = `three-accent three-accent-${index + 1}`;
    canvas.setAttribute("aria-hidden", "true");
    section.prepend(canvas);
    const scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(
        45,
        section.clientWidth / section.clientHeight,
        0.1,
        50,
      );
    camera.position.z = 7;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(
      Math.min(devicePixelRatio, innerWidth < 760 ? 1 : 1.4),
    );
    renderer.setSize(section.clientWidth, section.clientHeight, false);
    const group = new THREE.Group();
    scene.add(group);
    const positions = new Float32Array(config.count * 3);
    for (let i = 0; i < config.count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    group.add(
      new THREE.Points(
        dustGeometry,
        new THREE.PointsMaterial({
          color: config.color,
          size: config.shape === "petals" ? 0.045 : 0.026,
          transparent: true,
          opacity: config.shape === "petals" ? 0.34 : 0.48,
        }),
      ),
    );
    const material = new THREE.MeshBasicMaterial({
      color: config.color,
      transparent: true,
      opacity: config.shape === "petals" ? 0.16 : 0.2,
      wireframe: true,
    });
    if (config.shape === "rings") {
      for (let i = 0; i < 3; i++) {
        const mesh = new THREE.Mesh(
          new THREE.TorusGeometry(1.25 + i * 0.55, 0.012, 6, 110),
          material,
        );
        mesh.position.set(index ? 2.3 : -2.4, (i - 1) * 0.7, -1 - i * 0.3);
        mesh.rotation.set(0.8 + i * 0.25, 0.35, i * 0.45);
        group.add(mesh);
      }
    } else {
      for (let i = 0; i < 8; i++) {
        const mesh = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.12 + Math.random() * 0.14, 0),
          material,
        );
        mesh.position.set(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 7,
          (Math.random() - 0.5) * 3,
        );
        mesh.rotation.set(Math.random() * 3, Math.random() * 3, 0);
        group.add(mesh);
      }
    }
    const data = {
      section,
      renderer,
      scene,
      camera,
      group,
      visible: false,
      index,
    };
    scenes.push(data);
    new IntersectionObserver(
      ([entry]) => {
        data.visible = entry.isIntersecting;
      },
      { rootMargin: "15% 0px" },
    ).observe(section);
  });
  const clock = new THREE.Clock();
  function animateAccents() {
    requestAnimationFrame(animateAccents);
    if (document.hidden) return;
    const elapsed = clock.getElapsedTime();
    scenes.forEach((data) => {
      if (!data.visible) return;
      data.group.rotation.y = elapsed * (data.index % 2 ? -0.035 : 0.035);
      data.group.rotation.z = Math.sin(elapsed * 0.18 + data.index) * 0.04;
      data.group.position.y = Math.sin(elapsed * 0.35 + data.index) * 0.12;
      data.renderer.render(data.scene, data.camera);
    });
  }
  animateAccents();
  addEventListener(
    "resize",
    () =>
      scenes.forEach((data) => {
        data.camera.aspect =
          data.section.clientWidth / data.section.clientHeight;
        data.camera.updateProjectionMatrix();
        data.renderer.setPixelRatio(
          Math.min(devicePixelRatio, innerWidth < 760 ? 1 : 1.4),
        );
        data.renderer.setSize(
          data.section.clientWidth,
          data.section.clientHeight,
          false,
        );
      }),
    { passive: true },
  );
}
