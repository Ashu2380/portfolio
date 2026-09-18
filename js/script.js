/* Asharam.dev interactions — no dependencies */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- theme ---------- */
  var themeBtn = document.getElementById('themeToggle');
  function paintTheme(t) {
    root.setAttribute('data-theme', t);
    themeBtn.querySelector('i').className = t === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
  try { paintTheme(localStorage.getItem('theme') || 'light'); }
  catch (e) { paintTheme('light'); }
  themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', next); } catch (e) {}
    paintTheme(next);
  });

  /* ---------- mobile menu ---------- */
  var menuBtn = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');
  function setMenu(open) {
    navLinks.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.querySelector('i').className = open ? 'fas fa-xmark' : 'fas fa-bars';
  }
  menuBtn.addEventListener('click', function () {
    setMenu(!navLinks.classList.contains('open'));
  });
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('click', function (e) {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
  });

  /* ---------- active section ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var toTop = document.getElementById('toTop');
  var ticking = false;
  function onScroll() {
    var y = window.scrollY + 140, current = sections.length ? sections[0].id : 'home';
    sections.forEach(function (s) { if (y >= s.offsetTop) current = s.id; });
    links.forEach(function (l) {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
    toTop.style.display = window.scrollY > 600 ? 'inline-flex' : 'none';
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();
  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- typing ---------- */
  var roles = [
    'Full Stack Developer', 'MERN Stack Developer',
    'Angular + Spring Boot Developer', 'Salesforce Developer', 'Blockchain Enthusiast'
  ];
  var typedEl = document.getElementById('typed');
  var ri = 0, ci = 0, deleting = false;
  (function tick() {
    var word = roles[ri];
    typedEl.textContent = word.slice(0, ci);
    var delay = deleting ? 42 : 78;
    if (!deleting && ci >= word.length) { delay = 1700; deleting = true; }
    else if (deleting && ci <= 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 420; }
    else { ci += deleting ? -1 : 1; }
    setTimeout(tick, delay);
  })();

  /* ---------- counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        cObs.unobserve(en.target);
        var end = parseInt(en.target.getAttribute('data-count'), 10) || 0;
        var t0 = performance.now(), dur = 1300;
        (function step(t) {
          var p = Math.min((t - t0) / dur, 1);
          en.target.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        })(t0);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cObs.observe(c); });
  }

  /* ---------- skill bars ---------- */
  var bars = document.querySelectorAll('.track i[data-w]');
  if ('IntersectionObserver' in window) {
    var bObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.style.width = en.target.getAttribute('data-w');
          bObs.unobserve(en.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(function (b) { bObs.observe(b); });
  } else {
    bars.forEach(function (b) { b.style.width = b.getAttribute('data-w'); });
  }

  /* ---------- project filters ---------- */
  var filterBtns = document.querySelectorAll('.chip-btn');
  var cards = document.querySelectorAll('.proj');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      cards.forEach(function (card) {
        card.classList.toggle('hidden', f !== 'all' && card.getAttribute('data-cat') !== f);
      });
    });
  });

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.card, .title, .t-item, .strip-item, .stat');
  revealEls.forEach(function (n) { n.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var rObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); rObs.unobserve(en.target); }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(function (n) { rObs.observe(n); });
  } else {
    revealEls.forEach(function (n) { n.classList.add('in'); });
  }

  /* ---------- contact form (backend API + mailto fallback) ---------- */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  var sendBtn = form.querySelector('button[type="submit"]');
  var btnHtml = sendBtn.innerHTML;
  function mailtoFallback(name, email, subject, msg) {
    window.location.href = 'mailto:asharamsaini2380@gmail.com?subject=' +
      encodeURIComponent(subject + ' — ' + name) +
      '&body=' + encodeURIComponent(msg + '\n\nFrom: ' + name + ' <' + email + '>');
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('fName').value.trim();
    var email = document.getElementById('fEmail').value.trim();
    var subject = document.getElementById('fSubject').value.trim();
    var msg = document.getElementById('fMsg').value.trim();
    var okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (name.length < 2 || !okEmail || subject.length < 3 || msg.length < 10) {
      note.textContent = 'Please fill all fields correctly (message minimum 10 characters).';
      note.style.color = '#dc2626';
      return;
    }
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>Sending...';
    var payload = { name: name, email: email, subject: subject, message: msg };
    var done = function (ok, text, color) {
      note.textContent = text;
      note.style.color = color;
      sendBtn.disabled = false;
      sendBtn.innerHTML = btnHtml;
    };
    // Same-origin API (works when served via `npm start` in /server)
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(function (r) { return r.json().then(function (j) { return { s: r.status, j: j }; }); })
      .then(function (out) {
        if (out.s === 200 && out.j.ok) {
          done(true, 'Message received! I will reply soon. Thank you.', '#059669');
          form.reset();
        } else {
          done(false, 'Server: ' + (out.j.error || 'failed') + ' — opening mail app instead.', '#dc2626');
          mailtoFallback(name, email, subject, msg);
        }
      })
      .catch(function () {
        // Backend offline (e.g. plain file open) -> mailto fallback
        done(true, 'Opening your mail app… Thanks for reaching out!', '#059669');
        mailtoFallback(name, email, subject, msg);
      });
  });
})();
