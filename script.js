// DOM Elements 
const body = document.body;
const themeToggle = document.getElementById('toggle-theme');
const themeIcon = document.getElementById('theme-icon');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
const newsletterForm = document.getElementById('newsletter-form');
const newsletterFeedback = document.getElementById('newsletter-feedback');
const faqQuestions = document.querySelectorAll('.faq-question');
const contactForm = document.getElementById('contactForm');

//  THEME HANDLING
function updateThemeIcon(isDark) {
  if (themeIcon) {
    themeIcon.className = "fa-solid fa-circle-half-stroke";
    themeIcon.style.color = "#fff";
    // Flip the icon horizontally in dark mode, normal in light mode
    themeIcon.style.transform = isDark ? "scaleX(-1)" : "scaleX(1)";
    themeIcon.style.transition = "transform 0.3s";
  }
}

function setTheme(theme) {
  body.classList.toggle('dark-mode', theme === 'dark');  // Toggle dark mode class
  updateThemeIcon(theme === 'dark');  // Update icon appearance
  localStorage.setItem('theme', theme);  // Save theme preference
}

document.addEventListener('DOMContentLoaded', () => {
  // Move theme icon to end of nav bar if not already
  const navLinksList = document.querySelector('.nav-links');
  const themeLi = document.getElementById('toggle-theme')?.parentElement;
  if (navLinksList && themeLi) {
    navLinksList.appendChild(themeLi);
  }

  // Set theme on load based on saved preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
});

if (themeToggle) {
  themeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    const isDark = !body.classList.contains('dark-mode');  // Check current mode
    setTheme(isDark ? 'dark' : 'light');  // Toggle theme
  });
}

// MOBILE MENU 
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);  // Toggle aria-expanded
    navLinks.classList.toggle('active');  // Show/hide menu
  });

  // Close menu when clicking outside
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

// NEWSLETTER FORM 
if (newsletterForm && newsletterFeedback) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    if (!emailInput) return;
    const email = emailInput.value;
    newsletterFeedback.textContent = 'Processing...';  // Show processing message
    setTimeout(() => {
      newsletterFeedback.textContent = `Thanks! ${email} has been subscribed.`;  // Success message
      newsletterForm.reset();  // Clear form
      setTimeout(() => {
        newsletterFeedback.textContent = '';  // Clear feedback after 5 seconds
      }, 5000);
    }, 1000);
  });
}

// FAQ ACCORDION 
faqQuestions.forEach((question) => {
  question.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    // Collapse all answers first
    faqQuestions.forEach((q) => {
      q.setAttribute('aria-expanded', 'false');
      const answer = q.nextElementSibling;
      if (answer && answer.classList.contains('tickets-faq-answer')) {
        answer.style.maxHeight = null;
      }
    });
    // Expand/collapse the clicked one
    this.setAttribute('aria-expanded', !expanded);
    const answer = this.nextElementSibling;
    if (answer && answer.classList.contains('tickets-faq-answer')) {
      if (!expanded) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
    }
  });
});

//  SECTION FADE-IN ANIMATION
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

// IMAGE PLACEHOLDER ON ERROR 
document.addEventListener(
  'error',
  (e) => {
    if (e.target.tagName.toLowerCase() === 'img') {
      e.target.src = 'https://placehold.co/400x300?text=Wireless+Festival';
    }
  },
  true
);

//CONTACT FORM PREVIEW
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
    // Update preview fields
    ['Name', 'Email', 'Subject', 'Message'].forEach(field => {
      document.getElementById('preview' + field).textContent = eval(field.toLowerCase());
    });
    document.getElementById('previewBox').style.display = 'block';
  });
}

// APARTMENTS PAGE SLIDESHOW 
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

//  MAIN SLIDESHOW (ARTISTS PAGE) 
(function () {
  // Only run if the artist slideshow section exists
  const artistSlideshow = document.querySelector('.artist-slideshow');
  if (!artistSlideshow) return;

  const slides = artistSlideshow.querySelectorAll('.slide');
  const prevButton = artistSlideshow.querySelector('.prev');
  const nextButton = artistSlideshow.querySelector('.next');
  const dots = artistSlideshow.querySelectorAll('.dot');
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

//TICKETS PAGE FAQ DROPDOWN
document.querySelectorAll('.tickets-faq-question').forEach((question) => {
  question.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    // Collapse all tickets FAQ answers
    document.querySelectorAll('.tickets-faq-question').forEach((q) => {
      q.setAttribute('aria-expanded', 'false');
      const answer = q.nextElementSibling;
      if (answer && answer.classList.contains('tickets-faq-answer')) {
        answer.style.maxHeight = null;
      }
      // Reset arrow
      const arrow = q.querySelector('.tickets-arrow');
      if (arrow) arrow.style.transform = '';
    });
    // Expand/collapse the clicked one
    this.setAttribute('aria-expanded', !expanded);
    const answer = this.nextElementSibling;
    if (answer && answer.classList.contains('tickets-faq-answer')) {
      if (!expanded) {
        answer.style.maxHeight = answer.scrollHeight + "px";
        // Rotate arrow
        const arrow = this.querySelector('.tickets-arrow');
        if (arrow) arrow.style.transform = 'rotate(90deg)';
      } else {
        answer.style.maxHeight = null;
      }
    }
  });
});