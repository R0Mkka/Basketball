import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private storage: Storage;

    constructor() {
        this.storage = localStorage;
    }

    public get(key: string): string {
        return this.storage.getItem(key);
    }

    public set(key: string, value: string): void {
        this.storage.setItem(key, value);
    }
    
    public has(key: string): boolean {
        const storageKeys = Object.keys(this.storage);

        return !!~storageKeys.indexOf(key);
    }
    
    public remove(key: string): void {
        this.storage.removeItem(key);
    }
    
    public clear(): void {
        this.storage.clear();
    }
}