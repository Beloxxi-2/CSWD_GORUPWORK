<<<<<<< HEAD
=======
// DOM Elements
const body = document.body;
const themeToggle = document.getElementById('toggle-theme');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
const newsletterForm = document.getElementById('newsletter-form');
const newsletterFeedback = document.getElementById('newsletter-feedback');
const faqQuestions = document.querySelectorAll('.faq-question');

// Check for saved theme preference or use system preference
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    body.classList.toggle('dark-mode', savedTheme === 'dark');
    updateThemeToggleText();
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    body.classList.toggle('dark-mode', prefersDark);
    updateThemeToggleText();
  }
});

// Toggle dark/light theme
if (themeToggle) {
  themeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    body.classList.toggle('dark-mode');

    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);

    updateThemeToggleText();
  });
}

function updateThemeToggleText() {
  if (themeToggle) {
    themeToggle.textContent = body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
  }
}

// Mobile menu toggle
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking outside
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

// Handle newsletter form submission
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

// FAQ accordion functionality
faqQuestions.forEach((question) => {
  question.addEventListener('click', () => {
    const expanded = question.getAttribute('aria-expanded') === 'true';

    faqQuestions.forEach((q) => {
      if (q !== question) {
        q.setAttribute('aria-expanded', 'false');
      }
    });

    question.setAttribute('aria-expanded', !expanded);
  });
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach((section) => {
  section.classList.add('fade-in');
  observer.observe(section);
});

// Load placeholder images if real images fail to load
document.addEventListener(
  'error',
  (e) => {
    if (e.target.tagName.toLowerCase() === 'img') {
      e.target.src = 'https://placehold.co/400x300?text=Wireless+Festival';
    }
  },
  true
);

// Contact us page
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const subject = document.getElementById('subject')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields.');
      return;
    }

    document.getElementById('previewName').textContent = name;
    document.getElementById('previewEmail').textContent = email;
    document.getElementById('previewSubject').textContent = subject;
    document.getElementById('previewMessage').textContent = message;

    document.getElementById('previewBox').style.display = 'block';
  });
}

// Apartments page slideshow
document.addEventListener('DOMContentLoaded', function () {
  const slideshows = document.querySelectorAll('.slideshow');

  slideshows.forEach((slideshow) => {
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
>>>>>>> c7b16d3effeda26231014462818ee3f0840ed5d0
