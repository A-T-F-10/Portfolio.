/* ============================================
   ATIF ADEM — PORTFOLIO APP.JS
   Interactive Features & Project Management
   ============================================ */

(function () {
  "use strict";

  // =========================
  // Default Projects Data
  // =========================
  const defaultProjects = [
    {
      id: "default-1",
      title: "المركز العام للنقل",
      description: "Transportation management system for efficient fleet and route tracking.",
      image: "images/2.png",
      category: "app",
      tags: ["Flutter", "Firebase", "Maps API"],
      link: "",
    },
    {
      id: "default-2",
      title: "Sahemtrv (سهم)",
      description: "Travel and tourism booking platform with trip searching, accommodation booking, and package deals. Designed for seamless customer experience with secure payment processing and optimized performance.",
      image: "images/3.png",
      category: "web",
      tags: ["Laravel", "PHP", "MySQL"],
      link: "",
    },
    {
      id: "default-3",
      title: "امتثال (Compliance)",
      description: "Compliance management application for regulatory tracking and reporting.",
      image: "images/4.png",
      category: "app",
      tags: ["Flutter", "REST API", "Bloc"],
      link: "",
    },
    {
      id: "default-4",
      title: "DBsaloni",
      description: "Salon management app for booking and searching salons with appointment scheduling, salon listings, and user profiles. Intuitive UI for seamless bookings across Android and iOS.",
      image: "images/DBsalonis.png",
      category: "app",
      tags: ["Flutter", "Dart", "Firebase"],
      link: "",
    },
    {
      id: "default-5",
      title: "MeQRCode",
      description: "Cross-platform QR code generator and scanner app with custom QR creation features, user-friendly interface, and secure data handling. Delivered bug-free within timeline.",
      image: "images/qrcode.png",
      category: "app",
      tags: ["Flutter", "Dart", "Camera"],
      link: "",
    },
    {
      id: "default-6",
      title: "ZHAB",
      description: "RFID-based application to scan and track pilgrims' luggage with real-time scanning, data retrieval, and a user-friendly interface designed for non-technical staff. Secure handling across Android and iOS.",
      image: "images/zhabs.png",
      category: "app",
      tags: ["Flutter", "RFID", "Dart"],
      link: "",
    },
    {
      id: "default-7",
      title: "Digital Guide",
      description: "App for searching and connecting with charitable organizations. Browse charity profiles, contact details, and services offered with smooth navigation across Android and iOS.",
      image: "images/Untitled design (6).png",
      category: "app",
      tags: ["Flutter", "REST API", "Dart"],
      link: "",
    },
    {
      id: "default-8",
      title: "Shaheen",
      description: "Multi-feature application with real-time data syncing and push notifications.",
      image: "images/shaheen.png",
      category: "app",
      tags: ["Flutter", "Firebase", "FCM"],
      link: "",
    },
    {
      id: "default-9",
      title: "Let's Go",
      description: "Travel companion app with trip planning and social features.",
      image: "images/letgo.png",
      category: "app",
      tags: ["Flutter", "REST API", "GetX"],
      link: "",
    },
    {
      id: "default-10",
      title: "Moasherat",
      description: "Consulting services website for government, private, and non-profit sectors with expert profiles, case studies, and client-consultant communication through contact forms and scheduling tools.",
      image: "images/moasherat.png",
      category: "web",
      tags: ["Laravel", "PHP", "MySQL"],
      link: "https://moasherat.co/",
    },
    {
      id: "default-11",
      title: "Alamry Law Firm",
      description: "Professional law firm website with legal services display, attorney profiles, client testimonials, inquiry forms, and appointment scheduling. Clean, responsive interface across all devices.",
      image: "images/Untitled design (4).png",
      category: "web",
      tags: ["HTML/CSS", "JavaScript", "PHP"],
      link: "https://alamry.sa/",
    },
    {
      id: "default-12",
      title: "Maham Expo",
      description: "Exhibition and expo management platform with event scheduling, booth booking, and visitor registration.",
      image: "images/maham-expo.png",
      category: "web",
      tags: ["Laravel", "Vue.js", "Google Cloud"],
      link: "",
    },
  ];

  // =========================
  // Particles Animation
  // =========================
  function initParticles() {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(175, 54, 137, ${this.opacity})`;
        ctx.fill();
      }
    }

    function init() {
      particles = [];
      const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(175, 54, 137, ${0.08 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      connectParticles();
      animationId = requestAnimationFrame(animate);
    }

    resize();
    init();
    animate();

    window.addEventListener("resize", () => {
      resize();
      init();
    });
  }

  // =========================
  // Typing Animation
  // =========================
  function initTypingAnimation() {
    const el = document.getElementById("typed-text");
    if (!el) return;

    const strings = [
      "Software Engineer",
      "Flutter Developer",
      "Backend Developer",
      "DevOps Engineer",
      "Cloud Architect",
    ];

    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
      const current = strings[stringIndex];

      if (isDeleting) {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === current.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        stringIndex = (stringIndex + 1) % strings.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
  }

  // =========================
  // Navigation
  // =========================
  function initNavigation() {
    const navbar = document.getElementById("navbar");
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Scroll effect
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });

    // Mobile toggle
    if (navToggle) {
      navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
      });
    }

    // Close on link click
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
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
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
      if (window.scrollY > 500) {
        btn.classList.add("visible");
      } else {
        btn.classList.remove("visible");
      }
    });

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // =========================
  // Scroll Animations
  // =========================
  function initScrollAnimations() {
    const elements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
  }

  // =========================
  // Counter Animation
  // =========================
  function initCounters() {
    const counters = document.querySelectorAll(".stat-number");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
            entry.target.classList.add("counted");
            const target = parseInt(entry.target.getAttribute("data-count"));
            let current = 0;
            const increment = target / 60;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              entry.target.textContent = Math.floor(current) + "+";
            }, 30);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  // =========================
  // Projects Manager
  // =========================
  function getProjects() {
    const stored = localStorage.getItem("portfolio_projects");
    const customProjects = stored ? JSON.parse(stored) : [];
    return [...defaultProjects, ...customProjects];
  }

  function renderProjects(filter = "all") {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;

    const projects = getProjects();
    const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

    grid.innerHTML = filtered
      .map(
        (project, index) => `
      <div class="project-card animate-on-scroll animated" data-category="${project.category}">
        <div class="project-card-image-wrapper">
          <img src="${project.image}" alt="${project.title}" class="project-card-image" 
               onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzFhMWEyNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iSW50ZXIsc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzZjNjNmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfk4EgUHJvamVjdDwvdGV4dD48L3N2Zz4='">
          <div class="project-card-overlay">
            <div class="project-overlay-links">
              ${project.link ? `<a href="${project.link}" target="_blank" title="Visit Site"><i class="fas fa-external-link-alt"></i></a>` : ""}
              <a href="#" title="View Details" onclick="event.preventDefault(); openProjectModal('${project.id}')"><i class="fas fa-info-circle"></i></a>
            </div>
          </div>
        </div>
        <div class="project-card-content">
          <h3>${project.title}</h3>
          <p>${project.description || ""}</p>
          <div class="project-tags">
            ${(project.tags || []).map((tag) => `<span class="project-tag">${tag}</span>`).join("")}
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  function initProjectFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderProjects(btn.getAttribute("data-filter"));
      });
    });
  }

  // =========================
  // Project Detail Modal
  // =========================
  window.openProjectModal = function(projectId) {
    const projects = getProjects();
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    document.getElementById('project-modal-img').src = project.image || '';
    document.getElementById('project-modal-img').alt = project.title;
    document.getElementById('project-modal-title').textContent = project.title;
    document.getElementById('project-modal-desc').textContent = project.description || 'No description available.';
    document.getElementById('project-modal-category').textContent = project.category;
    document.getElementById('project-modal-tags').innerHTML = (project.tags || []).map(t => `<span class="project-tag">${t}</span>`).join('');

    const actionsEl = document.getElementById('project-modal-actions');
    actionsEl.innerHTML = '';
    if (project.link) {
      actionsEl.innerHTML += `<a href="${project.link}" target="_blank" class="btn-primary"><i class="fas fa-external-link-alt"></i> Visit Site</a>`;
    }
    actionsEl.innerHTML += `<button class="btn-outline" onclick="closeProjectModal()"><i class="fas fa-times"></i> Close</button>`;

    document.getElementById('project-modal-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeProjectModal = function() {
    document.getElementById('project-modal-overlay').classList.remove('active');
    document.body.style.overflow = '';
  };

  // Close modal on overlay click & Escape key
  document.addEventListener('click', function(e) {
    if (e.target.id === 'project-modal-overlay') closeProjectModal();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeProjectModal();
  });

  // =========================
  // Contact Form
  // =========================
  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = form.querySelector("button[type='submit']");
      const originalText = btn.innerHTML;

      const name = form.querySelector("#name").value;
      const email = form.querySelector("#email").value;
      const subject = form.querySelector("#subject").value;
      const message = form.querySelector("#message").value;

      // Show loading state
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;

      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message }),
        });

        const data = await response.json();

        if (response.ok) {
          btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
          btn.style.background = "linear-gradient(135deg, #28a745, #20c997)";
          form.reset();
        } else {
          throw new Error(data.error || "Failed to send message");
        }
      } catch (error) {
        console.error("Email error:", error);
        btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to Send';
        btn.style.background = "linear-gradient(135deg, #b24f4b, #af3689)";
      }

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = "";
        btn.disabled = false;
      }, 3000);
    });
  }

  // =========================
  // Initialize Everything
  // =========================
  document.addEventListener("DOMContentLoaded", () => {
    initParticles();
    initTypingAnimation();
    initNavigation();
    initBackToTop();
    initScrollAnimations();
    initCounters();
    renderProjects();
    initProjectFilters();
    initContactForm();
  });
})();
