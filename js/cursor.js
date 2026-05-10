// ─── CURSOR ───
(function () {
  const cur  = document.getElementById('CUR');
  const ring = document.getElementById('CRING');
  if (!cur || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a, button, .race-card, .glass-card, .gb-item').forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      ring.style.transform    = 'translate(-50%, -50%) scale(1.6)';
      ring.style.borderColor  = 'rgba(0,200,255,.8)';
    });
    el.addEventListener('mouseleave', function () {
      ring.style.transform    = 'translate(-50%, -50%) scale(1)';
      ring.style.borderColor  = 'rgba(0,200,255,.5)';
    });
  });
})();
