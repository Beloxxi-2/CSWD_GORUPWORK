// === DOM Elements ===
const body = document.body;
const themeToggle = document.getElementById('toggle-theme');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
const newsletterForm = document.getElementById('newsletter-form');
const newsletterFeedback = document.getElementById('newsletter-feedback');
const faqQuestions = document.querySelectorAll('.faq-question');
const contactForm = document.getElementById('contactForm');

// === THEME HANDLING ===
function setTheme(theme) {
  body.classList.toggle('dark-mode', theme === 'dark');
  if (themeToggle) themeToggle.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
  localStorage.setItem('theme', theme);
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
});

if (themeToggle) {
  themeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    const isDark = !body.classList.contains('dark-mode');
    setTheme(isDark ? 'dark' : 'light');
  });
}

// === MOBILE MENU ===
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('active') &&
      !navLinks.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// === NEWSLETTER FORM ===
if (newsletterForm && newsletterFeedback) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    if (!emailInput) return;
    const email = emailInput.value;
    newsletterFeedback.textContent = 'Processing...';
    setTimeout(() => {
      newsletterFeedback.textContent = `Thanks! ${email} has been subscribed.`;
      newsletterForm.reset();
      setTimeout(() => {
        newsletterFeedback.textContent = '';
      }, 5000);
    }, 1000);
  });
}

// === FAQ ACCORDION ===
faqQuestions.forEach((question) => {
  question.addEventListener('click', () => {
    const expanded = question.getAttribute('aria-expanded') === 'true';
    faqQuestions.forEach((q) => q.setAttribute('aria-expanded', 'false'));
    question.setAttribute('aria-expanded', !expanded);
  });
});

// === SECTION FADE-IN ANIMATION ===
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('section').forEach((section) => {
  section.classList.add('fade-in');
  observer.observe(section);
});

// === IMAGE PLACEHOLDER ON ERROR ===
document.addEventListener(
  'error',
  (e) => {
    if (e.target.tagName.toLowerCase() === 'img') {
      e.target.src = 'https://placehold.co/400x300?text=Wireless+Festival';
    }
  },
  true
);

// === CONTACT FORM PREVIEW ===
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const getVal = id => document.getElementById(id)?.value.trim();
    const name = getVal('name');
    const email = getVal('email');
    const subject = getVal('subject');
    const message = getVal('message');
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields.');
      return;
    }
    ['Name', 'Email', 'Subject', 'Message'].forEach(field => {
      document.getElementById('preview' + field).textContent = eval(field.toLowerCase());
    });
    document.getElementById('previewBox').style.display = 'block';
  });
}

// === APARTMENTS PAGE SLIDESHOW ===
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.slideshow').forEach((slideshow) => {
    let currentIndex = 0;
    const slides = slideshow.querySelectorAll('.slide');
    const prevButton = slideshow.querySelector('.prev');
    const nextButton = slideshow.querySelector('.next');
    if (!slides.length || !prevButton || !nextButton) return;
    slideshow.classList.add('active');
    function changeSlide() {
      slides.forEach((slide, index) => {
        slide.style.display = index === currentIndex ? 'block' : 'none';
      });
    }
    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      changeSlide();
    });
    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      changeSlide();
    });
    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      changeSlide();
    }, 7000);
    changeSlide();
  });
});

// === MAIN SLIDESHOW (ARTISTS PAGE) ===
(function () {
  const slides = document.querySelectorAll('.slide');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const dots = document.querySelectorAll('.dot');
  if (!slides.length) return;
  let currentSlide = 0;
  function showSlide(index) {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }
  if (nextButton) nextButton.addEventListener('click', nextSlide);
  if (prevButton) prevButton.addEventListener('click', prevSlide);
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
  setInterval(nextSlide, 5000);
  showSlide(currentSlide);
})();

//   SWITCHING IMAGES
  var productElements = document.querySelectorAll(".product");

  for (var i = 0; i < productElements.length; i++) {
    var product = productElements[i];

    product.addEventListener("mouseenter", function(event) {
      var imageElement = this.querySelector("img");
      var backImage = imageElement.getAttribute("data-back");
      imageElement.src = backImage;
    });

    product.addEventListener("mouseleave", function(event) {
      var imageElement = this.querySelector("img");
      var frontImage = imageElement.getAttribute("data-front");
      imageElement.src = frontImage;
    });
}

// DIRECTION TO PRODUCT SECTIONS

// Get the hash from the URL (e.g. "#2")
const hash = window.location.hash.replace("#", "");
console.log("HASH IS:", hash);

// Hide all sections
document.querySelectorAll(".powerless-div").forEach(element => {
  element.style.display = "none";
  console.log("Successfully hidden all sections")
});

// Show the specific section if the ID matches
if (hash) {
  const section = document.getElementById(hash);
  if (section) {
    section.style.display = "block";
  }
} else {
    console.log("No matching ID")
}

// SWITCH DISPLAY FOR UNDER PRODUCTS

// Select all under-product links
document.querySelectorAll('a.under-product').forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent navigation to products.html...
  
      const hash = this.href.split('#')[1]; // Get hash part
      console.log("HASH IS:", hash);
  
      // Hide all target sections
      document.querySelectorAll(".powerless-div").forEach(element => {
        element.style.display = "none";
      });
  
      // Show the specific section by ID
      if (hash) {
        const section = document.getElementById(hash);
        if (section) {
          section.style.display = "block";
          console.log("Section with ID: " + hash + " displayed")
        } else {
          console.log("Section with ID '" + hash + "' not found.");
        }
      } else {
        console.log("No hash found.");
      }
    });
  });
  