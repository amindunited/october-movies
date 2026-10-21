(() => {
  const movies = window.MOVIES;
  const N = movies.length;
  const STEP = 360 / N;
  const AUTO_SPEED = 8; // degrees per second
  const DRAG_FACTOR = 0.25; // degrees per pixel dragged

  const stage = document.querySelector(".stage");
  const ring = document.getElementById("ring");
  const toggleBtn = document.getElementById("toggle");
  const modal = document.getElementById("modal");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const state = {
    angle: 0,
    radius: 500,
    target: null, // angle we're easing towards (arrow buttons / focus)
    velocity: 0, // inertia after a drag, degrees per second
    userPaused: reduceMotion,
    hovering: false,
    drag: null,
    suppressClick: false,
    frontIndex: -1,
  };

  // ---------- Posters (fetched from Wikipedia at runtime) ----------
  const posterCache = new Map();

  function fetchPoster(movie) {
    if (!posterCache.has(movie.wiki)) {
      const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(movie.wiki)}`;
      posterCache.set(
        movie.wiki,
        fetch(url)
          .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
          .then((data) => ({
            thumb: data.thumbnail?.source ?? data.originalimage?.source,
            full: data.originalimage?.source ?? data.thumbnail?.source,
            page: data.content_urls?.desktop?.page,
          }))
          .catch(() => ({})),
      );
    }
    return posterCache.get(movie.wiki);
  }

  function wikiUrl(movie) {
    return `https://en.wikipedia.org/wiki/${encodeURIComponent(movie.wiki)}`;
  }

  function showImage(container, img, src, movie) {
    if (!src) {
      container.classList.add("no-image");
      return;
    }
    img.onload = () => img.classList.add("loaded");
    img.onerror = () => container.classList.add("no-image");
    img.alt = `${movie.title} (${movie.year}) poster`;
    img.src = src;
  }

  function fallbackMarkup(movie) {
    return `${escapeHtml(movie.title)}<small>${movie.year}</small>`;
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  }

  // ---------- Build the cases ----------
  const cases = movies.map((movie, i) => {
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.style.transform = `rotateY(${i * STEP}deg) translateZ(var(--radius))`;

    const btn = document.createElement("button");
    btn.className = "case";
    btn.type = "button";
    btn.setAttribute("aria-label", `${movie.title} (${movie.year}) — open details`);
    btn.innerHTML = `
      <div class="face cover">
        <div class="sleeve">
          <img alt="" draggable="false" />
          <div class="poster-fallback">${fallbackMarkup(movie)}</div>
        </div>
      </div>
      <div class="face spine"><span>${escapeHtml(movie.title)}</span></div>
      <div class="face edge"></div>
      <div class="face back">${escapeHtml(movie.title)}</div>
    `;

    btn.addEventListener("click", () => {
      if (state.suppressClick) return;
      openModal(i);
    });
    // keyboard tabbing brings the focused case round to the front
    btn.addEventListener("focus", () => {
      if (btn.matches(":focus-visible")) goTo(i);
    });

    slot.appendChild(btn);
    ring.appendChild(slot);

    const sleeve = btn.querySelector(".sleeve");
    fetchPoster(movie).then(({ thumb }) => showImage(sleeve, sleeve.querySelector("img"), thumb, movie));

    return btn;
  });

  // ---------- Layout ----------
  function layout() {
    const w = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--case-w")) || 180;
    state.radius = Math.round((w / 2 / Math.tan(Math.PI / N)) * 1.15);
    ring.style.setProperty("--radius", `${state.radius}px`);
    const extent = 2 * state.radius + w * 1.2;
    state.scale = Math.min(1, (stage.clientWidth - 16) / extent);
  }

  // ---------- Animation loop ----------
  function shortestDelta(from, to) {
    return ((((to - from) % 360) + 540) % 360) - 180;
  }

  function goTo(index) {
    state.velocity = 0;
    state.target = state.angle + shortestDelta(state.angle, -index * STEP);
  }

  function step(direction) {
    const base = state.target ?? state.angle;
    state.velocity = 0;
    state.target = (Math.round(base / STEP) - direction) * STEP;
  }

  function isAutoSpinning() {
    return !state.userPaused && !state.hovering && !state.drag && !modal.open && state.target === null && state.velocity === 0;
  }

  let last = performance.now();
  function tick(now) {
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;

    if (state.drag) {
      // angle is set directly by pointer moves
    } else if (state.target !== null) {
      const diff = state.target - state.angle;
      state.angle += diff * Math.min(1, dt * 8);
      if (Math.abs(diff) < 0.05) {
        state.angle = state.target;
        state.target = null;
      }
    } else if (state.velocity !== 0) {
      state.angle += state.velocity * dt;
      state.velocity *= Math.pow(0.04, dt); // friction
      if (Math.abs(state.velocity) < 5) {
        state.velocity = 0;
        state.target = Math.round(state.angle / STEP) * STEP; // settle on a case
      }
    } else if (isAutoSpinning()) {
      state.angle -= AUTO_SPEED * dt;
    }

    ring.style.transform = `scale(${state.scale || 1}) translateZ(${-state.radius}px) rotateY(${state.angle}deg)`;

    const front = (((Math.round(-state.angle / STEP) % N) + N) % N);
    if (front !== state.frontIndex) {
      cases[state.frontIndex]?.classList.remove("front");
      cases[front].classList.add("front");
      state.frontIndex = front;
    }

    requestAnimationFrame(tick);
  }

  // ---------- Dragging ----------
  stage.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    state.drag = { x: e.clientX, startAngle: state.angle, lastX: e.clientX, lastT: performance.now(), v: 0 };
    state.target = null;
    state.velocity = 0;
    state.suppressClick = false;
  });

  window.addEventListener("pointermove", (e) => {
    const d = state.drag;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 5 && !state.suppressClick) {
      state.suppressClick = true;
      stage.classList.add("dragging");
    }
    state.angle = d.startAngle + dx * DRAG_FACTOR;
    const now = performance.now();
    const dtMove = (now - d.lastT) / 1000;
    if (dtMove > 0) d.v = ((e.clientX - d.lastX) * DRAG_FACTOR) / dtMove;
    d.lastX = e.clientX;
    d.lastT = now;
  });

  window.addEventListener("pointerup", () => {
    const d = state.drag;
    if (!d) return;
    state.drag = null;
    stage.classList.remove("dragging");
    if (state.suppressClick) {
      const recent = performance.now() - d.lastT < 80;
      state.velocity = recent ? Math.max(-400, Math.min(400, d.v)) : 0;
      if (state.velocity === 0) state.target = Math.round(state.angle / STEP) * STEP;
      // let the click event (fired right after pointerup) see suppressClick, then reset
      setTimeout(() => (state.suppressClick = false), 0);
    }
  });

  stage.addEventListener("pointerenter", (e) => {
    if (e.pointerType === "mouse") state.hovering = true;
  });
  stage.addEventListener("pointerleave", () => (state.hovering = false));

  // ---------- Controls ----------
  document.getElementById("prev").addEventListener("click", () => step(-1));
  document.getElementById("next").addEventListener("click", () => step(1));

  function renderToggle() {
    toggleBtn.innerHTML = state.userPaused ? "&#9654;&#xFE0E;" : "&#10074;&#10074;";
    toggleBtn.setAttribute("aria-label", state.userPaused ? "Resume rotation" : "Pause rotation");
  }
  toggleBtn.addEventListener("click", () => {
    state.userPaused = !state.userPaused;
    renderToggle();
  });
  renderToggle();

  document.addEventListener("keydown", (e) => {
    if (modal.open) return;
    if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
    else return;
    e.preventDefault();
  });

  // ---------- Modal ----------
  const RATING_LABELS = { gore: "Gore", jumpScares: "Jump scares", violence: "Violence" };

  function openModal(i) {
    const movie = movies[i];
    goTo(i);

    document.getElementById("modal-title").textContent = movie.title;
    document.getElementById("modal-year").textContent = movie.year;
    document.getElementById("modal-desc").textContent = movie.description;
    document.getElementById("modal-why").textContent = movie.whyClassic;

    const wiki = document.getElementById("modal-wiki");
    wiki.href = wikiUrl(movie);

    const poster = document.querySelector(".modal-poster");
    const img = document.getElementById("modal-img");
    poster.classList.remove("no-image");
    img.removeAttribute("src");
    document.getElementById("modal-fallback").innerHTML = fallbackMarkup(movie);
    fetchPoster(movie).then(({ full, page }) => {
      if (page) wiki.href = page;
      if (document.getElementById("modal-title").textContent === movie.title) {
        showImage(poster, img, full, movie);
      }
    });

    const ratings = document.getElementById("modal-ratings");
    ratings.innerHTML = Object.entries(RATING_LABELS)
      .map(([key, label]) => {
        const value = movie.ratings[key];
        return `
          <div class="rating">
            <span>${label}</span>
            <div class="bar" role="meter" aria-label="${label}" aria-valuemin="0" aria-valuemax="10" aria-valuenow="${value}">
              <div class="bar-fill" data-value="${value}"></div>
            </div>
            <span class="rating-value">${value}/10</span>
          </div>`;
      })
      .join("");

    modal.showModal();
    // animate the bars filling up
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        ratings.querySelectorAll(".bar-fill").forEach((el) => (el.style.width = `${el.dataset.value * 10}%`)),
      ),
    );
  }

  document.getElementById("modal-close").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close(); // backdrop click
  });

  // ---------- Go ----------
  layout();
  window.addEventListener("resize", layout);
  requestAnimationFrame(tick);
})();
