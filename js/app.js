/* ============================================
   ATEF ADEM — PORTFOLIO
   Clean, modern JS — no bloat
   ============================================ */
(function () {
  "use strict";

  // =========================
  // Projects Data
  // =========================
  const projects = [
    {
      id: "p1",
      title: "Imtithal (امتثال)",
      description: "Hajj compliance monitoring system for the Ministry of Hajj and Umrah. Processes 3.7M+ data entries, manages 300K+ evaluations, and serves 63K+ registered users. Built end-to-end with smart digital monitoring, automated reporting, and real-time dashboards.",
      image: "images/imtithal.png",
      category: "web",
      tags: ["Laravel", "Flutter", "REST API", "Cloud", "PostgreSQL"],
      link: "https://www.imtithal47.com/",
    },
    {
      id: "p2",
      title: "Maham Expo",
      description: "Integrated expo management ecosystem with 6 smart platforms (investor, merchant, sponsor portals), AI recommendation engine, Digital Twin visualization, C4I command center, IoT crowd management, and ZATCA-compliant automation. Includes Flutter mobile app with CI/CD pipeline.",
      image: "images/maham-expo.jpeg",
      category: "web",
      tags: ["React", "Node.js", "Flutter", "AI", "Cloud", "CI/CD"],
      link: "https://mahamexpo.sa/",
    },
    {
      id: "p3",
      title: "المركز العام للنقل",
      description: "Transportation compliance monitoring system for buses and gathering points during Hajj. Tracks fleet operations, station compliance, route management, and real-time GPS monitoring for pilgrimage transportation services.",
      image: "images/2.png",
      category: "app",
      tags: ["Flutter", "Firebase", "Maps API", "Real-time"],
    },
    {
      id: "p4",
      title: "Sahemtrv (سهم)",
      description: "Travel and tourism booking platform with trip searching, accommodation booking, and package deals. Features secure payment processing, optimized search algorithms, and seamless booking flow.",
      image: "images/3.png",
      category: "web",
      tags: ["Laravel", "PHP", "MySQL", "REST API"],
    },
    {
      id: "p5",
      title: "DBsaloni",
      description: "Salon management platform for booking appointments, discovering salons, and managing profiles. Cross-platform Flutter app with real-time availability, push notifications, and integrated payment.",
      image: "images/DBsalonis.png",
      category: "app",
      tags: ["Flutter", "Dart", "Firebase", "Push Notifications"],
    },
    {
      id: "p6",
      title: "ZHAB",
      description: "RFID-based application for scanning and tracking pilgrims' luggage. Real-time scanning, instant data retrieval, and user-friendly interface designed for non-technical staff. Handles thousands of scans daily.",
      image: "images/zhabs.png",
      category: "app",
      tags: ["Flutter", "RFID", "Dart", "Hardware Integration"],
    },
    {
      id: "p7",
      title: "Shaheen",
      description: "Real estate investment platform helping organizations manage shareholder contributions in property projects. Features transparent tracking, dividend reporting, and investor dashboards.",
      image: "images/shaheen.png",
      category: "app",
      tags: ["Flutter", "Firebase", "REST API", "Financial"],
    },
    {
      id: "p8",
      title: "Let's Go",
      description: "Accessibility app for people with special needs — helps discover services, accessible places, and available resources. Built with inclusive UX principles and location-based discovery.",
      image: "images/letgo.png",
      category: "app",
      tags: ["Flutter", "REST API", "GetX", "Accessibility"],
    },
    {
      id: "p9",
      title: "Zimam (زمام القوة)",
      description: "Enterprise operations company platform for infrastructure development, crowd management, facility operations, and digital transformation. Serves Vision 2030 projects and government entities.",
      image: "images/zimam.png",
      category: "web",
      tags: ["Laravel", "PHP", "MySQL", "Enterprise"],
      link: "https://zimam.sa/",
    },
    {
      id: "p10",
      title: "Moasherat",
      description: "Consulting services platform for government, private, and non-profit sectors. Expert profiles, case studies, and client-consultant communication tools.",
      image: "images/moasherat.png",
      category: "web",
      tags: ["Laravel", "PHP", "MySQL"],
      link: "https://moasherat.co/",
    },
    {
      id: "p11",
      title: "Nahj (نهج المعرفة)",
      description: "E-learning platform offering qualifying and development courses with interactive learning methods, expert-designed programs, and progress tracking.",
      image: "images/nahj.png",
      category: "web",
      tags: ["Laravel", "PHP", "MySQL", "LMS"],
      link: "https://nahj.com.sa/",
    },
    {
      id: "p12",
      title: "Digital Guide",
      description: "App for searching and connecting with charitable organizations. Browse profiles, services, and contact details with smooth cross-platform navigation.",
      image: "images/Untitled design (6).png",
      category: "app",
      tags: ["Flutter", "REST API", "Dart"],
    },
  ];

  // =========================
  // Navigation
  // =========================
  function initNavigation() {
    const navbar = document.getElementById("navbar");
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    });

    if (navToggle) {
      navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
      });
    }

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    // Active link on scroll
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      navLinks.forEach((l) => {
        l.classList.toggle("active", l.getAttribute("href") === `#${current}`);
      });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute("href"));
        if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  // =========================
  // Back to Top
  // =========================
  function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;
    window.addEventListener("scroll", () => {
      btn.classList.toggle("visible", window.scrollY > 500);
    });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // =========================
  // Scroll Animations
  // =========================
  function initScrollAnimations() {
    const els = document.querySelectorAll(".animate-on-scroll, .section-header, .about-content, .about-sidebar, .skill-tier, .building-card, .contact-info, .contact-form-wrapper");
    els.forEach((el) => el.classList.add("animate-on-scroll"));

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("animated"); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
  }

  // =========================
  // Counters
  // =========================
  function initCounters() {
    const counters = document.querySelectorAll(".metric-number");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
            entry.target.classList.add("counted");
            const target = parseInt(entry.target.dataset.count);
            let current = 0;
            const step = target / 40;
            const timer = setInterval(() => {
              current += step;
              if (current >= target) { current = target; clearInterval(timer); }
              entry.target.textContent = Math.floor(current) + "+";
            }, 30);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => observer.observe(c));
  }

  // =========================
  // Projects
  // =========================
  function renderProjects(filter = "all") {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;

    const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

    grid.innerHTML = filtered.map((p) => `
      <div class="project-card" data-category="${p.category}">
        <div class="project-card-image-wrapper">
          <img src="${p.image}" alt="${p.title}" class="project-card-image" loading="lazy"
               onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzBmMGYxMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzUyNTI1YiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfk4EgUHJvamVjdDwvdGV4dD48L3N2Zz4='">
          <div class="project-card-overlay">
            <div class="project-overlay-links">
              ${p.link ? `<a href="${p.link}" target="_blank" title="Visit"><i class="fas fa-external-link-alt"></i></a>` : ""}
              <a href="#" title="Details" onclick="event.preventDefault(); openProjectModal('${p.id}')"><i class="fas fa-info-circle"></i></a>
            </div>
          </div>
        </div>
        <div class="project-card-content">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div class="project-tags">${p.tags.map((t) => `<span class="project-tag">${t}</span>`).join("")}</div>
        </div>
      </div>
    `).join("");
  }

  function initProjectFilters() {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderProjects(btn.dataset.filter);
      });
    });
  }

  // =========================
  // Project Modal
  // =========================
  window.openProjectModal = function (id) {
    const p = projects.find((x) => x.id === id);
    if (!p) return;
    document.getElementById("project-modal-img").src = p.image || "";
    document.getElementById("project-modal-img").alt = p.title;
    document.getElementById("project-modal-title").textContent = p.title;
    document.getElementById("project-modal-desc").textContent = p.description;
    document.getElementById("project-modal-category").textContent = p.category;
    document.getElementById("project-modal-tags").innerHTML = p.tags.map((t) => `<span class="project-tag">${t}</span>`).join("");
    const actions = document.getElementById("project-modal-actions");
    actions.innerHTML = "";
    if (p.link) actions.innerHTML += `<a href="${p.link}" target="_blank" class="btn-primary"><i class="fas fa-external-link-alt"></i> Visit</a>`;
    actions.innerHTML += `<button class="btn-outline" onclick="closeProjectModal()"><i class="fas fa-times"></i> Close</button>`;
    document.getElementById("project-modal-overlay").classList.add("active");
    document.body.style.overflow = "hidden";
  };

  window.closeProjectModal = function () {
    document.getElementById("project-modal-overlay").classList.remove("active");
    document.body.style.overflow = "";
  };

  document.addEventListener("click", (e) => { if (e.target.id === "project-modal-overlay") closeProjectModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeProjectModal(); });

  // =========================
  // Contact Form
  // =========================
  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = form.querySelector("button[type='submit']");
      const original = btn.innerHTML;
      const data = Object.fromEntries(new FormData(form));

      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;

      try {
        const res = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
          btn.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";
          form.reset();
        } else throw new Error();
      } catch {
        const mailto = `mailto:a.addam710@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)}`;
        window.location.href = mailto;
        btn.innerHTML = '<i class="fas fa-check"></i> Opening email...';
        btn.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";
        form.reset();
      }

      setTimeout(() => { btn.innerHTML = original; btn.style.background = ""; btn.disabled = false; }, 3000);
    });
  }

  // =========================
  // Init
  // =========================
  document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initBackToTop();
    initScrollAnimations();
    initCounters();
    renderProjects();
    initProjectFilters();
    initContactForm();
  });
})();
