import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LocalStorageService } from '../local-storage/local-storage.service';

import { Player } from 'src/app/dataTypes/player';

@Injectable({
    providedIn: 'root'
})
export class SortPlayersService {
    private baseUrl: string;
    private sortedPlayersList: Player[];
    
    @Output() sortEvent = new EventEmitter<Player[]>();

    constructor(private http: HttpClient, private storage: LocalStorageService) {
        this.baseUrl = 'https://nba-players.herokuapp.com/players-stats';
    }

    public emitSortEvent() {
        this.sortEvent.emit(this.sortedPlayersList);
    }

    public sortPlayersList(fieldName: string): void {
        this.http.get<Player[]>(this.baseUrl)
            .subscribe({
                next: (players: Player[]) => {
                    players = this.changePlayersWithEdited(players);

                    players.sort((a: Player, b: Player) => {
                        switch(fieldName) {
                            case 'games_played': 
                            case 'three_point_percentage':
                                return parseFloat(a[fieldName]) - parseFloat(b[fieldName]);
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

    private changePlayersWithEdited(players: Player[]): Player[] {
        players = players.map((player: Player) => {
            if (this.storage.has(player.name)) {
                player = JSON.parse(this.storage.get(player.name));
            }

            return player;
        });

        console.log(players);
        return players;
    }
}