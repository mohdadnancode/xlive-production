// ─── HERO SPEED LINES ───
(function () {
  var slContainer = document.getElementById('speedLines');
  if (!slContainer) return;

  for (var i = 0; i < 12; i++) {
    var line = document.createElement('div');
    line.className = 'hero-speed-line';
    line.style.cssText = [
      'top:'                + (10 + Math.random() * 80) + '%;',
      'animation-duration:' + (2  + Math.random() * 4)  + 's;',
      'animation-delay:'    + (Math.random() * 3)        + 's;',
      'opacity:'            + (0.2 + Math.random() * 0.4)
    ].join('');
    slContainer.appendChild(line);
  }
})();

// ─── BG CANVAS (called by loader after enter) ───
function initBg() {
  var canvas = document.getElementById('BGCANVAS');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  var pts = Array.from({ length: 80 }, function () {
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r:  Math.random() * 1.2 + 0.3
    };
  });

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (var i = 0; i < pts.length; i++) {
      for (var j = i + 1; j < pts.length; j++) {
        var dx = pts[i].x - pts[j].x;
        var dy = pts[i].y - pts[j].y;
        var d  = Math.sqrt(dx * dx + dy * dy);

        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = 'rgba(0,200,255,' + (0.08 * (1 - d / 130)) + ')';
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }

    pts.forEach(function (p) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,200,255,.35)';
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
}
