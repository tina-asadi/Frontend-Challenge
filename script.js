const slides = [
  {
    id: 0,
    image: 'images/bottle-1.png',
    thumb: 'images/thumb-1.png',
    caption:'Orange Sunshine',
    bg: 'linear-gradient(135deg,#FFD86F,#FC6262)',
    link: 'https://example.com/orange',
    fruits: [
      { src: 'images/fruit-orange-1.png', alt:'Orange slice', x: 0.55, y: 0.68, size: 220, rot: 8 }
    ]
  },
  {
    id: 1,
    image: 'images/bottle-2.png',
    thumb: 'images/thumb-2.png',
    caption:'Green Cleanse',
    bg: 'linear-gradient(135deg,#A8E063,#56AB2F)',
    link: 'https://example.com/green',
    fruits: [
      { src: 'images/fruit-kiwi.png', alt:'Kiwi', x: 0.57, y: 0.62, size: 180, rot: 8 }
    ]
  },
  {
    id: 2,
    image: 'images/bottle-3.png',
    thumb: 'images/thumb-3.png',
    caption:'Berry Blast',
    bg: 'linear-gradient(135deg,#FF9A9E,#FAD0C4)',
    link: 'https://example.com/berry',
    fruits: [
      { src: 'images/fruit-strawberry.png', alt:'strawberry', x: 0.54, y: 0.72, size: 220, rot: 8 }
    ]
  }
];

let current = 0;
let autoSlide;
const bottle = document.getElementById("bottle");
const caption = document.getElementById("caption");
const fruitsGroup = document.getElementById("fruitsGroup");
const thumbs = document.getElementById("thumbs");
const body = document.body;
const slideLink = document.getElementById("slideLink");

// render thumbs
slides.forEach((s, i) => {
  const img = document.createElement("img");
  img.src = s.thumb;
  img.alt = `${s.caption} thumbnail`;
  img.setAttribute("role","tab");
  img.classList.toggle("active", i === 0);
  img.addEventListener("click", () => showSlide(i));
  thumbs.appendChild(img);
});

function renderFruits(slide) {
  fruitsGroup.innerHTML = "";
  slide.fruits.forEach(f => {
    const img = document.createElement("img");
    img.src = f.src;
    img.alt = f.alt || "";
    img.style.left = `${f.x * 100}%`;
    img.style.top = `${f.y * 100}%`;
    img.style.width = `${f.size}px`;
    img.style.transform = `translate(-50%, -50%) rotate(${f.rot}deg)`;
    fruitsGroup.appendChild(img);
  });
}

function showSlide(i) {
  current = i;
  const slide = slides[i];

  // fade transition
  bottle.style.opacity = 0;
  fruitsGroup.style.opacity = 0;

  setTimeout(() => {
    bottle.src = slide.image;
    caption.textContent = slide.caption;
    body.style.background = slide.bg;
    slideLink.href = slide.link || "#";
    renderFruits(slide);

    bottle.style.transform = "scale(1.05)";
    setTimeout(() => {
      bottle.style.opacity = 1;
      fruitsGroup.style.opacity = 1;
      bottle.style.transform = "scale(1)";
    }, 50);
  }, 400);

  document.querySelectorAll("#thumbs img").forEach((img, idx) => {
    img.classList.toggle("active", idx === i);
  });
}

// auto-slide
function startAutoSlide() {
  autoSlide = setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 3000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

document.querySelector(".slider").addEventListener("mouseenter", stopAutoSlide);
document.querySelector(".slider").addEventListener("mouseleave", startAutoSlide);

// Select arrows safely
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

// Add event listeners only if they exist
if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });
}

// Optional: keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  } else if (e.key === 'ArrowRight') {
    current = (current + 1) % slides.length;
    showSlide(current);
  }
});

// init
showSlide(0);
startAutoSlide();
