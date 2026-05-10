// ─── NAV SCROLL CLASS ───
window.addEventListener('scroll', function () {
  var nav = document.getElementById('NAV');
  if (nav) nav.classList.toggle('sc', window.scrollY > 60);
});

// ─── SCROLL REVEAL ───
(function () {
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add('in');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.sr, .sr-l, .sr-r').forEach(function (el) {
    obs.observe(el);
  });
})();
