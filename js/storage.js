// ماژول ذخیره‌سازی پایدار در localStorage و IndexedDB
export const STORAGE_KEY = 'daftar_app_v1';
export const StorageEngine = {
  load: load() {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (!raw) {
            const initial = createDefaultSampleState();
            this.save(initial);
            return initial;
          }
          const parsed = JSON.parse(raw);
          return this.validateAndNormalize(parsed);
        } catch (err) {
          console.error('خطا در بارگذاری اطلاعات از حافظه:', err);
          return createDefaultSampleState();
        }
      },
  save: save(state) {
        try {
          state.updatedAt = new Date().toISOString();
          const serialized = JSON.stringify(state);
          localStorage.setItem(STORAGE_KEY, serialized);
          this.mirrorToIndexedDB(state);
          return true;
        } catch (err) {
          console.error('خطا در ذخیره‌سازی محلی:', err);
          return false;
        }
      },
  validateAndNormalize: validateAndNormalize(data) {
        const fallback = createDefaultSampleState();
        if (!data || typeof data !== 'object') return fallback;
        return {
          version: data.version || '1.4.0',
          updatedAt: data.updatedAt || new Date().toISOString(),
          tasks: Array.isArray(data.tasks) ? data.tasks : fallback.tasks,
          shifts: Array.isArray(data.shifts) ? data.shifts : fallback.shifts,
          incidents: Array.isArray(data.incidents) ? data.incidents : fallback.incidents,
          calendarNotes: Array.isArray(data.calendarNotes) ? data.calendarNotes : fallback.calendarNotes,
          ideas: Array.isArray(data.ideas) ? data.ideas : fallback.ideas,
          decisions: Array.isArray(data.decisions) ? data.decisions : fallback.decisions
        };
      },
  mirrorToIndexedDB: mirrorToIndexedDB(state) {
        try {
          if (!window.indexedDB) return;
          const req = indexedDB.open('DaftarDB', 1);
          req.onupgradeneeded = function(e) {
            const db = e.target.result;
            if (!db.objectStoreNames.contains('snapshots')) {
              db.createObjectStore('snapshots', { keyPath: 'id' });
            }
          };
          req.onsuccess = function(e) {
            const db = e.target.result;
            const tx = db.transaction('snapshots', 'readwrite');
            tx.objectStore('snapshots').put({ id: STORAGE_KEY, payload: state });
          };
        } catch (_) {}
      },
  getStorageSizeKB: getStorageSizeKB() {
        try {
          const raw = localStorage.getItem(STORAGE_KEY) || '';
          const bytes = new Blob([raw]).size;
          return (bytes / 1024).toFixed(1);
        } catch (_) {
          return '0.0';
        }
      }
};
