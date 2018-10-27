import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Player } from './player';

@Injectable()
export class PlayersService {
  private baseUrl = 'https://nba-players.herokuapp.com/';

  constructor(private http: HttpClient) { }

  getPlayers() {
    return this.http.get<Array<Array<Player>>>(this.baseUrl + 'players-stats');
  }

  getPlayersImages(players: Array<Player>): string[] {
    return players.map((player: Player) => {
      const splitFullName = player.name.split(' ');

      return this.baseUrl + `players/${splitFullName[1]}/${splitFullName[0]}`;
    });
  }

  getPlayerStats(fullName: string) {
    const splitFullName = fullName.split(' ');

    return this.http.get<Player>(this.baseUrl + `players-stats/${splitFullName[1]}/${splitFullName[0]}`);
  }
}
