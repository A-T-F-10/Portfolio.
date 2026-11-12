/* ============================================
   ATIF ADEM — PORTFOLIO
   Vanilla JS: projects bento + case view, nav,
   pointer effects, reveals fallback, contact form
   ============================================ */
(function () {
  "use strict";

  // =========================
  // Projects Data (display order: the bento packs without gaps in this order)
  // size: xl = 2x2, wide = 2x1, tall = 1x2, one = 1x1
  // dark: the logo image is a black square, so its tile is black instead of white
  // =========================
  const projects = [
    {
      id: "p1", name: "Imtithal", ar: "امتثال", sub: "Hajj compliance monitoring", cat: "web", size: "xl", dark: true,
      img: "images/imtithal.png", link: "https://www.imtithal47.com/", host: "imtithal47.com",
      desc: "Hajj compliance monitoring system for the Ministry of Hajj and Umrah. Built end-to-end with smart digital monitoring, automated reporting, and real-time dashboards.",
      tags: ["Laravel", "Flutter", "REST API", "Cloud", "PostgreSQL"],
      stats: [{ v: "3.7M+", l: "data entries processed" }, { v: "300K+", l: "evaluations managed" }, { v: "63K+", l: "registered users" }],
    },
    {
      id: "p2", name: "Maham Expo", ar: "", sub: "Expo management ecosystem", cat: "web", size: "wide", dark: true,
      img: "images/maham-expo.jpeg", link: "https://mahamexpo.sa/", host: "mahamexpo.sa",
      desc: "Integrated expo ecosystem with investor, merchant and sponsor portals, an AI recommendation engine, Digital Twin visualization, IoT crowd management and ZATCA-compliant automation. Includes a Flutter mobile app with a CI/CD pipeline.",
      tags: ["React", "Node.js", "Flutter", "AI", "Cloud", "CI/CD"],
      stats: [{ v: "6", l: "smart platforms" }, { v: "C4I", l: "command center" }, { v: "IoT", l: "crowd management" }],
    },
    {
      id: "p9", name: "Zimam", ar: "زمام القوة", sub: "Enterprise operations platform", cat: "web", size: "wide", dark: true,
      img: "images/zimam.png", link: "https://zimam.sa/", host: "zimam.sa",
      desc: "Enterprise operations company platform for infrastructure development, crowd management, facility operations, and digital transformation. Serves Vision 2030 projects and government entities.",
      tags: ["Laravel", "PHP", "MySQL", "Enterprise"], stats: [],
    },
    {
      id: "p3", name: "المركز العام للنقل", ar: "", sub: "Hajj transport compliance", cat: "app", size: "tall",
      img: "images/2.png", link: "", host: "",
      desc: "Transportation compliance monitoring system for buses and gathering points during Hajj. Tracks fleet operations, station compliance, route management, and real-time GPS monitoring for pilgrimage transportation services.",
      tags: ["Flutter", "Firebase", "Maps API", "Real-time"], stats: [],
    },
    {
      id: "p11", name: "Nahj", ar: "نهج المعرفة", sub: "E-learning platform", cat: "web", size: "wide",
      img: "images/nahj.png", link: "https://nahj.com.sa/", host: "nahj.com.sa",
      desc: "E-learning platform offering qualifying and development courses with interactive learning methods, expert-designed programs, and progress tracking.",
      tags: ["Laravel", "PHP", "MySQL", "LMS"], stats: [],
    },
    {
      id: "p6", name: "ZHAB", ar: "", sub: "RFID luggage tracking", cat: "app", size: "tall",
      img: "images/zhabs.png", link: "", host: "",
      desc: "RFID-based application for scanning and tracking pilgrims’ luggage. Real-time scanning, instant data retrieval, and a user-friendly interface designed for non-technical staff. Handles thousands of scans daily.",
      tags: ["Flutter", "RFID", "Dart", "Hardware Integration"], stats: [],
    },
    {
      id: "p7", name: "Shaheen", ar: "شاهين", sub: "Real-estate investment", cat: "app", size: "one",
      img: "images/shaheen.png", link: "", host: "",
      desc: "Real estate investment platform helping organizations manage shareholder contributions in property projects. Features transparent tracking, dividend reporting, and investor dashboards.",
      tags: ["Flutter", "Firebase", "REST API", "Financial"], stats: [],
    },
    {
      id: "p5", name: "DBsaloni", ar: "", sub: "Salon booking app", cat: "app", size: "one",
      img: "images/DBsalonis.png", link: "", host: "",
      desc: "Salon management platform for booking appointments, discovering salons, and managing profiles. Cross-platform Flutter app with real-time availability, push notifications, and integrated payment.",
      tags: ["Flutter", "Dart", "Firebase", "Push Notifications"], stats: [],
    },
    {
      id: "p8", name: "Let’s Go", ar: "", sub: "Accessibility discovery", cat: "app", size: "one",
      img: "images/letgo.png", link: "", host: "",
      desc: "Accessibility app for people with special needs — helps discover services, accessible places, and available resources. Built with inclusive UX principles and location-based discovery.",
      tags: ["Flutter", "REST API", "GetX", "Accessibility"], stats: [],
    },
    {
      id: "p4", name: "Sahemtrv", ar: "سهم", sub: "Travel & tourism booking", cat: "web", size: "one",
      img: "images/3.png", link: "", host: "",
      desc: "Travel and tourism booking platform with trip searching, accommodation booking, and package deals. Features secure payment processing, optimized search algorithms, and a seamless booking flow.",
      tags: ["Laravel", "PHP", "MySQL", "REST API"], stats: [],
    },
    {
      id: "p10", name: "Moasherat", ar: "", sub: "Consulting services platform", cat: "web", size: "one",
      img: "images/moasherat.png", link: "https://moasherat.co/", host: "moasherat.co",
      desc: "Consulting services platform for government, private, and non-profit sectors. Expert profiles, case studies, and client-consultant communication tools.",
      tags: ["Laravel", "PHP", "MySQL"], stats: [],
    },
    {
      id: "p12", name: "Digital Guide", ar: "", sub: "Charity directory app", cat: "app", size: "one",
      img: "images/Untitled design (6).png", link: "", host: "",
      desc: "App for searching and connecting with charitable organizations. Browse profiles, services, and contact details with smooth cross-platform navigation.",
      tags: ["Flutter", "REST API", "Dart"], stats: [],
    },
  ];

  // =========================
  // Helpers
  // =========================
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const html = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover)").matches;
  const useIO = html.classList.contains("io") && "IntersectionObserver" in window;
  const pad = (n) => String(n).padStart(2, "0");
  const catLabel = (c) => (c === "app" ? "Mobile app" : "Web platform");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const svg = (paths, size = 16) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  const ICON_NE = svg('<path d="M7 7h10v10"/><path d="M7 17 17 7"/>');
  const ICON_RIGHT = svg('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>', 18);
  const LIVE = '<span class="blive"><span class="dot pulse"></span>Live</span>';

  // Sets --mx/--my (cursor position inside el) for the spotlight and glow effects.
  function trackPointer(el, e) {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", Math.round(e.clientX - r.left) + "px");
    el.style.setProperty("--my", Math.round(e.clientY - r.top) + "px");
    return r;
  }

  // =========================
  // Clock (Mecca time)
  // =========================
  function initClock() {
    const els = $$("[data-clock]");
    if (!els.length) return;
    let fmt;
    try {
      fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "Asia/Riyadh" });
    } catch (e) {
      return;
    }
    const tick = () => {
      const t = fmt.format(new Date());
      els.forEach((el) => { el.textContent = t; });
    };
    tick();
    setInterval(tick, 1000);
  }

  // =========================
  // Navigation
  // =========================
  function initNav() {
    const btn = $("#menu-btn");
    const menu = $("#mmenu");
    if (btn && menu) {
      const setOpen = (open) => {
        btn.setAttribute("aria-expanded", String(open));
        btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        menu.hidden = !open;
        document.body.classList.toggle("menu-open", open);
      };
      btn.addEventListener("click", () => setOpen(menu.hidden));
      $$("a", menu).forEach((a) => a.addEventListener("click", () => setOpen(false)));
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !menu.hidden) {
          setOpen(false);
          btn.focus();
        }
      });
      window.matchMedia("(min-width: 961px)").addEventListener("change", (m) => { if (m.matches) setOpen(false); });
    }

    // Highlight the nav link of the section in the middle of the viewport
    const links = $$(".nl");
    if (!("IntersectionObserver" in window) || !links.length) return;
    const byId = new Map(links.map((l) => [l.getAttribute("href").slice(1), l]));
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) links.forEach((l) => l.classList.toggle("active", l === byId.get(en.target.id)));
      }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    byId.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }

  // =========================
  // Pointer effects (hero spotlight, glow cards, portrait tilt)
  // =========================
  function initPointerFX() {
    if (!canHover) return;
    const hero = $(".hero");
    if (hero) hero.addEventListener("pointermove", (e) => trackPointer(hero, e));
    $$(".glow").forEach((el) => el.addEventListener("pointermove", (e) => trackPointer(el, e)));

    const tilt = $("#tilt");
    if (tilt && !reduceMotion) {
      tilt.addEventListener("pointermove", (e) => {
        const r = tilt.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.setProperty("--rx", (x * 12).toFixed(2) + "deg");
        tilt.style.setProperty("--ry", (-y * 12).toFixed(2) + "deg");
      });
      tilt.addEventListener("pointerleave", () => {
        tilt.style.setProperty("--rx", "0deg");
        tilt.style.setProperty("--ry", "0deg");
      });
    }
  }

  // =========================
  // Scroll reveals — fallback for browsers without scroll-driven animations
  // =========================
  let revealer = null;
  function initReveals() {
    if (!useIO) return;
    revealer = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          revealer.unobserve(en.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    $$(".sr, .sh, .tier").forEach((el) => revealer.observe(el));
  }

  // =========================
  // Projects: bento grid
  // =========================
  let filter = "all";
  let gridFlip = false;
  let firstRender = true;
  const visible = () => (filter === "all" ? projects : projects.filter((p) => p.cat === filter));
  const numberOf = (p) => pad(projects.indexOf(p) + 1);

  function cardHTML(p, i) {
    const stats = p.size === "xl" && p.stats.length
      ? `<span class="bstats">${p.stats.map((s) => `<span class="bstat"><b>${esc(s.v)}</b><span>${esc(s.l)}</span></span>`).join("")}</span>`
      : "";
    return `
      <div class="bw s-${p.size}" style="animation-delay:${(i * 0.05).toFixed(2)}s">
        <button type="button" class="bcard glow" style="--c:${i % 4}" data-id="${p.id}" aria-label="Open ${esc(p.name)} case study">
          <span class="bplate${p.dark ? " dark" : ""}">
            <img src="${encodeURI(p.img)}" alt="" loading="lazy" decoding="async">
            <span class="bnum">${numberOf(p)}</span>
            ${p.link ? LIVE : ""}
            <span class="bcat">${catLabel(p.cat)}</span>
          </span>
          <span class="bmeta">
            <span class="btop">
              <span class="btxt">
                <span class="bname">${esc(p.name)}${p.ar ? `<span class="bar" lang="ar" dir="rtl">${esc(p.ar)}</span>` : ""}</span>
                <span class="bsub">${esc(p.sub)}</span>
              </span>
              <span class="barr">${ICON_NE}</span>
            </span>
            <span class="bdesc">${esc(p.desc)}</span>
            <span class="btags">${p.tags.slice(0, 4).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</span>
            ${stats}
          </span>
          <span class="bclip" aria-hidden="true"><span class="bview">View</span></span>
        </button>
      </div>`;
  }

  function renderGrid() {
    const grid = $("#bento");
    if (!grid) return;
    const list = visible();
    grid.classList.toggle("ga", gridFlip);
    grid.classList.toggle("gb", !gridFlip);
    grid.innerHTML = list.map(cardHTML).join("");
    const count = $("#work-count");
    if (count) count.textContent = pad(list.length);

    $$(".bcard", grid).forEach((card) => {
      card.addEventListener("click", () => openCase(card.dataset.id, card));
      if (canHover) {
        card.addEventListener("pointermove", (e) => {
          const r = trackPointer(card, e);
          if (reduceMotion) return;
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          card.style.setProperty("--rx", (x * 8).toFixed(2) + "deg");
          card.style.setProperty("--ry", (-y * 8).toFixed(2) + "deg");
        });
        card.addEventListener("pointerleave", () => {
          card.style.setProperty("--rx", "0deg");
          card.style.setProperty("--ry", "0deg");
        });
      }
      // On first paint cards reveal on scroll; after a filter change they are already in view.
      if (useIO) {
        if (firstRender && revealer) revealer.observe(card);
        else card.classList.add("in");
      }
    });
    firstRender = false;
  }

  function initFilters() {
    const seg = $("#seg");
    if (!seg) return;
    const btns = $$(".seg-btn", seg);
    btns.forEach((b, i) => {
      const n = b.querySelector(".n");
      const f = b.dataset.filter;
      if (n) n.textContent = pad(f === "all" ? projects.length : projects.filter((p) => p.cat === f).length);
      b.addEventListener("click", () => {
        if (f === filter) return;
        filter = f;
        gridFlip = !gridFlip;
        seg.style.setProperty("--seg-i", i);
        btns.forEach((x) => {
          x.classList.toggle("on", x === b);
          x.setAttribute("aria-pressed", String(x === b));
        });
        renderGrid();
      });
    });
  }

  // =========================
  // Projects: case view
  // =========================
  const ov = $("#case");
  let caseId = null;
  let caseFlip = false;
  let lastTrigger = null;
  let closeTimer = 0;

  function caseHTML(p) {
    const stats = p.stats.length
      ? `<div class="case-stats">${p.stats.map((s) => `<div class="case-stat"><b>${esc(s.v)}</b><span>${esc(s.l)}</span></div>`).join("")}</div>`
      : "";
    const visit = p.link
      ? `<a href="${esc(p.link)}" target="_blank" rel="noopener" class="btn btn-accent"><span class="roll"><span>Visit ${esc(p.host)}</span><span aria-hidden="true">Visit ${esc(p.host)}</span></span><span class="arr arr-ne">${svg('<path d="M7 7h10v10"/><path d="M7 17 17 7"/>', 18)}</span></a>`
      : "";
    return `
      <div class="ov-plate${p.dark ? " dark" : ""}">
        <img src="${encodeURI(p.img)}" alt="${esc(p.name)} logo">
        ${p.link ? LIVE : ""}
      </div>
      <div>
        <p class="case-sub">${esc(p.sub)}</p>
        <h2 class="case-title" id="case-title">${esc(p.name)}</h2>
        ${p.ar ? `<p class="case-ar" lang="ar" dir="rtl">${esc(p.ar)}</p>` : ""}
        <p class="case-desc">${esc(p.desc)}</p>
        ${stats}
        <div class="case-tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        <div class="case-ctas">
          ${visit}
          <a href="#contact" class="btn btn-line" data-close data-keep-scroll><span class="roll"><span>Ask me about this build</span><span aria-hidden="true">Ask me about this build</span></span><span class="arr">${ICON_RIGHT}</span></a>
        </div>
      </div>`;
  }

  function fillCase(id) {
    const p = projects.find((x) => x.id === id);
    if (!p) return;
    caseId = id;
    const list = visible();
    const at = Math.max(0, list.indexOf(p));
    const next = list[(at + 1) % list.length];

    $("#case-num").textContent = numberOf(p);
    $("#case-total").textContent = pad(projects.length);
    $("#case-cat").textContent = catLabel(p.cat);
    $("#case-next-name").textContent = next.name;

    const body = $("#case-body");
    body.innerHTML = caseHTML(p);
    caseFlip = !caseFlip; // alternating keyframe names restart the swap animation
    body.classList.toggle("swap-a", caseFlip);
    body.classList.toggle("swap-b", !caseFlip);
    $("#case-panel").scrollTop = 0;
  }

  function openCase(id, trigger) {
    if (!ov) return;
    clearTimeout(closeTimer);
    lastTrigger = trigger || document.activeElement;
    fillCase(id);
    ov.classList.remove("closing");
    ov.hidden = false;
    document.body.classList.add("case-open");
    requestAnimationFrame(() => $("#case-close").focus({ preventScroll: true }));
  }

  function closeCase(restoreFocus = true) {
    if (!ov || ov.hidden || ov.classList.contains("closing")) return;
    ov.classList.add("closing");
    closeTimer = setTimeout(() => {
      ov.hidden = true;
      ov.classList.remove("closing");
      document.body.classList.remove("case-open");
      if (restoreFocus && lastTrigger && lastTrigger.isConnected) lastTrigger.focus({ preventScroll: true });
    }, reduceMotion ? 0 : 440);
  }

  function stepCase(dir) {
    const list = visible();
    const at = Math.max(0, list.findIndex((p) => p.id === caseId));
    fillCase(list[(at + dir + list.length) % list.length].id);
  }

  function initCase() {
    if (!ov) return;
    $("#case-close").addEventListener("click", () => closeCase());
    $("#case-prev").addEventListener("click", () => stepCase(-1));
    $("#case-next").addEventListener("click", () => stepCase(1));
    $("#case-next-big").addEventListener("click", () => stepCase(1));
    ov.addEventListener("click", (e) => {
      const closer = e.target.closest("[data-close]");
      if (closer) closeCase(!closer.hasAttribute("data-keep-scroll"));
    });
    ov.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeCase();
      } else if (e.key === "ArrowRight") {
        stepCase(1);
      } else if (e.key === "ArrowLeft") {
        stepCase(-1);
      } else if (e.key === "Tab") {
        // keep focus inside the dialog
        const f = $$("a[href], button:not([disabled])", ov).filter((el) => el.offsetParent !== null);
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  // =========================
  // Contact Form
  // =========================
  function initContactForm() {
    const form = $("#contact-form");
    if (!form) return;
    const btn = $("#cf-submit");
    const status = $("#cf-status");
    const original = btn.innerHTML;

    const setStatus = (text, isError) => {
      status.textContent = text;
      status.classList.toggle("err", !!isError);
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const fields = $$(".field", form);
      let firstInvalid = null;
      fields.forEach((f) => {
        const bad = !f.checkValidity();
        f.setAttribute("aria-invalid", String(bad));
        if (bad && !firstInvalid) firstInvalid = f;
      });
      if (firstInvalid) {
        setStatus("Please fill in every field with a valid email.", true);
        firstInvalid.focus();
        return;
      }

      const data = Object.fromEntries(new FormData(form));
      btn.disabled = true;
      btn.textContent = "Sending…";
      setStatus("");

      try {
        const res = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("HTTP " + res.status);
        btn.classList.add("is-sent");
        btn.textContent = "Message sent — thank you";
        setStatus("Thanks — your message is on its way.");
        form.reset();
      } catch (err) {
        const mailto = `mailto:a.addam710@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)}`;
        window.location.href = mailto;
        btn.textContent = "Opening your email app…";
        setStatus("The site couldn't send it directly, so your email app is opening with the message filled in.");
      }

      setTimeout(() => {
        btn.innerHTML = original;
        btn.classList.remove("is-sent");
        btn.disabled = false;
      }, 4000);
    });

    form.addEventListener("input", (e) => {
      if (e.target.matches(".field") && e.target.checkValidity()) e.target.removeAttribute("aria-invalid");
    });
  }

  // =========================
  // Init
  // =========================
  function init() {
    initClock();
    initNav();
    initReveals();
    initPointerFX();
    renderGrid();
    initFilters();
    initCase();
    initContactForm();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
