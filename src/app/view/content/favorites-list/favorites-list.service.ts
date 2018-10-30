import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FavoritesService {
    private baseUrl = 'https://nba-players.herokuapp.com/';
    private storage: Storage;

    constructor(private http: HttpClient) {
        this.storage = localStorage;
    }

    get(key: string) {
        this.storage.getItem(key);
    }
    
    set(key: string, value: string) {
        this.storage.setItem(key, value);
    }

    has(key: string): boolean {
        const storageKeys = Object.keys(this.storage);

        return !!~storageKeys.indexOf(key);
    }
    
    remove(key: string) {
        this.storage.removeItem(key);
    }
    
    clear() {
        this.storage.clear();
    }

    getPlayersList() {
        return this.http.get(this.baseUrl + 'players-stats');
    }
}