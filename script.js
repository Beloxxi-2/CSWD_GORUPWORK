function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("active");
}
document.addEventListener("DOMContentLoaded", function () {
  const slideshows = document.querySelectorAll('.slideshow');
  
  slideshows.forEach((slideshow) => {
    let currentIndex = 0;
    const slides = slideshow.querySelectorAll('.slide');
    const prevButton = slideshow.querySelector('.prev');
    const nextButton = slideshow.querySelector('.next');

    // Set the first slideshow as active
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

    // Automatic slideshow change every 7 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      changeSlide();
    }, 7000);

    changeSlide();
  });
});
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !subject || !message) {
    alert('Please fill in all fields.');
    return;
  }

  document.getElementById('previewName').textContent = name;
  document.getElementById('previewEmail').textContent = email;
  document.getElementById('previewSubject').textContent = subject;
  document.getElementById('previewMessage').textContent = message;

  document.getElementById('previewBox').style.display = 'block' });

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
  