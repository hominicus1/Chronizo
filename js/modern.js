import {createLocation,getLocationPath,nearestParent,visibleAtZoom,LOCATION_LEVELS} from './locations.js?v=4.0.0-alpha.18';
const NS='http://www.w3.org/2000/svg',$=s=>document.querySelector(s);
const worlds=[
 {id:'earth-616',name:'Earth-616',color:'#7ef0bd',subtitle:'Główna rzeczywistość · 1943–2025'},
 {id:'earth-838',name:'Earth-838',color:'#a98aff',subtitle:'Świat Illuminati · odgałęzienie 2018',parent:'earth-616'},
 {id:'zombie',name:'Marvel Zombies',color:'#ff7272',subtitle:'Świat zakażenia · odgałęzienie 2023',parent:'earth-616'}
];
const geoToMap=(lon,lat)=>{
 const u=(lon+180)/360*1000,v=(90-lat)/180*500;
 return {x:250+.77*u-.14*v,mapY:620+.04*u+.36*v,lon,lat};
};
const at=(name,lon,lat,zone)=>({name,...geoToMap(lon,lat),zone});
const locations={
 newYork:at('Nowy Jork',-74.006,40.713,'Ameryka Północna'),
 arctic:at('Arktyka',0,80,'Arktyka'),
 sokovia:at('Sokovia',20,48,'Europa'),
 wakanda:at('Wakanda',35,-1,'Afryka'),
 kamarTaj:at('Kamar-Taj',85.324,27.717,'Azja'),
 space:{name:'Kosmos',x:1160,mapY:680,zone:'Poza Ziemią'},
 hell:{name:'Piekło',x:1290,mapY:775,zone:'Sfera metafizyczna'}
};
const locationCatalog=[
 createLocation({id:'earth',name:'Ziemia',type:'world',worldId:'earth-616',...geoToMap(0,0),minZoom:.3}),
 createLocation({id:'north-america',name:'Ameryka Północna',type:'continent',parentLocationId:'earth',...geoToMap(-105,50),minZoom:.5}),
 createLocation({id:'usa',name:'USA',type:'country',parentLocationId:'north-america',...geoToMap(-98.58,39.83)}),
 createLocation({id:'new-york',name:'Nowy Jork',type:'city',parentLocationId:'usa',...geoToMap(-74.006,40.713),minZoom:1}),
 createLocation({id:'queens',name:'Queens',type:'district',parentLocationId:'new-york',...geoToMap(-73.7949,40.7282)}),
 createLocation({id:'forest-hills',name:'Forest Hills',type:'district',parentLocationId:'queens',...geoToMap(-73.8448,40.7181),minZoom:8}),
 createLocation({id:'ingram-street',name:'Ingram Street',type:'street',parentLocationId:'forest-hills',...geoToMap(-73.8456,40.7153),minZoom:11}),
 createLocation({id:'parker-home',name:'Dom Parkerów',type:'building',parentLocationId:'ingram-street',...geoToMap(-73.8457,40.7152),minZoom:15}),
 createLocation({id:'sokovia',name:'Sokovia',type:'country',parentLocationId:'earth',...geoToMap(20,48),minZoom:1}),
 createLocation({id:'wakanda',name:'Wakanda',type:'country',parentLocationId:'earth',...geoToMap(35,-1),minZoom:1}),
 createLocation({id:'kamar-taj',name:'Kamar-Taj',type:'building',parentLocationId:'earth',...geoToMap(85.324,27.717),minZoom:2})
];
const X={ny:locations.newYork.x,sokovia:locations.sokovia.x,wakanda:locations.wakanda.x,kamarTaj:locations.kamarTaj.x};
const people={
 steve:{name:'Steve Rogers',hero:'Kapitan Ameryka',color:'#68b7ff',tags:['Steve Rogers','Kapitan Ameryka','Avengers'],points:[[X.ny,560],[X.ny,535],[X.ny,400],[X.ny,310],[X.ny,220],[X.ny,150]]},
 tony:{name:'Tony Stark',hero:'Iron Man',color:'#ff6f61',tags:['Tony Stark','Iron Man','Avengers'],points:[[X.ny,400],[X.sokovia,340],[X.wakanda,285],[X.ny,220]]},
 thor:{name:'Thor Odinson',hero:'Thor',color:'#efc46c',tags:['Thor Odinson','Thor','Avengers'],points:[[1160,570],[X.ny,400],[1160,330],[X.ny,220],[X.sokovia,150]]},
 wanda:{name:'Wanda Maximoff',hero:'Scarlet Witch',color:'#df78c8',tags:['Wanda Maximoff','Scarlet Witch','Avengers'],points:[[X.sokovia,350],[X.ny,220],[X.kamarTaj,180],[X.kamarTaj,150]]},
 claire:{name:'Claire Voyant',hero:'Black Widow',color:'#b58cff',tags:['Claire Voyant','Black Widow','Golden Age'],points:[[X.ny,560],[1290,570],[X.ny,535]]}
};
const mainEvents=[
 {title:'Narodziny Kapitana Ameryki',year:'1943',x:X.ny,y:560,mapY:locations.newYork.mapY,lat:locations.newYork.lat,lon:locations.newYork.lon,char:'steve',place:'Nowy Jork · Ameryka',source:'The First Avenger',tags:['Steve Rogers','Kapitan Ameryka','Origin']},
 {title:'Black Widow wraca z Piekła',year:'1944',x:X.ny,y:535,char:'claire',place:'Ziemia / Piekło',source:'Mystic Comics #4',tags:['Claire Voyant','Black Widow','Golden Age'],copy:'Piekło jest regionem metafizycznym należącym do tego świata — nie osobnym uniwersum.'},
 {title:'Bitwa o Nowy Jork',year:'2012',x:X.ny,y:400,mapY:locations.newYork.mapY,lat:locations.newYork.lat,lon:locations.newYork.lon,char:'steve',place:'Nowy Jork · Ameryka',source:'The Avengers',tags:['Avengers','Steve Rogers','Tony Stark','Thor'],copy:'Węzeł spotkania: linie uczestników schodzą się w jednym wydarzeniu.'},
 {title:'Ultron pokonany',year:'2015',x:X.sokovia,y:340,mapY:locations.sokovia.mapY,lat:locations.sokovia.lat,lon:locations.sokovia.lon,char:'tony',place:'Sokovia · Europa',source:'Age of Ultron',tags:['Avengers','Tony Stark','Wanda Maximoff']},
 {title:'Blip',year:'2018',x:X.wakanda,y:285,mapY:locations.wakanda.mapY,lat:locations.wakanda.lat,lon:locations.wakanda.lon,char:'tony',place:'Wakanda · Afryka',source:'Infinity War',tags:['Avengers','Infinity War','World Shift']},
 {title:'Ostateczna bitwa',year:'2023',x:X.ny,y:220,mapY:locations.newYork.mapY,lat:locations.newYork.lat,lon:locations.newYork.lon,char:'steve',place:'Avengers Compound · Ameryka',source:'Endgame',tags:['Avengers','Endgame','Tony Stark','Steve Rogers'],copy:'Globalne wydarzenie; półprzezroczysta płaszczyzna pokazuje nowy stan świata.'},
 {title:'Przejście do Earth-838',year:'2025',x:X.kamarTaj,y:150,mapY:locations.kamarTaj.mapY,lat:locations.kamarTaj.lat,lon:locations.kamarTaj.lon,char:'wanda',place:'Kamar-Taj',source:'Multiverse of Madness',tags:['Wanda Maximoff','Scarlet Witch','Multiverse'],target:'earth-838',copy:'Punkt ponad wydarzeniem oznacza przejście do innego świata. Kliknięcie otwiera jego historię.'}
];
const otherEvents={
 'earth-838':[{title:'Illuminati strzegą świata',year:'2018',x:620,y:315,place:'Nowy Jork · Earth-838',source:'Multiverse of Madness',tags:['Illuminati','Earth-838']},{title:'Wanda przybywa z Earth-616',year:'2025',x:620,y:146,place:'Siedziba Illuminati',source:'Multiverse of Madness',tags:['Wanda Maximoff','Multiverse'],target:'earth-616'}],
 zombie:[{title:'Początek zakażenia',year:'2023',x:620,y:260,place:'Nowy Jork',source:'Marvel Zombies',tags:['Zombies','World Shift']},{title:'Upadek bohaterów',year:'2024',x:390,y:205,place:'Ameryka',source:'Marvel Zombies',tags:['Zombies','Avengers']}]
};
let active='earth-616',tag='',query='',zoom=1,panX=0,panY=0,liftedY=null,customTexture='',placingLocation=false,selectedPlace=null;
const customLocations=[];
const pointers=new Map();
const svg=$('#story-map');
const el=(name,attrs={},text='')=>{const n=document.createElementNS(NS,name);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,v));if(text)n.textContent=text;return n};
const line=pts=>pts.reduce((d,p,i)=>{
 if(!i)return 'M'+p.join(' ');
 const prev=pts[i-1],dx=(p[0]-prev[0])*.42;
 return d+` C${prev[0]+dx} ${prev[1]} ${p[0]-dx} ${p[1]} ${p[0]} ${p[1]}`;
},'');
const labelStyle=(size,outline=2.2)=>`font-size:${size/zoom}px;stroke-width:${outline/zoom}px`;
const mapToGeo=(x,mapY)=>{
 const a=x-250,b=mapY-620,det=.2828,u=(.36*a+.14*b)/det,v=(-.04*a+.77*b)/det;
 return {lon:u/1000*360-180,lat:90-v/500*180};
};
function selectPlace(item){selectedPlace=Number.isFinite(item?.lat)&&Number.isFinite(item?.lon)?item:null;updatePlaceMapButton()}
function updatePlaceMapButton(){const button=$('#btn-place-map');if(!button)return;button.disabled=!(selectedPlace&&zoom>=4);button.title=!selectedPlace?'Najpierw wybierz wydarzenie lub lokalizację':zoom<4?'Przybliż mapę co najmniej 4×':'Pokaż dokładną mapę '+(selectedPlace.title||selectedPlace.name||selectedPlace.place||'miejsca')}
function append(parent,...nodes){nodes.forEach(n=>parent.append(n));}

