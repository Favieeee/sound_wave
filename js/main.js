/* ===== SOUNDWAVE — main.js ===== */

/* ---- Navbar mobile toggle ---- */
function initNavbar() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Close when link clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

/* ---- Modal ---- */
function initModal() {
  const overlay  = document.getElementById('signupModal');
  const closeBtns = document.querySelectorAll('[data-close-modal]');
  const openBtns  = document.querySelectorAll('[data-open-modal]');
  if (!overlay) return;

  openBtns.forEach(btn => btn.addEventListener('click', () => overlay.classList.add('open')));
  closeBtns.forEach(btn => btn.addEventListener('click', () => overlay.classList.remove('open')));

  // Close on backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('open');
  });

  // Form submit
  const form = document.getElementById('signupForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = '✓ You\'re in!';
      btn.style.background = '#555';
      setTimeout(() => overlay.classList.remove('open'), 1400);
    });
  }
}

/* ---- Now Playing interactive progress ---- */
function initPlayer() {
  const playBtn = document.getElementById('playBtn');
  const fill    = document.getElementById('progressFill');
  const timeEl  = document.getElementById('currentTime');
  if (!playBtn) return;

  let playing = false;
  let seconds = 62; // 1:02
  const totalSeconds = 214; // 3:34
  let interval;

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  function tick() {
    if (seconds < totalSeconds) {
      seconds++;
      const pct = (seconds / totalSeconds) * 100;
      fill.style.width = pct + '%';
      timeEl.textContent = formatTime(seconds);
    } else {
      clearInterval(interval);
      playing = false;
      playBtn.innerHTML = '▶';
    }
  }

  playBtn.addEventListener('click', () => {
    playing = !playing;
    if (playing) {
      playBtn.innerHTML = '⏸';
      interval = setInterval(tick, 1000);
    } else {
      playBtn.innerHTML = '▶';
      clearInterval(interval);
    }
  });
}

/* ---- Track list highlight on click ---- */
function initTrackList() {
  document.querySelectorAll('.track-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.track-item').forEach(t => t.classList.remove('playing'));
      item.classList.add('playing');
      // Update num display
      item.querySelector('.track-num').innerHTML = '▶';
    });
  });
}

/* ---- Genre tabs (Discover page) ---- */
function initGenreTabs() {
  const tabs = document.querySelectorAll('.genre-tab');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

/* ---- FAQ accordion (Plans page) ---- */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

/* ---- Active nav link ---- */
function setActiveLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path) link.classList.add('active');
  });
}

/* ---- Init all ---- */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initModal();
  initPlayer();
  initTrackList();
  initGenreTabs();
  initFAQ();
  setActiveLink();
});
