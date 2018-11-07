import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Player } from 'src/app/dataTypes/player';

@Injectable({
    providedIn: 'root'
})
export class SortPlayersService {
    private baseUrl: string;
    private sortedPlayersList: Player[];
    
    @Output() sortEvent = new EventEmitter<Player[]>();

    constructor(private http: HttpClient) {
        this.baseUrl = 'https://nba-players.herokuapp.com/players-stats';
    }

    public emitSortEvent() {
        this.sortEvent.emit(this.sortedPlayersList);
    }

    public sortPlayersList(fieldName: string): void {
        this.http.get<Player[]>(this.baseUrl)
            .subscribe({
                next: (players: Player[]) => {
                    players.sort((a: Player, b: Player) => {
                        switch(fieldName) {
                            case 'games_played': 
                            case 'three_point_percentage':
                                return parseInt(a[fieldName]) - parseInt(b[fieldName]);
                            default:
                                return a[fieldName].localeCompare(b[fieldName]);
                        }
                    });

                    this.sortedPlayersList = players.reverse();
                    this.emitSortEvent();
                },
                error: (error) => {
                    console.error('Error with getting players for sort!!!');
                    console.error('Error: ' + error);
                }
            });
    }
}