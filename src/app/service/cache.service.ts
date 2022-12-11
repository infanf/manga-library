import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  readonly dbVersion = 1;
  readonly dbName = 'mangalib-cache';
  constructor() {
    const request = indexedDB.open(this.dbName, this.dbVersion);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('fetch')) {
        db.createObjectStore('fetch', { keyPath: 'url' });
      }
    };
  }

  async fetch<T>(url: string, ttl = 60 * 60 * 24): Promise<T> {
    const value = await new Promise(resolve => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction('fetch', 'readwrite');
        const objectStore = transaction.objectStore('fetch');
        const storeRequest = objectStore.get(url);
        storeRequest.onsuccess = () => {
          const result = storeRequest.result;
          if (result?.data && result.expires > Date.now()) {
            resolve(result?.data);
          } else {
            resolve(undefined);
          }
        };
        storeRequest.onerror = () => resolve(undefined);
      };
      request.onerror = () => resolve(undefined);
    });
    if (value) return value as T;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const data = await response.json();
    const request2 = indexedDB.open(this.dbName, this.dbVersion);
    request2.onsuccess = () => {
      const db = request2.result;
      const transaction = db.transaction('fetch', 'readwrite');
      const objectStore = transaction.objectStore('fetch');
      objectStore.put({ url, data, expires: ttl * 1000 + Date.now() });
    };
    return data;
  }
}
