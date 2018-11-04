import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Player } from 'src/app/dataTypes/player';

@Injectable()
export class FavoritesService {
    private baseUrl = 'https://nba-players.herokuapp.com/';

    constructor(private http: HttpClient) {}

    public getPlayersList(): Observable<Player[]> {
        return this.http.get<Player[]>(this.baseUrl + 'players-stats');
    }
}