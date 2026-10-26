document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.textContent = open ? "✕" : "☰";
    });
  }

  const roleButtons = [...document.querySelectorAll(".role-card")];
  let selectedRole = new URLSearchParams(window.location.search).get("role") === "worker" ? "worker" : "user";
  const submitButton = document.querySelector(".auth-submit");
  const updateRole = (role) => {
    selectedRole = role;
    roleButtons.forEach(button => {
      const selected = button.dataset.role === role;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    if (submitButton) {
      submitButton.innerHTML = `Continue as ${role === "worker" ? "worker" : "customer"} <span>↗</span>`;
    }
  };
  if (roleButtons.length) {
    updateRole(selectedRole);
    roleButtons.forEach(button => button.addEventListener("click", () => updateRole(button.dataset.role)));
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) loginForm.addEventListener("submit", event => {
    event.preventDefault();
    const message = document.getElementById("authMessage");
    message.textContent = `Frontend demo: ${selectedRole === "worker" ? "worker" : "customer"} sign-in form is ready. Authentication is not connected yet.`;
  });

  const contactForm = document.getElementById("contactForm");
  if (contactForm) contactForm.addEventListener("submit", event => {
    event.preventDefault();
    document.getElementById("formMessage").textContent = "Thanks for reaching out! This is a demo confirmation; connect a backend to send the message.";
    contactForm.reset();
  });
});