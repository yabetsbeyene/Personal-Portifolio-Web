// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});


// SCROLL REVEAL (Intersection Observer)
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
});

document.querySelectorAll('.hidden').forEach(el => {
  observer.observe(el);
});
const words = [
  "Web Developer",
  "Problem Solver",
  "Tech Enthusiast",
  "FrontEnd Engineer"
];

let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function typeEffect() {
  currentWord = words[i];

  if (isDeleting) {
    j--;
  } else {
    j++;
  }

  document.getElementById("typing").textContent =
    currentWord.substring(0, j);

  if (!isDeleting && j === currentWord.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1200);
    return;
  }

  if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % words.length;
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();