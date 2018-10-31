import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Player } from 'src/app/dataTypes/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerListService {
  private baseUrl = 'https://nba-players.herokuapp.com/';

  constructor(private http: HttpClient) { }

  public getPlayers() {
    return this.http.get<Array<Array<Player>>>(this.baseUrl + 'players-stats');
  }

  public getPlayersImages(players: Array<Player>): string[] {
    return players.map((player: Player) => {
      let filteredName = '';

      for (let i = 0; i < player.name.length; i++) {
        if (player.name[i] != "'" && player.name[i] != ".") {
          filteredName += player.name[i];
        }
      }

      const splitFullName = filteredName.split(' ');

      return this.baseUrl + `players/${splitFullName[1]}/${splitFullName[0]}`;
    });
  }

  getPlayerImage(player: Player): string {
    let filteredName = '';

    for (let i = 0; i < player.name.length; i++) {
      if (player.name[i] != "'" && player.name[i] != ".") {
        filteredName += player.name[i];
      }
    }

    const splitFullName = filteredName.split(' ');

    return this.baseUrl + `players/${splitFullName[1]}/${splitFullName[0]}`;
  }

  getPlayerStats(fullName: string) {
    let filteredName = '';

    for (let i = 0; i < fullName.length; i++) {
      if (fullName[i] != "'" && fullName[i] != ".") {
        filteredName += fullName[i];
      }
    }

    const splitFullName = filteredName.split(' ');

    if (splitFullName.length > 2 || ~splitFullName.indexOf('.')) {
      return this.http.get<Player>(this.baseUrl + `players-stats/${splitFullName[1]}`);
    }

    return this.http.get<Player>(this.baseUrl + `players-stats/${splitFullName[1]}/${splitFullName[0]}`);
  }
}
