const KEY = 'chronizo.workbench.v1';
const fresh = () => ({projects:[], activeProjectId:null});
const valid = state => state && Array.isArray(state.projects);
let database, queue = Promise.resolve(), useDatabase = false;

async function openDatabase() {
  if (!database) database = new Promise((resolve, reject) => {
    const request = indexedDB.open('chronizo-workbench', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('state');
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error('Zamknij pozostałe karty Chronizo i spróbuj ponownie.'));
  }).catch(error => {database = null; throw error;});
  return database;
}

async function databaseOperation(mode, value) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('state', mode);
    const store = transaction.objectStore('state');
    const request = mode === 'readonly' ? store.get(KEY) : store.put(value, KEY);
    transaction.oncomplete = () => resolve(request.result);
    transaction.onerror = transaction.onabort = () => reject(transaction.error || request.error || new Error('Błąd zapisu projektu.'));
  });
}

export async function loadWorkbenchState() {
  try {
    const saved = await databaseOperation('readonly');
    if (valid(saved)) {useDatabase = true; return saved;}
  } catch (error) {console.warn('Chronizo database read unavailable', error);}
  try {const saved = JSON.parse(localStorage.getItem(KEY)); return valid(saved) ? saved : fresh();}
  catch {return fresh();}
}

export function saveWorkbenchState(state) {
  // Snapshot at invocation so queued saves preserve their original order.
  const snapshot = structuredClone(state);
  const operation = queue.catch(() => {}).then(async () => {
    if (!useDatabase) {
      try {localStorage.setItem(KEY, JSON.stringify(snapshot)); return;}
      catch (error) {if (!['QuotaExceededError','NS_ERROR_DOM_QUOTA_REACHED'].includes(error.name)) throw error;}
    }
    await databaseOperation('readwrite', snapshot);
    useDatabase = true;
    // Keep the legacy copy until the larger durable write has committed.
    try {localStorage.removeItem(KEY);} catch {}
  });
  queue = operation;
  return operation;
}
