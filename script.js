const SERVICE_ID = "service_ozhug0n";
const TEMPLATE_ID = "template_i9ggptj";

const form = document.getElementById("contact-form");
const statusText = document.getElementById("form-status");

const fieldMap = {
  name: {
    input: document.getElementById("name"),
    error: document.querySelector('[data-error-for="name"]'),
    requiredMessage: "Please enter your full name.",
  },
  email: {
    input: document.getElementById("email"),
    error: document.querySelector('[data-error-for="email"]'),
    requiredMessage: "Please enter your email address.",
    invalidMessage: "Please enter a valid email address.",
  },
  message: {
    input: document.getElementById("message"),
    error: document.querySelector('[data-error-for="message"]'),
    requiredMessage: "Please enter your requirements for your inquiry.",
  },
};

const clearFieldError = (field) => {
  field.error.textContent = "";
  field.input.removeAttribute("aria-invalid");
};

const setFieldError = (field, message) => {
  field.error.textContent = message;
  field.input.setAttribute("aria-invalid", "true");
};

const isValidEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const formatTimestamp = (date) => {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    Object.values(fieldMap).forEach(clearFieldError);
    statusText.textContent = "";

    let hasError = false;
    const nameValue = fieldMap.name.input.value.trim();
    const emailValue = fieldMap.email.input.value.trim();
    const messageValue = fieldMap.message.input.value.trim();

    if (!nameValue) {
      setFieldError(fieldMap.name, fieldMap.name.requiredMessage);
      hasError = true;
    }

    if (!emailValue) {
      setFieldError(fieldMap.email, fieldMap.email.requiredMessage);
      hasError = true;
    } else if (!isValidEmail(emailValue)) {
      setFieldError(fieldMap.email, fieldMap.email.invalidMessage);
      hasError = true;
    }

    if (!messageValue) {
      setFieldError(fieldMap.message, fieldMap.message.requiredMessage);
      hasError = true;
    }

    if (hasError) {
      statusText.textContent = "Please correct the highlighted fields.";
      return;
    }

    const phoneValue = document.getElementById("phone").value.trim() || "0000000000";
    const params = {
      from_name: nameValue,
      to_name: "Noor International",
      from_email: emailValue,
      phone: phoneValue,
      message: messageValue,
      time: formatTimestamp(new Date()),
    };

    statusText.textContent = "Sending...";

    if (typeof emailjs === "undefined") {
      statusText.textContent = "Email service unavailable. Please try again later.";
      return;
    }

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, params)
      .then(() => {
        statusText.textContent = "Email sent successfully!";
        form.reset();
      })
      .catch(() => {
        statusText.textContent = "Something went wrong. Please try again.";
      });
  });
}

const navToggle = document.querySelector(".nav-toggle");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-links a");

const setNavbarState = () => {
  if (!navbar) {
    return;
  }
  if (window.scrollY > 0) {
    navbar.classList.add("is-scrolled");
  } else {
    navbar.classList.remove("is-scrolled");
  }
};

window.addEventListener("scroll", setNavbarState, { passive: true });
window.addEventListener("load", setNavbarState);

if (navToggle && navbar) {
  navToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbar.classList.contains("is-open")) {
        navbar.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}
