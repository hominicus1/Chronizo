import fs from 'node:fs';

const read=path=>JSON.parse(fs.readFileSync(path,'utf8'));
const extended=read('data/extended-vo.sources.json');
const multiversal=read('data/multiversal-vo.sources.json');
const comics=read('data/movie-comics.sources.json');
const games=read('data/marvel-games.sources.json');
const metadata=read('data/source-metadata.json');
const strict=read('data/strict-vo.sources.json');
const normalize=value=>String(value||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[’‘]/g,"'").replace(/[–—]/g,'-').replace(/\s+/g,' ').trim();
const universeLabels=value=>String(value||'').split('/').map(part=>part.trim()).filter(Boolean).map(part=>part==='FW'?'Framework':/^\d+[✩★]?$/.test(part)?`Earth-${part}`:part);
const worldId=label=>`world-${normalize(label).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}`;
const worldDescriptions=new Map((metadata.universes||[]).map(item=>[normalize(String(item.designation).replace(/^Earth-/,'')),item.description]));
const releaseMap=new Map();
for(const item of metadata.releases||[])if(!releaseMap.has(normalize(item.title)))releaseMap.set(normalize(item.title),item);
const releaseIso=value=>{const months={jan:'01',feb:'02',mar:'03',apr:'04',may:'05',jun:'06',jul:'07',aug:'08',sep:'09',oct:'10',nov:'11',dec:'12'},match=String(value||'').match(/^([A-Za-z]{3}) (\d{1,2}), (\d{4})$/);return match?`${match[3]}-${months[match[1].toLowerCase()]}-${match[2].padStart(2,'0')}`:''};

const worlds=new Map(),sources=[],byImport=new Map(),byIdentity=new Map();
const ensureWorld=label=>{const id=worldId(label);if(!worlds.has(id)){const key=normalize(label).replace(/^earth-/,'');worlds.set(id,{id,designation:label,name:label,description:worldDescriptions.get(key)||'Katalog Road to Doomsday'});}return id;};
const identity=(item,labels)=>[normalize(item.title),normalize(item.date),labels.map(normalize).sort().join('/')].join('|');

for(const [pack,tag] of [[multiversal,'MVO'],[extended,'EMCU']])for(const packed of pack.sources){
  const labels=universeLabels(packed.universe),key=identity(packed,labels),existing=byImport.get(packed.importKey)||byIdentity.get(key),order=Number(packed.orderRow??packed.row);
  if(existing){existing.tags=[...new Set([...existing.tags,...(packed.tags||[]),tag])];existing.importKeys=[...new Set([...existing.importKeys,packed.importKey])];existing.sheetRows[tag]=order;byImport.set(packed.importKey,existing);continue;}
  const release=releaseMap.get(normalize(packed.title));
  const source={id:`source-${sources.length+1}`,sourceUid:`chronizo:source:${packed.importKey}`,importKey:packed.importKey,importKeys:[packed.importKey],importOrigin:packed.sourceSheet||pack.name,title:packed.title,type:packed.type||'Inne',status:'Nierozpoczęte',date:packed.date||'',dateApprox:Boolean(packed.dateApprox),releaseDate:packed.releaseDate||releaseIso(release?.date),releaseOrderRow:release?.row??null,tags:[...new Set([...(packed.tags||[]),tag])],sheetRows:{[tag]:order},worldIds:labels.map(ensureWorld),createdAt:'2026-10-06T00:00:00.000Z'};
  sources.push(source);byImport.set(packed.importKey,source);byIdentity.set(key,source);
}

const strictExact=new Set(strict.sources.map(item=>[normalize(item.title),normalize(item.universe).replace(/^earth-/, '')].join('|')));
for(const source of sources){
  const labels=(source.worldIds||[]).map(id=>worlds.get(id)?.designation).filter(Boolean).map(label=>normalize(label).replace(/^earth-/, ''));
  if(labels.some(label=>strictExact.has([normalize(source.title),label].join('|')))){
    source.tags=[...new Set([...source.tags,'SMU'])];
    source.sheetRows.SMU=Math.min(...strict.sources.filter(item=>normalize(item.title)===normalize(source.title)&&labels.includes(normalize(item.universe).replace(/^earth-/, ''))).map(item=>item.row));
  }
}

