(function(){
  document.getElementById('yr').textContent = new Date().getFullYear();

  /* ---- nav ---- */
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var progress = document.getElementById('progress');
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
  var sections = links.map(function(l){ return document.querySelector(l.getAttribute('href')); });

  toggle.addEventListener('click', function(){
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  document.querySelectorAll('.nav__links a').forEach(function(a){
    a.addEventListener('click', function(){ nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded','false'); });
  });

  function onScroll(){
    var y = window.scrollY;
    nav.classList.toggle('is-stuck', y > 24);
    var h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
    var idx = 0;
    sections.forEach(function(s, i){ if (s && s.getBoundingClientRect().top <= 140) idx = i; });
    links.forEach(function(l, i){ l.classList.toggle('is-active', i === idx); });
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* ---- awards orbit ---- */
  var orbBtns = Array.prototype.slice.call(document.querySelectorAll('.hub__i'));
  var orbPanels = Array.prototype.slice.call(document.querySelectorAll('.hub-card'));
  var orbWrap = document.querySelector('.hub-wrap');
  var ORB_R = 120, ORB_ARM = 186, ORB_PAD = 18, ORB_MIN = 460;

  /* size the block to the open card so the hub sits in its content, not in a void */
  function orbFit(panel){
    if (!orbWrap || !panel) return;
    var dir = (panel.className.match(/hub-card--([trbl])/) || [])[1];
    var h = panel.offsetHeight, near = ORB_R + 34, far = ORB_ARM + h + ORB_PAD, above, below;
    if (dir === 't'){ above = far; below = near; }
    else if (dir === 'b'){ above = near; below = far; }
    else { above = below = Math.max(near, h / 2 + ORB_PAD); }
    var total = Math.max(above + below, ORB_MIN);
    above += (total - above - below) / 2;
    orbWrap.style.setProperty('--cy', Math.round(above) + 'px');
    orbWrap.style.setProperty('--hub-h', Math.round(total) + 'px');
  }
  function orbSelect(btn){
    var key = btn.getAttribute('data-panel');
    orbBtns.forEach(function(b){ b.setAttribute('aria-selected', String(b === btn)); });
    orbPanels.forEach(function(p){
      var on = p.getAttribute('data-panel') === key;
      p.classList.toggle('is-open', on);
      if (on) orbFit(p);
    });
  }
  orbBtns.forEach(function(btn){
    ['mouseenter','focus','click'].forEach(function(ev){
      btn.addEventListener(ev, function(){ orbSelect(btn); });
    });
  });
  function orbResize(){ orbFit(document.querySelector('.hub-card.is-open')); }
  window.addEventListener('resize', orbResize);
  window.addEventListener('load', orbResize);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(orbResize);
  orbResize();

  /* ---- reveal ---- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:0.12, rootMargin:'0px 0px -60px 0px'});
  document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });

})();
