// ─── PARALLAX HERO ───
window.addEventListener('scroll', function () {
  var y   = window.scrollY;
  var hbg = document.querySelector('.hero-bg-img');
  var hh1 = document.querySelector('.hero-h1');

  if (hbg) hbg.style.transform = 'scale(1.05) translateY(' + (y * 0.15) + 'px)';
  if (hh1) {
    hh1.style.transform = 'translateY(' + (y * 0.2) + 'px)';
    hh1.style.opacity   = String(Math.max(0, 1 - y / 600));
  }
});
