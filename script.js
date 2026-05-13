const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll(".slide");
const navLinks = document.querySelectorAll(".nav-link");
const dots = document.querySelectorAll(".dot");
const cursorGlow = document.querySelector(".cursor-glow");
const tabButtons = document.querySelectorAll(".tab-btn");
const skillBoxes = document.querySelectorAll(".skill-box");

window.addEventListener("mousemove", function (e) {
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top = e.clientY + "px";
});

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.18
  }
);

revealElements.forEach(function (element) {
  revealObserver.observe(element);
});

const sectionObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");

        navLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + currentId) {
            link.classList.add("active");
          }
        });

        dots.forEach(function (dot) {
          dot.classList.remove("active");
          if (dot.getAttribute("href") === "#" + currentId) {
            dot.classList.add("active");
          }
        });
      }
    });
  },
  {
    threshold: 0.55
  }
);

sections.forEach(function (section) {
  sectionObserver.observe(section);
});

tabButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    tabButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const category = button.getAttribute("data-category");

    skillBoxes.forEach(function (box) {
      const boxCategory = box.getAttribute("data-category");

      if (category === "all" || category === boxCategory) {
        box.style.display = "block";

        setTimeout(function () {
          box.style.opacity = "1";
          box.style.transform = "scale(1)";
        }, 50);
      } else {
        box.style.opacity = "0";
        box.style.transform = "scale(0.7)";

        setTimeout(function () {
          box.style.display = "none";
        }, 250);
      }
    });
  });
});
