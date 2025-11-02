document.addEventListener('DOMContentLoaded', () => {
  // ==================
  // Mobile nav toggle
  // ==================
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');

  if (btn && nav) {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      nav.style.display = expanded ? '' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.right = '20px';
      nav.style.top = '72px';
      nav.style.background = 'white';
      nav.style.padding = '12px';
      nav.style.borderRadius = '10px';
      nav.style.boxShadow = '0 8px 30px rgba(32,24,60,0.08)';
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header-inner')) {
        if (getComputedStyle(nav).display === 'flex' && window.innerWidth <= 900) {
          nav.style.display = 'none';
          btn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  // ==================
  // Star background
  // ==================
  const starsContainer = document.getElementById('stars');
  if(starsContainer){
    const starImages = ['img/star 1.svg', 'img/star 2.svg', 'img/star 3.svg'];
    const numStars = 60;
    const spacing = 60;
    const placedStars = [];

    function checkOverlap(x, y) {
      for (let star of placedStars) {
        const dx = star.x - x;
        const dy = star.y - y;
        if (Math.sqrt(dx*dx + dy*dy) < spacing) return true;
      }
      return false;
    }

    for(let i=0;i<numStars;i++){
      const star = document.createElement('img');
      star.src = starImages[Math.floor(Math.random()*starImages.length)];
      star.classList.add('star');
      const sizeClass = ['small','medium','large'][Math.floor(Math.random()*3)];
      star.classList.add(sizeClass);

      let x,y, tries=0;
      do {
        x = Math.random()*100;
        y = Math.random()*100;
        tries++;
      } while(checkOverlap(x*window.innerWidth/100, y*window.innerHeight/100) && tries<100);

      placedStars.push({x:x*window.innerWidth/100,y:y*window.innerHeight/100});
      star.style.top = y+'vh';
      star.style.left = x+'vw';
      star.style.transform = `rotate(${Math.random()*60-30}deg)`;
      star.style.animationDelay = (Math.random()*5)+'s';
      starsContainer.appendChild(star);
    }
  }

  // ==================
  // Collapsible project case
  // ==================
  document.querySelectorAll('.toggle-case').forEach(button => {
    button.addEventListener('click', () => {
      const caseContent = button.nextElementSibling;

      if(!caseContent.classList.contains('open')){
        caseContent.classList.add('open');
        const scrollHeight = caseContent.scrollHeight;
        caseContent.style.maxHeight = scrollHeight+'px';
        button.textContent = 'Sluit Werk';
      } else {
        caseContent.style.maxHeight = caseContent.scrollHeight+'px';
        setTimeout(()=>{ caseContent.style.maxHeight='0'; }, 10);
        caseContent.classList.remove('open');
        button.textContent = 'Bekijk Werk';
      }
    });
  });

  // ==================
  // Highlight project from index click
  // ==================
  if(location.hash){
    const projectId = location.hash.substring(1); // zonder #
    const projectCard = document.getElementById(projectId);
    if(projectCard){
      projectCard.classList.add('highlighted-purple');
      projectCard.scrollIntoView({behavior:'smooth', block:'center'});
    }
  }

  // ==================
  // Index to Projects link handling
  // ==================
  document.querySelectorAll('.cards a.btn').forEach(link=>{
    link.addEventListener('click', e=>{
      const href = link.getAttribute('href');
      const hashIndex = href.indexOf('#');
      if(hashIndex!==-1){
        localStorage.setItem('highlightProject', href.substring(hashIndex+1));
      }
    });
  });

  // Load highlight from localStorage if exists
  const highlightProject = localStorage.getItem('highlightProject');
  if(highlightProject){
    const projectCard = document.getElementById(highlightProject);
    if(projectCard){
      projectCard.classList.add('highlighted-purple');
      projectCard.scrollIntoView({behavior:'smooth', block:'center'});
    }
    localStorage.removeItem('highlightProject');
  }

});
