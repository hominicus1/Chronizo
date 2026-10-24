import fs from 'node:fs';

const snapshot=JSON.parse(fs.readFileSync(process.argv[2]||'/tmp/chronizo-sheet-snapshot.json','utf8'));
const dataDir='data';
const generatedAt='2026-10-23';
const spreadsheetId=snapshot.spreadsheetId;
const normalize=value=>String(value||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[’‘]/g,"'").replace(/[–—]/g,'-').replace(/\s+/g,' ').trim();
const inferType=title=>/season\s+\d+\s+episode|episode\s+\d+/i.test(title)?'Serial':/game|playstation|xbox/i.test(title)?'Gra':'Film';
const rows=name=>(snapshot.sheets[name]||[]).map((cells,index)=>({row:index+1,cells}));
const sourceRows=name=>rows(name).filter(({row,cells})=>row>=4&&String(cells[1]||'').trim()&&String(cells[3]||'').trim()&&!/^see upcoming/i.test(String(cells[0]||'')));
const oldPack=file=>JSON.parse(fs.readFileSync(`${dataDir}/${file}`,'utf8'));
const oldMvo=oldPack('multiversal-vo.sources.json');
const oldExtended=oldPack('extended-vo.sources.json');
const oldByIdentity=new Map([...oldMvo.sources,...oldExtended.sources].map(item=>[[normalize(item.title),normalize(item.universe)].join('|'),item]));

function makePack(name,file,tag,prefix){
  const items=sourceRows(name).map(({row,cells})=>{const [date,title,,universe]=cells,old=oldByIdentity.get([normalize(title),normalize(universe)].join('|'));return{importKey:`${prefix}-${row}`,row,title:String(title).trim(),type:old?.type||inferType(title),status:'Nierozpoczęte',date:String(date||'').trim(),dateApprox:old?.dateApprox??false,releaseDate:'',universe:String(universe).trim(),tags:[tag]};});
  const pack={format:'chronizo-source-pack',version:4,name,sourceSheet:name,spreadsheetId,generatedAt,rowCount:items.length,sources:items};
  fs.writeFileSync(`${dataDir}/${file}`,JSON.stringify(pack,null,2)+'\n');return items;
}

const mvo=makePack('Multiversal VO','multiversal-vo.sources.json','MVO','multiversal-vo');
const liveMvo=[...mvo];
const emcuVo=makePack('Extended VO','extended-vo.sources.json','EMCU','extended-vo');

function membership(name,tag){return sourceRows(name).map(({row,cells})=>({row,date:String(cells[0]||'').trim(),title:String(cells[1]).trim(),universe:String(cells[3]).trim(),tag}));}
const strict=membership('Strict VO','SMU');
fs.writeFileSync(`${dataDir}/strict-vo.sources.json`,JSON.stringify({format:'chronizo-strict-vo-membership',version:2,name:'Strict Marvel Universe',tag:'SMU',sourceSheet:'Strict VO',spreadsheetId,retrievedAt:generatedAt,sources:strict},null,2)+'\n');
const extendedMcu=membership('Extended MCU','EMCU');
fs.writeFileSync(`${dataDir}/extended-mcu.membership.json`,JSON.stringify({format:'chronizo-source-membership',version:1,name:'Extended Marvel Cinematic Universe',tag:'EMCU',sourceSheet:'Extended MCU',spreadsheetId,retrievedAt:generatedAt,sources:extendedMcu},null,2)+'\n');
const fox=[...membership('Multi. X-Men VO','FOX-MEN'),...membership('Extended FoX VO','FOX-MEN'),...membership('Strict FoX VO','FOX-MEN')];
const foxUnique=[...new Map(fox.map(item=>[[normalize(item.title),normalize(item.universe)].join('|'),item])).values()];
fs.writeFileSync(`${dataDir}/fox-xmen.membership.json`,JSON.stringify({format:'chronizo-source-membership',version:1,name:'Fox / X-Men universes',tag:'FOX-MEN',sourceSheets:['Multi. X-Men VO','Extended FoX VO','Strict FoX VO'],spreadsheetId,retrievedAt:generatedAt,sources:foxUnique},null,2)+'\n');

const miniTitles=['WEB-STER','S.O.S Kitty','Spidey Mystery','A Helping Hulk','Spidey Surprise','Rock-a-Bye Rhino','Stop Doc Ock','The Spidey Team','Monkeying Around'];
const mini=oldMvo.sources.filter(item=>String(item.importKey).startsWith('mini-verse-vo-'));
if(!mini.length)mini.push(...miniTitles.map((episode,index)=>({importKey:`mini-verse-vo-${419+index}`,row:419+index,orderRow:2418+(index+1)/10,sourceSheet:'Mini-Verse VOs',title:`Meet Spidey and His Amazing Friends Season 1 Episode ${index+1}: ${episode}`,type:'Serial',status:'Nierozpoczęte',date:'Jun, 2019',dateApprox:false,releaseDate:'2021-06-21',universe:'21642',tags:['MVO']})));
for(const item of mini)if(!mvo.some(row=>normalize(row.title)===normalize(item.title)&&normalize(row.universe)===normalize(item.universe)))mvo.push(item);
mvo.sort((a,b)=>Number(a.orderRow??a.row)-Number(b.orderRow??b.row));
fs.writeFileSync(`${dataDir}/multiversal-vo.sources.json`,JSON.stringify({format:'chronizo-source-pack',version:4,name:'Multiversal VO',sourceSheet:'Multiversal VO',spreadsheetId,generatedAt,rowCount:mvo.length,sources:mvo},null,2)+'\n');
const order={format:'chronizo-sheet-order',version:2,generatedAt,spreadsheetId,sheets:[
  {name:'Extended VO',tag:'EMCU',entries:emcuVo.map(({row,date,title,universe})=>({row,date,title,universe}))},
  {name:'Multiversal VO',tag:'MVO',entries:liveMvo.map(({row,date,title,universe})=>({row,date,title,universe}))},
  {name:'Strict VO',tag:'SMU',entries:strict}
]};
fs.writeFileSync(`${dataDir}/vo-sheet-order.json`,JSON.stringify(order,null,2)+'\n');

const metadata=oldPack('source-metadata.json');
metadata.generatedAt=generatedAt;
metadata.releases=rows('Release Order').filter(({row,cells})=>row>=4&&String(cells[0]||'').trim()&&String(cells[1]||'').trim()&&!/^see upcoming/i.test(String(cells[0]||''))).map(({row,cells})=>({row,date:String(cells[0]).trim(),title:String(cells[1]).trim(),type:String(cells[2]||'').trim(),length:String(cells[3]||'').trim(),where:String(cells[4]||'').trim()}));
fs.writeFileSync(`${dataDir}/source-metadata.json`,JSON.stringify(metadata,null,2)+'\n');
console.log(JSON.stringify({mvo:mvo.length,extendedVo:emcuVo.length,strict:strict.length,extendedMcu:extendedMcu.length,fox:foxUnique.length,releases:metadata.releases.length},null,2));
