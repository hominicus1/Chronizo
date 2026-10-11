import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
execFileSync(process.execPath,['scripts/build-complete-project.mjs'],{cwd:new URL('..',import.meta.url)});

const project = JSON.parse(fs.readFileSync(new URL('../Road-to-Doomsday-Biblia-Chronizo-alpha80.chronizo.json',import.meta.url),'utf8'));
const legacy = {projects:[structuredClone(project.project)], activeProjectId:project.project.id};
let local = JSON.stringify(legacy), durable, failWrite = false;
globalThis.localStorage = {
  getItem:()=>local,
  setItem:(_key,value)=>{if(value.length>2500000)throw Object.assign(new Error('Storage full'),{name:'QuotaExceededError'});local=value;},
  removeItem:()=>{local=null;}
};
globalThis.indexedDB = {open:()=>{
  const request = {};
  queueMicrotask(()=>{
    request.result = {transaction:(_store,mode)=>{
      const transaction = {objectStore:()=>({
        get:()=>({result:structuredClone(durable)}),
        put:value=>{transaction.pending=structuredClone(value);return {};}
      })};
      queueMicrotask(()=>{
        if(mode==='readwrite'&&failWrite){transaction.error=new Error('Disk full');transaction.onabort();}
        else {if(mode==='readwrite')durable=transaction.pending;transaction.oncomplete();}
      });
      return transaction;
    }};
    request.onsuccess();
  });
  return request;
}};
const storage = await import('../js/project-storage.js?test=first');
const loaded = await storage.loadWorkbenchState();
assert.deepEqual(loaded, legacy);
loaded.projects.push({...structuredClone(project.project),id:'imported'});
await storage.saveWorkbenchState(loaded);
assert.equal(local,null);
assert.equal(durable.projects.length,2);
const reload = await import('../js/project-storage.js?test=reload');
assert.deepEqual(await reload.loadWorkbenchState(),loaded,'Both large projects survive a fresh load');
const first={...loaded,activeProjectId:'first'}, second={...loaded,activeProjectId:'second'};
await Promise.all([storage.saveWorkbenchState(first),storage.saveWorkbenchState(second)]);
assert.equal(durable.activeProjectId,'second','Queued writes preserve order');
failWrite=true;
await assert.rejects(storage.saveWorkbenchState({...loaded,activeProjectId:'broken'}));
assert.equal(durable.activeProjectId,'second','Failed transaction preserves the last committed state');

const code=fs.readFileSync(new URL('../js/workbench-alpha82.js',import.meta.url),'utf8');
const start=code.indexOf('function importProjectFile('), importer=code.slice(start,code.indexOf('\n',start));
const alerts=[];let read, saveOk=true, renderCount=0;
const state=structuredClone(legacy);
const context=vm.createContext({state,structuredClone,console,FileReader:class {constructor(){read=this;}readAsText(file){this.result=file;}},uid:()=> 'new-project',save:async()=>saveOk,render:()=>{renderCount++;},switchView:()=>{},runCatalogMigrations:async()=>{},alert:text=>alerts.push(text)});
vm.runInContext(importer,context);
context.importProjectFile(JSON.stringify(project));await read.onload();
assert.equal(state.projects.length,2);assert.equal(renderCount,1);
saveOk=false;context.importProjectFile(JSON.stringify(project));await read.onload();
assert.equal(state.projects.length,2);assert.equal(state.activeProjectId,'new-project');
assert.match(alerts.at(-1),/zapisać projektu/);
context.importProjectFile('not json');await read.onload();
assert.match(alerts.at(-1),/Nieprawidłowy plik/);
assert.equal(state.projects.length,2);
console.log('Large project import: quota fallback, durable reload, ordered writes, rollback and distinct errors OK');
