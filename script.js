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
    // Use system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    body.classList.toggle('dark-mode', prefersDark);
    updateThemeToggleText();
  }
});

// Toggle dark/light theme
themeToggle.addEventListener('click', (e) => {
  e.preventDefault();
  body.classList.toggle('dark-mode');
  
  // Save preference
  const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  
  updateThemeToggleText();
});

// Update theme toggle button text
function updateThemeToggleText() {
  themeToggle.textContent = body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
}

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !expanded);
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('active') && 
      !navLinks.contains(e.target) && 
      !menuToggle.contains(e.target)) {
    navLinks.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

// Handle newsletter form submission
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    // Simulate form submission
    newsletterFeedback.textContent = 'Processing...';
    
    // Simulate API call
    setTimeout(() => {
      newsletterFeedback.textContent = `Thanks! ${email} has been subscribed.`;
      newsletterForm.reset();
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        newsletterFeedback.textContent = '';
      }, 5000);
    }, 1000);
  });
}

// FAQ accordion functionality
faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const expanded = question.getAttribute('aria-expanded') === 'true';
    
    // Close all other questions
    faqQuestions.forEach(q => {
      if (q !== question) {
        q.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Toggle current question
    question.setAttribute('aria-expanded', !expanded);
  });
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
  section.classList.add('fade-in');
  observer.observe(section);
});

// Load placeholder images if real images fail to load
document.addEventListener('error', (e) => {
  if (e.target.tagName.toLowerCase() === 'img') {
    e.target.src = `https://placehold.co/400x300?text=Wireless+Festival`;
  }
}, true);