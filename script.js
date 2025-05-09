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
