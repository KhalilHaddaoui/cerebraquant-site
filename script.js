
(function(){
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if(navToggle && nav){
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  document.querySelectorAll('.reveal, .pillar, .show-card, .info-card, .course-card, .contact-option, .track-card').forEach(el => {
    if(!el.classList.contains('reveal')) el.classList.add('reveal');
  });
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!prefersReduced && 'IntersectionObserver' in window){
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); io.unobserve(entry.target);} });
    }, {threshold:0.12});
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  const waveGroups = document.querySelectorAll('#waveLines');
  waveGroups.forEach(group => {
    if(group.childNodes.length) return;
    const ns = 'http://www.w3.org/2000/svg';
    const total = 17;
    const width = 660;
    const baseY = 120;
    for(let i=0;i<total;i++){
      const y = baseY + i*18;
      const amp = 28 + i*1.8;
      const path = document.createElementNS(ns,'path');
      let d = `M 0 ${y}`;
      for(let x=0;x<=width;x+=55){
        const phase = i*0.55;
        const yy = y + Math.sin((x/width)*Math.PI*3 + phase)*amp;
        d += ` L ${x} ${yy.toFixed(2)}`;
      }
      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'url(#waves)');
      path.setAttribute('stroke-opacity', (0.18 + i*0.026).toFixed(2));
      path.setAttribute('stroke-width', i % 4 === 0 ? '2' : '1.35');
      group.appendChild(path);
    }
  });

  const filters = document.querySelectorAll('.filter-row .filter');
  if(filters.length){
    const cards = Array.from(document.querySelectorAll('.course-card'));
    filters.forEach(btn => btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const val = btn.getAttribute('data-filter');
      cards.forEach(card => {
        const tag = card.getAttribute('data-track') || 'all';
        card.hidden = !(val === 'all' || tag === val);
      });
    }));
  }
})();
