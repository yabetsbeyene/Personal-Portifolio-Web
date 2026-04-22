// ===== PARTICLE CANVAS =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let particles = [];
const PARTICLE_COUNT = 80;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '167,139,250' : '96,165,250';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(167,139,250,${0.06 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== CURSOR GLOW =====
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  highlightNav();
});

function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
  });
}

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('.mobile-link').forEach(l => {
  l.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // animate skill bars when about section reveals
      if (entry.target.id === 'about' || entry.target.contains(document.querySelector('.skill-fill'))) {
        animateSkills();
      }
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== CARD STAGGER =====
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach(card => cardObserver.observe(card));

// ===== SKILL BARS =====
let skillsAnimated = false;
function animateSkills() {
  if (skillsAnimated) return;
  skillsAnimated = true;
  document.querySelectorAll('.skill-fill').forEach(bar => {
    const width = bar.dataset.width;
    setTimeout(() => { bar.style.width = width + '%'; }, 200);
  });
}

// Also trigger skills when about section is in view
const aboutSection = document.getElementById('about');
if (aboutSection) {
  const skillsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) animateSkills();
  }, { threshold: 0.2 });
  skillsObserver.observe(aboutSection);
}

// ===== TYPING EFFECT =====
const words = ["Web Developer", "Problem Solver", "Tech Enthusiast", "Frontend Engineer", "Cybersecurity Student"];
let i = 0, j = 0, isDeleting = false;

function typeEffect() {
  const current = words[i];
  const el = document.getElementById('typing');
  if (!el) return;

  el.textContent = current.substring(0, j);

  if (!isDeleting && j === current.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1400);
    return;
  }
  if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % words.length;
  }

  j += isDeleting ? -1 : 1;
  setTimeout(typeEffect, isDeleting ? 45 : 95);
}
typeEffect();
