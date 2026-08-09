const menu=document.querySelector('.menu-btn');const nav=document.querySelector('.nav');menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.style.display=open?'none':'flex';nav.style.position='absolute';nav.style.top='64px';nav.style.left='0';nav.style.right='0';nav.style.padding='20px 6vw';nav.style.background='#f4f2ed';nav.style.flexDirection='column';nav.style.gap='16px'});document.getElementById('year').textContent=new Date().getFullYear();

const newProjects=[
 ['Cultur Cinter — Redesign Marlowe','Cultural / Architectural Redesign','projects/cultur-cinter-redesign-marlowe.html','07'],
 ['Dammam School','Educational / Architecture','projects/dammam-school.html','08'],
 ['Dr. Sarah Villa','Residential / Villa','projects/dr-sarah-villa.html','09'],
 ['NEOM Sports Village','Sports / Masterplanning','projects/neom-sports-village.html','10'],
 ['Red Sea — Turtle Bay','Red Sea / Substructure','projects/red-sea-turtle-bay.html','11'],
 ['Zain','Industrial / Architectural BIM','projects/scitra-industries-zain.html','12']
];
const grid=document.querySelector('.project-grid');
if(grid&&!grid.dataset.newProjects){newProjects.forEach(([title,type,href,num],i)=>{const a=document.createElement('article');a.className='project';a.innerHTML=`<a href="${href}"><div class="project-image image-0${(i%6)+1}"><span>${num}</span></div><div class="project-meta"><div><h3>${title}</h3><p>${type}</p></div><span>↗</span></div></a>`;grid.appendChild(a)});grid.dataset.newProjects='true'}