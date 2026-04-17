(() => {
  const storageKey = "esc311_theme";
  const toggle = document.querySelector("[data-theme-toggle]");

  function setTheme(mode) {
    document.body.classList.toggle("light-mode", mode === "light");
    try {
      localStorage.setItem(storageKey, mode);
    } catch {
      // ignore
    }
    updateToggle(mode);
  }

  function getTheme() {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === "light" || saved === "dark") return saved;
    } catch {
      // ignore
    }
    return "dark";
  }

  function updateToggle(mode) {
    if (!toggle) return;
    const label = mode === "light" ? "Switch to dark mode" : "Switch to light mode";
    toggle.setAttribute("aria-label", label);
    const icon = toggle.querySelector("[data-icon]");
    if (icon) icon.textContent = mode === "light" ? "☀" : "☾";
  }

  // Hamburger menu toggle
  const hamburger = document.querySelector("[data-hamburger]");
  const navlinks = document.querySelector(".navlinks");
  
  if (hamburger && navlinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navlinks.classList.toggle("active");
    });
    
    // Close menu when a link is clicked
    navlinks.querySelectorAll("a, button").forEach(el => {
      el.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navlinks.classList.remove("active");
      });
    });
  }

  // Image modal
  const modal = document.querySelector(".image-modal");
  const modalClose = document.querySelector(".image-modal-close");
  const modalImg = modal ? modal.querySelector("img") : null;
  
  if (modal && modalClose && modalImg) {
    // Add click handlers to all images with clickable class
    document.querySelectorAll("img.clickable").forEach(img => {
      img.addEventListener("click", () => {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });
    
    // Close modal
    function closeModal() {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
    
    modalClose.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    
    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }
    });
  }

  // Mark active link
  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("a[data-nav]").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === current) a.setAttribute("aria-current", "page");
  });

  const theme = getTheme();
  setTheme(theme);

  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = document.body.classList.contains("light-mode") ? "dark" : "light";
      setTheme(next);
    });
  }

  // Optional: mailto contact helper (only runs if form exists)
  const mailForm = document.querySelector("[data-mailto-form]");
  if (mailForm) {
    mailForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(mailForm);
      const to = (mailForm.getAttribute("data-mailto") || "").trim();
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const subject = String(data.get("subject") || "").trim() || "ESC 311 Group Message";
      const message = String(data.get("message") || "").trim();

      if (!to || !email || !message) {
        const out = document.querySelector("[data-form-status]");
        if (out) {
          out.textContent = "Please fill Email and Message (and ensure group email is set).";
          out.style.display = "block";
        }
        return;
      }

      const body = [
        message,
        "",
        "---",
        `Name: ${name || "N/A"}`,
        `Email: ${email}`,
      ].join("\n");

      const href =
        `mailto:${encodeURIComponent(to)}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

      const out = document.querySelector("[data-form-status]");
      if (out) {
        out.textContent = "Opening your mail app…";
        out.style.display = "block";
      }
      window.location.href = href;
    });
  }
})();
