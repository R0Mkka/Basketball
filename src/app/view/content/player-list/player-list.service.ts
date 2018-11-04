import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Player } from 'src/app/dataTypes/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerListService {
  private baseUrl = 'https://nba-players.herokuapp.com/';

  constructor(private http: HttpClient) { }

  public getPlayers(): Observable<Array<Player[]>> {
    return this.http.get<Array<Player[]>>(this.baseUrl + 'players-stats');
  }

  public getPlayersImages(players: Player[]): string[] {
    return players.map((player: Player) => {
      return this.getPlayerImage(player);
    });
  }

  public getPlayerImage(player: Player): string {
    const splitFullName = this.getSplitFullName(player.name);

    return this.baseUrl + `players/${splitFullName[1]}/${splitFullName[0]}`;
  }

  public getPlayerStats(fullName: string): Observable<Player> {
    const splitFullName = this.getSplitFullName(fullName);

    if (splitFullName.length > 2 || ~splitFullName.indexOf('.')) {
      return this.http.get<Player>(this.baseUrl + `players-stats/${splitFullName[1]}`);
    }

    return this.http.get<Player>(this.baseUrl + `players-stats/${splitFullName[1]}/${splitFullName[0]}`);
  }

  private getSplitFullName(fullName: string): string[] {
    let filteredName = '';

    for (let i = 0; i < fullName.length; i++) {
      if (fullName[i] != "'" && fullName[i] != ".") {
        filteredName += fullName[i];
      }
    }

    return filteredName.split(' ');
  }
}