const screenByTitle=new Map();
for(const source of sources){const key=normalize(source.title);if(!screenByTitle.has(key))screenByTitle.set(key,[]);screenByTitle.get(key).push(source);}
for(const packed of comics.sources){
  if(packed.relationType==='inspiration'||(packed.tags||[]).includes('INSPIRACJA'))continue;
  const targets=[...new Set((packed.relatedTitles||[]).flatMap(title=>screenByTitle.get(normalize(title))||[]))],targetIds=targets.map(source=>source.id),touchesEmcu=targets.some(source=>source.tags.includes('EMCU')),tags=[...new Set([...(packed.tags||['EMCU']),'FILMOWY',...(touchesEmcu?['EMCU']:[])])],anchor=targets.find(source=>source.date)||targets[0],anchorDate=anchor?.date||'';
  let date='',dateApprox=false;
  if(packed.relationType==='prequel'){date=anchorDate?`Przed ${anchorDate}`:'Przed źródłem ekranowym';dateApprox=true;}
  else if(['adaptation','tiein','promotional'].includes(packed.relationType)){date=anchorDate||'Wokół źródła ekranowego';dateApprox=packed.relationType!=='adaptation';}
  else if(targets.length){date=anchorDate||'Powiązane ze źródłem ekranowym';dateApprox=true;}
  sources.push({id:`source-${sources.length+1}`,sourceUid:packed.sourceUid||`chronizo:source:${packed.key}`,importKey:packed.key,importKeys:[packed.key],importOrigin:'Movie Comics',title:packed.title,type:'Komiks',status:'Nierozpoczęte',date,dateApprox,releaseDate:packed.releaseDate||'',tags,worldIds:[...new Set(targets.flatMap(source=>source.worldIds||[]))],relatedSourceIds:targetIds,relationType:packed.relationType||'tiein',canonStatus:packed.canonStatus||'oficjalny — kanon niejasny',createdAt:'2026-10-06T00:00:00.000Z'});
}

for(const packed of games.sources){
  const targets=[...new Set((packed.relatedTitles||[]).flatMap(title=>screenByTitle.get(normalize(title))||[]))],targetIds=targets.map(source=>source.id),tags=[...new Set([...(packed.tags||['MARVEL GAMES']),...(targets.some(source=>source.tags.includes('EMCU'))?['EMCU']:[])])];
  sources.push({id:`source-${sources.length+1}`,sourceUid:packed.sourceUid||`chronizo:source:${packed.key}`,importKey:packed.key,importKeys:[packed.key],importOrigin:'Chronizo Bible · Marvel Games',title:packed.title,type:'Gra',status:'Nierozpoczęte',date:packed.relationType==='standalone'?'Własna ciągłość gry':'Wokół źródła ekranowego',dateApprox:true,releaseDate:packed.releaseDate||'',tags,worldIds:[...new Set(targets.flatMap(source=>source.worldIds||[]))],relatedSourceIds:targetIds,relationType:packed.relationType||'standalone',canonStatus:packed.canonStatus||'własna ciągłość gry',releaseStatus:packed.releaseStatus||'wydana',franchise:packed.franchise||'Marvel',createdAt:'2026-10-06T00:00:00.000Z'});
}

const project={id:'project-road-to-doomsday-complete',name:'Road to Doomsday — Biblia Chronizo',description:'SMU + EMCU + Multiversal VO + komiksy filmowe + pełny katalog gier Marvela — bez luźnych inspiracji. α76.',createdAt:'2026-10-06T00:00:00.000Z',worlds:[...worlds.values()],sources,characters:[],events:[],catalogMigrations:['mvo-mini-verse-9-v4-title-order-repair',`movie-comics-v${comics.version}`,`marvel-games-v${games.version}`,'remove-imported-inspirations-v1','source-date-order-audit-v1','comic-chronology-labels-v1','source-uid-v1']};
const payload={format:'chronizo-project',version:1,exportedAt:new Date().toISOString(),project};
const output='Road-to-Doomsday-Biblia-Chronizo-alpha76.chronizo.json';
fs.writeFileSync(output,JSON.stringify(payload,null,2)+'\n');
fs.writeFileSync('data/chronizo-bible.sources.json',JSON.stringify({format:'chronizo-bible',version:1,generatedAt:new Date().toISOString(),sources},null,2)+'\n');
console.log(`${output}: ${sources.length} sources, ${project.worlds.length} worlds, ${sources.filter(source=>source.type==='Komiks').length} comics, ${sources.filter(source=>source.type==='Gra').length} games`);
