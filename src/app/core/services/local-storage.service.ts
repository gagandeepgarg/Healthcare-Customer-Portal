import { Injectable } from '@angular/core';
import { Utilities } from './utilities';

@Injectable({ providedIn: 'root' })
/**
 * Provides a wrapper for accessing the web storage API and synchronizing session storage across tabs/windows.
 */
export class LocalStoreService {
  private static syncListenerInitialised = false;
  private syncKeys: string[] = [];

  private reservedKeys: string[] = [
    'sync_keys',
    'addToSyncKeys',
    'removeFromSyncKeys',
    'getSessionStorage',
    'setSessionStorage',
    'addToSessionStorage',
    'removeFromSessionStorage',
    'clearAllSessionsStorage'
  ];

  public clearAllStorage() {
    sessionStorage.clear();
    localStorage.clear();
  }
  public saveSessionData(data: any, key) {
    this.testForInvalidKeys(key);
    localStorage.removeItem(key);
    this.sessionStorageSetItem(key, data);
  }
  public savePermanentData(data: any, key ) {
    this.testForInvalidKeys(key);
    this.localStorageSetItem(key, data);
  }

  public getData(key ) {
    this.testForInvalidKeys(key);

    let data = this.sessionStorageGetItem(key);

    if (data == null) {
      data = this.localStorageGetItem(key);
    }

    return data;
  }

  private testForInvalidKeys(key: string) {
    if (!key) {
      throw new Error('key cannot be empty');
    }

    if (this.reservedKeys.some(x => x === key)) {
      throw new Error(
        `The storage key "${key}" is reserved and cannot be used. Please use a different key`
      );
    }
  }
  private localStorageSetItem(key: string, data: any) {
    localStorage.setItem(key, Utilities.safeStringify(data));
  }

  private sessionStorageSetItem(key: string, data: any) {
    sessionStorage.setItem(key, Utilities.safeStringify(data));
  }

  private localStorageGetItem(key: string) {
    return Utilities.JsonTryParse(localStorage.getItem(key));
  }

  private sessionStorageGetItem(key: string) {
    return Utilities.JsonTryParse(sessionStorage.getItem(key));
  }
}
