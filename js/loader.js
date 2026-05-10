// ─── LOADER ───
(function () {
  // Lock scroll while loader is active
  document.body.style.overflow = 'hidden';

  var pct = 0;
  var ldDone = false;
  var step = 0;

  var fillEl = document.getElementById('ldFill');
  var ptxtEl = document.getElementById('ldPctTxt');
  var psvgEl = document.getElementById('ldPctSvg');
  var enterEl = document.getElementById('ldEnter');
  var lc1 = document.getElementById('lc1');
  var lc2 = document.getElementById('lc2');
  var lc3 = document.getElementById('lc3');
  var lc4 = document.getElementById('lc4');
  var ringProgress = document.getElementById('ldProgressRing');

  var intv = setInterval(function () {
    pct = Math.min(pct + (Math.random() * 2.5 + 0.5), 100);

    if (ringProgress) {

      var circumference = 339;

      var offset =
        circumference - (pct / 100) * circumference;

      ringProgress.style.strokeDashoffset = offset;
    }

    // Update progress bar
    if (fillEl) fillEl.style.width = pct + '%';

    // Update percentage text
    var pStr = Math.floor(pct) + '%';
    if (ptxtEl) ptxtEl.textContent = pStr;
    if (psvgEl) psvgEl.textContent = pStr;

    // Reveal console lines at milestones
    if (pct > 20 && step < 1) { if (lc1) lc1.style.opacity = '1'; step = 1; }
    if (pct > 50 && step < 2) { if (lc2) lc2.style.opacity = '1'; step = 2; }
    if (pct > 75 && step < 3) { if (lc3) lc3.style.opacity = '1'; step = 3; }
    if (pct > 90 && step < 4) { if (lc4) lc4.style.opacity = '1'; step = 4; }

    if (pct >= 100) {

      pct = 100;

      clearInterval(intv);

      if (enterEl) {
        enterEl.classList.add('visible');
      }
    }
  }, 60);

  function enterSite() {
    if (ldDone) return;
    ldDone = true;

    var loader = document.getElementById('LOADER');
    if (loader) loader.classList.add('out');

    setTimeout(function () {
      if (loader) loader.style.display = 'none';
      document.body.style.overflow = 'auto';
      // Start canvas particle background
      if (typeof initBg === 'function') initBg();
    }, 1200);
  }

  if (enterEl) {
    enterEl.addEventListener('click', enterSite);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && pct >= 100) enterSite();
  });
})();
