import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PlayersService {
  private baseUrl = 'https://nba-players.herokuapp.com/';

  constructor(private http: HttpClient) { }

  getPlayers() {
    return this.http.get<Array<any>>(this.baseUrl + 'players-stats');
  }

  getPlayersImages(players: Array<any>): string[] {
    return players.map((player) => {
      const fullName = this.splitPlayerFullName(player);

      return this.baseUrl + `players/${fullName.lastName}/${fullName.firstName}`;
    });
  }

  getPlayerStats(player: any) {
    const fullName = this.splitPlayerFullName(player);

    return this.http.get(this.baseUrl + `players-stats/${fullName.lastName}/${fullName.firstName}`)
      .subscribe(value => console.log(value));
  }

  private splitPlayerFullName(player: any) {
    const splitedFullName = player.name.split(' ');

    const firstName = splitedFullName[0];
    const lastName = splitedFullName[1];

    return { firstName, lastName };
  }
}
