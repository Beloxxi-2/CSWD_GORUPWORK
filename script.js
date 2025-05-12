<<<<<<< HEAD
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
=======
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
  
>>>>>>> ekene
