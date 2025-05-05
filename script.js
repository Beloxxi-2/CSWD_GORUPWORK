function startSlideshow(id) {
  const container = document.getElementById(id);
  const images = container.querySelectorAll('img');
  const prevBtn = container.querySelector('.prev');
  const nextBtn = container.querySelector('.next');
  let index = 0;

  function showImage(i) {
    images.forEach(img => img.style.display = 'none');
    images[i].style.display = 'block';
  }

  function nextImage() {
    index = (index + 1) % images.length;
    showImage(index);
  }

  function prevImage() {
    index = (index - 1 + images.length) % images.length;
    showImage(index);
  }

  nextBtn.onclick = nextImage;
  prevBtn.onclick = prevImage;

  showImage(0);
}

['ensuite-slideshow', 'studio-slideshow', 'shared-slideshow', 'standard-slideshow'].forEach(startSlideshow);