function tabs(){const nav=$('#world-tabs');nav.innerHTML='';worlds.forEach(w=>{const b=document.createElement('button');b.className='world-tab'+(w.id===active?' active':'');b.innerHTML='<i style="background:'+w.color+'"></i>'+w.name;b.onclick=()=>switchWorld(w.id);nav.append(b)});const b=document.createElement('button');b.className='world-tab world-more';b.textContent='Wszystkie światy ▾';nav.append(b)}
function switchWorld(id){active=id;tag='';query='';selectedPlace=null;$('#search').value='';const w=worlds.find(x=>x.id===id);$('#world-title').textContent=w.name;$('#world-subtitle').textContent=w.subtitle;tabs();tags();render();show({title:w.name,copy:w.parent?'Świat potomny dziedziczy historię do punktu rozgałęzienia.':'Główne drzewo aktywnej rzeczywistości.',place:w.subtitle,tags:[w.name]},'ŚWIAT')}
function matches(item){const hay=[item.title,item.name,item.hero,item.place,...(item.tags||[])].filter(Boolean).join(' ').toLowerCase();return(!tag||(item.tags||[]).includes(tag))&&(!query||hay.includes(query.toLowerCase()))}

function base(g){
 const defs=el('defs'),marker=el('marker',{id:'arrow-muted',viewBox:'0 0 10 10',refX:8,refY:5,markerWidth:5,markerHeight:5,orient:'auto-start-reverse'});marker.append(el('path',{d:'M0 0L10 5L0 10z',fill:'var(--muted)'}));defs.append(marker);g.append(defs);
 [[1943,560],[1945,535],[2012,400],[2015,340],[2018,285],[2023,220],[2025,150]].forEach(([year,y])=>append(g,el('line',{x1:82,y1:y,x2:1360,y2:y,class:'time-line'}),el('text',{x:28,y:y+4,class:'map-year'},year)));
 g.append(el('text',{x:24,y:92,class:'location-label'},'CZAS ↑'));
 const realm=el('g');append(realm,el('rect',{x:1110,y:610,width:270,height:205,rx:30,class:'realm-plane'}),el('text',{x:1140,y:645,class:'location-label'},'POZA ZIEMIĄ · '+active.toUpperCase()),el('text',{x:1140,y:680,class:'map-note'},'KOSMOS'),el('text',{x:1260,y:775,class:'map-note'},'PIEKŁO'));g.append(realm);
 const p=el('g',{id:'earth-map-plane',class:liftedY===null?'':'map-lifted',transform:liftedY===null?'':`translate(0 ${liftedY})`});
 const mapCorners='250,620 1020,660 950,840 180,800';
 append(p,el('polygon',{points:mapCorners,class:'iso-side',transform:'translate(0 18)'}),el('polygon',{points:mapCorners,class:'earth-plane'}));
 const clip=el('clipPath',{id:'map-clip'});clip.append(el('polygon',{points:mapCorners}));g.querySelector('defs').append(clip);
 p.append(el('image',{href:customTexture||'assets/world-map.svg?v=4.0.0-alpha.18',x:0,y:0,width:1000,height:500,transform:'matrix(.77 .04 -.14 .36 250 620)',class:'map-texture'}));
 g.append(p);
 [...locationCatalog,...customLocations].filter(l=>l.worldId===active&&visibleAtZoom(l,zoom)).forEach(l=>{const pin=el('g',{class:'map-pin','data-level':l.type});append(pin,el('circle',{cx:l.x,cy:l.mapY,r:Math.max(1.4,4/zoom)}),el('text',{x:l.x+9/zoom,y:l.mapY-6/zoom,style:labelStyle(13)},l.name));pin.onclick=ev=>{ev.stopPropagation();selectPlace(l);const catalog=[...locationCatalog,...customLocations];show({title:l.name,place:getLocationPath(l,catalog),tags:['Lokalizacja',LOCATION_LEVELS.find(x=>x.id===l.type)?.label||l.type],copy:'Poziom szczegółowości: '+l.type+'. Widoczna od powiększenia '+l.minZoom+'×.'},'LOKALIZACJA')};p.append(pin)});
 [locations.newYork,locations.sokovia,locations.wakanda,locations.kamarTaj].forEach(a=>g.insertBefore(el('line',{x1:a.x,y1:a.mapY,x2:a.x,y2:120,class:'anchor-pillar'}),g.firstChild));
 if(active==='earth-616'){const s=el('g');append(s,el('polygon',{points:'250,185 1020,205 950,310 180,290',class:'shift-side',transform:'translate(0 8)'}),el('polygon',{points:'250,185 1020,205 950,310 180,290',class:'shift-plane'}),el('text',{x:820,y:232,class:'shift-title'},'WORLD SHIFT · 2023'),el('text',{x:820,y:249,class:'map-note'},'nowa wersja mapy tego świata'));s.onclick=()=>show({title:'World Shift: świat po Blipie',year:'2023',place:'Earth-616',source:'Avengers: Endgame',tags:['World Shift','Mapa v2'],copy:'Nowa półprzezroczysta płaszczyzna mapy. Stary stan świata pozostaje widoczny poniżej.'},'WORLD SHIFT');g.append(s)}
}
function main(g){
 Object.values(people).forEach(c=>{const d=line(c.points),filtering=Boolean(tag||query),selected=filtering&&matches(c),state=filtering?(selected?'focused':'muted'):'';append(g,el('path',{d,class:'thread '+state,stroke:selected?c.color:'#62d7a3'}),(()=>{const n=el('path',{d,class:'thread-hit'});n.onclick=()=>show({title:c.name,copy:c.hero+' · ścieżka postaci przez miejsca i wydarzenia.',tags:c.tags,place:'Kliknij hashtag, aby odfiltrować drzewo.'},'POSTAĆ');return n})());const [x,y]=c.points.at(-1);g.append(el('text',{x:x+12/zoom,y:y-9/zoom,class:'person-label',style:labelStyle(13),fill:selected?c.color:'#62d7a3'},c.name))});
 const travel=el('g',{class:'world-jump'});append(travel,el('line',{x1:X.kamarTaj,y1:140,x2:X.kamarTaj,y2:120}),el('circle',{cx:X.kamarTaj,cy:113,r:7}),el('text',{x:X.kamarTaj+14,y:117},'Earth-838'));travel.onclick=()=>switchWorld('earth-838');g.append(travel);
 const mention=el('path',{d:`M${X.sokovia+120} 315C${X.sokovia+70} 345 ${X.ny+60} 375 ${X.ny} 400`,class:'mentioned-line'});mention.onclick=()=>show({title:'Tajne spotkanie',year:'2012',place:'Europa',source:'Wspomniane w 2017',tags:['Mentioned','Retrospekcja'],copy:'Cienka linia cofa się od momentu ujawnienia do czasu rzeczywistego wydarzenia.'},'WYDARZENIE WSPOMNIANE');g.append(mention);
 mainEvents.forEach(e=>event(g,e));const b=el('g',{class:'branch-node'}),bx=X.wakanda,by=285;append(b,el('polygon',{points:`${bx-10},${by} ${bx},${by-10} ${bx+10},${by} ${bx},${by+10}`}),el('text',{x:bx+18,y:by+4,style:labelStyle(12)},'odgałęzienie: Marvel Zombies'));b.onclick=()=>switchWorld('zombie');g.append(b)
}
function other(g){const w=worlds.find(x=>x.id===active),x=active==='earth-838'?620:390;g.append(el('path',{d:`M${x} 760C${x-30} 600 ${x+40} 410 ${x} 146`,class:'thread'+(tag||query?' focused':''),stroke:w.color}));otherEvents[active].forEach(e=>event(g,e));const b=el('g',{class:'branch-node'});append(b,el('polygon',{points:'110,112 120,102 130,112 120,122'}),el('text',{x:140,y:116},'powrót do Earth-616'));b.onclick=()=>switchWorld('earth-616');g.append(b)}
function liftMapTo(event){liftedY=event.y-(Number.isFinite(event.mapY)?event.mapY:730);const map=$('#earth-map-plane');if(!map)return;map.classList.add('map-lifted');map.setAttribute('transform',`translate(0 ${liftedY})`);map.dataset.liftedTo=String(event.y)}
function event(g,e){const color=e.char?people[e.char].color:worlds.find(w=>w.id===active).color,n=el('g',{class:'event-node event-group '+(matches(e)?'':'muted'),style:'color:'+color});append(n,el('circle',{cx:e.x,cy:e.y,r:Math.max(1.7,5/zoom)}),el('text',{x:e.x+12/zoom,y:e.y-8/zoom,style:labelStyle(14,2.4)},e.title));n.onclick=()=>{selectPlace(e);show(e,e.target?'PRZEJŚCIE MIĘDZY ŚWIATAMI':'WYDARZENIE');liftMapTo(e)};g.append(n)}
function sceneTransform(){return `translate(${panX} ${panY}) translate(720 450) scale(${zoom}) translate(-720 -450)`}
function render(){svg.innerHTML='';const g=el('g',{transform:sceneTransform()});svg.append(g);base(g);active==='earth-616'?main(g):other(g);updatePlaceMapButton()}
function tags(){const items=active==='earth-616'?Object.values(people):otherEvents[active],all=[...new Set(items.flatMap(x=>x.tags||[]))];const box=$('#tag-filters');box.innerHTML='';all.slice(0,9).forEach(t=>{const b=document.createElement('button');b.className='tag-chip'+(tag===t?' active':'');b.textContent='#'+t.replaceAll(' ','');b.onclick=()=>{tag=tag===t?'':t;tags();render();$('#btn-clear-filter').hidden=!tag&&!query};box.append(b)})}
function show(item,kicker='WYDARZENIE'){$('#inspector').classList.remove('hidden');$('#inspector-kicker').textContent=kicker;$('#inspector-title').textContent=item.title||item.name;$('#inspector-copy').textContent=item.copy||'Element aktualnie oglądanej historii.';$('#inspector-meta').innerHTML=[['Czas',item.year],['Miejsce',item.place],['Źródło',item.source]].filter(x=>x[1]).map(([a,b])=>'<dt>'+a+'</dt><dd>'+b+'</dd>').join('');$('#inspector-tags').innerHTML=(item.tags||[]).map(t=>'<span>#'+t.replaceAll(' ','')+'</span>').join('');const a=$('#inspector-action');if(item.target){const w=worlds.find(x=>x.id===item.target);a.hidden=false;a.textContent='Przejdź do '+w.name;a.onclick=()=>switchWorld(w.id)}else a.hidden=true}
function pointerPosition(e){const r=svg.getBoundingClientRect();return{x:(e.clientX-r.left)*1440/r.width,y:(e.clientY-r.top)*900/r.height}}
function setZoom(next,cx=720,cy=450){next=Math.max(.3,Math.min(20,next));const ratio=next/zoom;panX=cx-720-(cx-720-panX)*ratio;panY=cy-450-(cy-450-panY)*ratio;zoom=next;render()}
svg.addEventListener('wheel',e=>{e.preventDefault();const p=pointerPosition(e);setZoom(zoom*(e.deltaY<0?1.28:.78),p.x,p.y)},{passive:false});
svg.addEventListener('pointerdown',e=>{if(placingLocation||e.target.closest?.('.event-node,.world-jump,.branch-node,.map-pin'))return;svg.setPointerCapture(e.pointerId);pointers.set(e.pointerId,pointerPosition(e));svg.classList.add('is-panning')});
svg.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId)||placingLocation)return;const now=pointerPosition(e),old=pointers.get(e.pointerId);if(pointers.size===1){panX+=now.x-old.x;panY+=now.y-old.y;render()}else{const other=[...pointers.entries()].find(([id])=>id!==e.pointerId)?.[1];if(other){const before=Math.hypot(old.x-other.x,old.y-other.y),after=Math.hypot(now.x-other.x,now.y-other.y);if(before>4)setZoom(zoom*after/before,(now.x+other.x)/2,(now.y+other.y)/2)}}pointers.set(e.pointerId,now)});
['pointerup','pointercancel'].forEach(type=>svg.addEventListener(type,e=>{pointers.delete(e.pointerId);if(!pointers.size)svg.classList.remove('is-panning')}));
$('#search').oninput=e=>{query=e.target.value.trim();$('#btn-clear-filter').hidden=!query&&!tag;render()};$('#btn-clear-filter').onclick=()=>{query='';tag='';$('#search').value='';tags();render();$('#btn-clear-filter').hidden=true};$('#btn-theme').onclick=()=>document.body.classList.toggle('light');$('#btn-add').onclick=()=>$('#add-dialog').showModal();$('#btn-fit').onclick=()=>{zoom=1;render()};$('#zoom-in').onclick=()=>setZoom(zoom*1.5);$('#zoom-out').onclick=()=>setZoom(zoom/1.5);$('#btn-play').onclick=()=>[...svg.querySelectorAll('.event-node circle')].forEach((n,i)=>setTimeout(()=>n.animate([{r:7},{r:15},{r:7}],{duration:650}),i*350));$('#inspector-close').onclick=()=>$('#inspector').classList.add('hidden');$('#btn-help').onclick=()=>show({title:'Jak czytać Chronizo?',copy:'Czas rośnie ku górze. Położenie linii odpowiada miejscu. Kolorowy romb otwiera inny świat. Obszary obok mapy należą do aktywnej rzeczywistości.',tags:['Mapa','Czas','Światy']},'POMOC');
$('#map-texture-input').onchange=e=>{const file=e.target.files?.[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{customTexture=reader.result;render();show({title:'Własna tekstura mapy',copy:'Obraz został nałożony na izometryczną płaszczyznę. W prototypie pozostaje tylko w bieżącej sesji.',tags:['Tekstura','Mapa']},'MAPA')};reader.readAsDataURL(file)};
$('#btn-place-map').onclick=()=>{if(!selectedPlace)return;const detailed=['street','building','room'].includes(selectedPlace.type),span=detailed ? .012 : .05,{lat,lon}=selectedPlace,bbox=[lon-span,lat-span,lon+span,lat+span].join(',');$('#place-map-title').textContent=selectedPlace.title||selectedPlace.name||selectedPlace.place||'Mapa miejsca';$('#place-map-frame').src=`https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(lat+','+lon)}`;$('#place-map-dialog').showModal()};
$('#add-dialog').addEventListener('close',()=>{if($('#add-dialog').returnValue!=='location')return;placingLocation=true;$('#map-wrap').classList.add('location-mode');const note=document.createElement('div');note.id='location-mode-banner';note.className='location-mode-banner';note.textContent='Kliknij miejsce na mapie · Esc anuluje';$('#map-wrap').append(note)});
svg.addEventListener('click',e=>{if(!placingLocation)return;const pt=svg.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;const local=pt.matrixTransform(svg.getScreenCTM().inverse()),geo=mapToGeo(local.x,local.y);const name=prompt('Nazwa lokalizacji:');const allowed=LOCATION_LEVELS.map(x=>x.id).join(', ');const requested=prompt('Poziom lokalizacji: '+allowed,'city')||'city';const type=LOCATION_LEVELS.some(x=>x.id===requested)?requested:'city';placingLocation=false;$('#map-wrap').classList.remove('location-mode');$('#location-mode-banner')?.remove();if(!name?.trim())return;const catalog=[...locationCatalog,...customLocations],parent=nearestParent(catalog,local.x,local.y,type,active);const location=createLocation({name:name.trim(),type,parentLocationId:parent?.id||null,worldId:active,x:Math.round(local.x),mapY:Math.round(local.y),...geo,custom:true});customLocations.push(location);selectPlace(location);render();show({title:location.name,place:getLocationPath(location,[...catalog,location]),tags:['Lokalizacja',type],copy:'Dodano jako '+type+(parent?' wewnątrz '+parent.name:'.')},'LOKALIZACJA')});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&placingLocation){placingLocation=false;$('#map-wrap').classList.remove('location-mode');$('#location-mode-banner')?.remove()}});
$('#btn-fit').onclick=()=>{zoom=1;panX=0;panY=0;liftedY=null;render()};
document.querySelectorAll('.rail-button[data-view]').forEach(b=>b.onclick=()=>{document.querySelectorAll('.rail-button').forEach(x=>x.classList.remove('active'));b.classList.add('active');if(b.dataset.view!=='world')show({title:b.textContent.trim(),copy:'Ten widok wykorzysta ten sam model danych. W pierwszym prototypie dopracowujemy mapę świata.',tags:['Prototyp']},'WIDOK W PRZYGOTOWANIU')});
tabs();tags();render();
