export const LOCATION_LEVELS=[
 {id:'world',label:'świat',minZoom:.3},
 {id:'continent',label:'kontynent',minZoom:.5},
 {id:'country',label:'kraj',minZoom:1.5},
 {id:'city',label:'miasto',minZoom:2.5},
 {id:'district',label:'dzielnica',minZoom:5},
 {id:'street',label:'ulica',minZoom:9},
 {id:'building',label:'budynek',minZoom:13},
 {id:'room',label:'pomieszczenie',minZoom:17}
];

export function createLocation(input){
 const level=LOCATION_LEVELS.find(x=>x.id===input.type)||LOCATION_LEVELS[3];
 return {
  id:input.id||'loc-'+crypto.randomUUID(),
  name:String(input.name||'Bez nazwy').trim(),
  type:level.id,
  parentLocationId:input.parentLocationId||null,
  worldId:input.worldId||'earth-616',
  x:Number(input.x)||0,
  mapY:Number(input.mapY)||0,
  minZoom:Number.isFinite(input.minZoom)?input.minZoom:level.minZoom,
  custom:Boolean(input.custom)
 };
}

export function visibleAtZoom(location,zoom){
 return zoom>=location.minZoom;
}

export function getLocationPath(location,catalog){
 const path=[];let current=location;const visited=new Set();
 while(current&&!visited.has(current.id)){
  visited.add(current.id);path.unshift(current.name);
  current=current.parentLocationId?catalog.find(x=>x.id===current.parentLocationId):null;
 }
 return path.join(' / ');
}

export function nearestParent(catalog,x,y,childType,worldId){
 const childIndex=LOCATION_LEVELS.findIndex(l=>l.id===childType);
 const candidates=catalog.filter(l=>l.worldId===worldId&&LOCATION_LEVELS.findIndex(level=>level.id===l.type)<childIndex);
 return candidates.sort((a,b)=>Math.hypot(a.x-x,a.mapY-y)-Math.hypot(b.x-x,b.mapY-y))[0]||null;
}
