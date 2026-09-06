const body=document.body,opening=document.getElementById('opening'),enter=document.getElementById('enter'),menu=document.querySelector('.menu'),nav=document.querySelector('.topbar nav');
if(window.lucide)window.lucide.createIcons();
function setMenuIcon(name){menu.innerHTML=`<i data-lucide="${name}" aria-hidden="true"></i>`;if(window.lucide)window.lucide.createIcons()}
function revealHero(){document.querySelectorAll('.hero .anim').forEach(el=>el.classList.add('visible'))}
enter.addEventListener('click',()=>{opening.classList.add('leave');body.classList.remove('locked');setTimeout(revealHero,450);setTimeout(()=>opening.remove(),1500)});
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));menu.setAttribute('aria-label',open?'Open navigation':'Close navigation');setMenuIcon(open?'menu':'x');nav.classList.toggle('open',!open);body.classList.toggle('locked',!open)});
nav.addEventListener('click',event=>{if(!event.target.matches('a'))return;menu.setAttribute('aria-expanded','false');setMenuIcon('menu');nav.classList.remove('open');body.classList.remove('locked')});
const target=new Date('2026-12-19T10:00:00+02:00').getTime();function countdown(){const left=Math.max(0,target-Date.now()),values=[Math.floor(left/864e5),Math.floor(left/36e5)%24,Math.floor(left/6e4)%60,Math.floor(left/1e3)%60];['days','hours','minutes','seconds'].forEach((id,i)=>document.getElementById(id).textContent=String(values[i]).padStart(i?2:3,'0'))}countdown();setInterval(countdown,1000);
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.14});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const progress=document.querySelector('.progress span');let ticking=false;function onScroll(){if(ticking)return;ticking=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max?scrollY/max*100:0}%`;ticking=false})}addEventListener('scroll',onScroll,{passive:true});onScroll();

// Image layers provide the fixed-background look consistently on mobile browsers.
const quotePhoto=document.querySelector('.quote>img');
const rsvpSection=document.querySelector('.rsvp');
const rsvpPhoto=document.createElement('img');
rsvpPhoto.src='assets/img/_MG_0181.webp';rsvpPhoto.alt='';rsvpPhoto.loading='lazy';rsvpPhoto.setAttribute('aria-hidden','true');rsvpSection.prepend(rsvpPhoto);
const fixedPhotos=[quotePhoto,rsvpPhoto];fixedPhotos.forEach(photo=>photo.classList.add('fixed-bg-photo'));
function positionFixedPhotos(){fixedPhotos.forEach(photo=>{const section=photo.parentElement,rect=section.getBoundingClientRect();if(rect.bottom<0||rect.top>innerHeight)return;const travel=(innerHeight-rect.top)/(innerHeight+rect.height);photo.style.transform=`translate3d(0,${(travel-.5)*16}%,0) scale(1.04)`})}
addEventListener('scroll',positionFixedPhotos,{passive:true});addEventListener('resize',positionFixedPhotos,{passive:true});positionFixedPhotos();

// Subtle depth motion for editorial imagery and decorative details.
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const parallaxItems=reduceMotion?[]:[
  {element:document.querySelector('.hero-photo'),speed:-18},
  {element:document.querySelector('.sun'),speed:10},
  {element:document.querySelector('.photo-back'),speed:-16},
  {element:document.querySelector('.photo-front'),speed:12},
  ...Array.from(document.querySelectorAll('.event-image img')).map((element,index)=>({element,speed:index%2?-14:14})),
  ...Array.from(document.querySelectorAll('.look-orb')).map((element,index)=>({element,speed:index%2?9:-9}))
].filter(item=>item.element);
function updateParallax(){parallaxItems.forEach(({element,speed})=>{const host=element.closest('section')||element,rect=host.getBoundingClientRect();if(rect.bottom<0||rect.top>innerHeight)return;const center=rect.top+rect.height/2-innerHeight/2;const offset=Math.max(-1,Math.min(1,center/innerHeight))*speed;element.style.setProperty('--parallax-y',`${offset}px`)})}
let parallaxTicking=false;function requestParallax(){if(parallaxTicking)return;parallaxTicking=true;requestAnimationFrame(()=>{updateParallax();parallaxTicking=false})}
if(!reduceMotion){addEventListener('scroll',requestParallax,{passive:true});addEventListener('resize',requestParallax,{passive:true});updateParallax()}

// Stagger related content as each composition enters the viewport.
document.querySelectorAll('.event-copy,.look,.party-title,.contacts article').forEach(group=>{
  Array.from(group.children).forEach((child,index)=>{child.style.setProperty('--stagger',`${Math.min(index*75,300)}ms`);child.classList.add('stagger-item')});
});

// The invitation remains fully usable when the decorative 3D library is unavailable.
const threeLoader=document.createElement('script');threeLoader.src='https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';threeLoader.defer=true;threeLoader.onload=()=>{initThreeScene();initSectionScenes()};document.head.appendChild(threeLoader);
function initThreeScene(){
  if(!window.THREE||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const hero=document.querySelector('.hero'),canvas=document.createElement('canvas');canvas.className='three-scene';canvas.setAttribute('aria-hidden','true');hero.prepend(canvas);
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(42,hero.clientWidth/hero.clientHeight,.1,100);camera.position.z=8;
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<760?1.35:1.8));renderer.setSize(hero.clientWidth,hero.clientHeight,false);renderer.outputColorSpace=THREE.SRGBColorSpace;
  const group=new THREE.Group();scene.add(group);const gold=new THREE.MeshBasicMaterial({color:0xc8a76a,transparent:true,opacity:.36,wireframe:true});
  const ring=new THREE.Mesh(new THREE.TorusKnotGeometry(1.8,.018,150,12,2,3),gold);ring.position.set(innerWidth<760?1.25:2.9,.5,-.6);ring.rotation.x=.8;group.add(ring);
  const halo=new THREE.Mesh(new THREE.TorusGeometry(2.55,.012,8,160),new THREE.MeshBasicMaterial({color:0xe5c98d,transparent:true,opacity:.17,wireframe:true}));halo.position.set(innerWidth<760?-1.2:-3.2,-1.5,-1.2);halo.rotation.set(1.1,.4,.2);group.add(halo);
  const count=innerWidth<760?420:750,positions=new Float32Array(count*3);for(let i=0;i<count;i++){const radius=2+Math.random()*6,angle=Math.random()*Math.PI*2;positions[i*3]=Math.cos(angle)*radius;positions[i*3+1]=(Math.random()-.5)*9;positions[i*3+2]=Math.sin(angle)*radius-2}
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));const particles=new THREE.Points(geometry,new THREE.PointsMaterial({color:0xe6c989,size:.025,transparent:true,opacity:.62,sizeAttenuation:true}));group.add(particles);
  const pointer={x:0,y:0};hero.addEventListener('pointermove',event=>{pointer.x=(event.clientX/innerWidth-.5)*.38;pointer.y=(event.clientY/innerHeight-.5)*.25},{passive:true});
  let visible=true;new IntersectionObserver(([entry])=>{visible=entry.isIntersecting}).observe(hero);const clock=new THREE.Clock();
  function render(){requestAnimationFrame(render);if(!visible||document.hidden)return;const elapsed=clock.getElapsedTime();ring.rotation.y=elapsed*.09+pointer.x;ring.rotation.z=elapsed*.045;halo.rotation.z=-elapsed*.035;particles.rotation.y=elapsed*.012;group.rotation.x+=(pointer.y-group.rotation.x)*.025;group.position.y=-Math.min(scrollY/Math.max(hero.clientHeight,1),1)*.8;renderer.render(scene,camera)}render();
  addEventListener('resize',()=>{camera.aspect=hero.clientWidth/hero.clientHeight;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<760?1.35:1.8));renderer.setSize(hero.clientWidth,hero.clientHeight,false)},{passive:true});
}

function initSectionScenes(){
  if(!window.THREE||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const configurations=[
    {selector:'.save-date',color:0xe4c98e,shape:'rings',count:120},
    {selector:'.wedding-party',color:0xb89558,shape:'petals',count:150},
    {selector:'.rsvp',color:0xdabf83,shape:'rings',count:100}
  ];
  const scenes=[];
  configurations.forEach((config,index)=>{
    const section=document.querySelector(config.selector);if(!section)return;
    const canvas=document.createElement('canvas');canvas.className=`three-accent three-accent-${index+1}`;canvas.setAttribute('aria-hidden','true');section.prepend(canvas);
    const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(45,section.clientWidth/section.clientHeight,.1,50);camera.position.z=7;
    const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:false,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<760?1:1.4));renderer.setSize(section.clientWidth,section.clientHeight,false);
    const group=new THREE.Group();scene.add(group);const positions=new Float32Array(config.count*3);
    for(let i=0;i<config.count;i++){positions[i*3]=(Math.random()-.5)*11;positions[i*3+1]=(Math.random()-.5)*9;positions[i*3+2]=(Math.random()-.5)*5}
    const dustGeometry=new THREE.BufferGeometry();dustGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3));group.add(new THREE.Points(dustGeometry,new THREE.PointsMaterial({color:config.color,size:config.shape==='petals'?.045:.026,transparent:true,opacity:config.shape==='petals'?.34:.48})));
    const material=new THREE.MeshBasicMaterial({color:config.color,transparent:true,opacity:config.shape==='petals'?.16:.2,wireframe:true});
    if(config.shape==='rings'){
      for(let i=0;i<3;i++){const mesh=new THREE.Mesh(new THREE.TorusGeometry(1.25+i*.55,.012,6,110),material);mesh.position.set(index?2.3:-2.4,(i-1)*.7,-1-i*.3);mesh.rotation.set(.8+i*.25,.35,i*.45);group.add(mesh)}
    }else{
      for(let i=0;i<8;i++){const mesh=new THREE.Mesh(new THREE.OctahedronGeometry(.12+Math.random()*.14,0),material);mesh.position.set((Math.random()-.5)*8,(Math.random()-.5)*7,(Math.random()-.5)*3);mesh.rotation.set(Math.random()*3,Math.random()*3,0);group.add(mesh)}
    }
    const data={section,renderer,scene,camera,group,visible:false,index};scenes.push(data);new IntersectionObserver(([entry])=>{data.visible=entry.isIntersecting},{rootMargin:'15% 0px'}).observe(section);
  });
  const clock=new THREE.Clock();function animateAccents(){requestAnimationFrame(animateAccents);if(document.hidden)return;const elapsed=clock.getElapsedTime();scenes.forEach(data=>{if(!data.visible)return;data.group.rotation.y=elapsed*(data.index%2?-.035:.035);data.group.rotation.z=Math.sin(elapsed*.18+data.index)*.04;data.group.position.y=Math.sin(elapsed*.35+data.index)*.12;data.renderer.render(data.scene,data.camera)})}animateAccents();
  addEventListener('resize',()=>scenes.forEach(data=>{data.camera.aspect=data.section.clientWidth/data.section.clientHeight;data.camera.updateProjectionMatrix();data.renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<760?1:1.4));data.renderer.setSize(data.section.clientWidth,data.section.clientHeight,false)}),{passive:true});
}
