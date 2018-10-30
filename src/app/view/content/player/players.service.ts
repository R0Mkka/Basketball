import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Player } from './player';

@Injectable()
export class PlayersService {
  private baseUrl = 'https://nba-players.herokuapp.com/';

  storage: Storage = localStorage;

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

  getPlayers() {
    return this.http.get<Array<Array<Player>>>(this.baseUrl + 'players-stats');
  }

  getPlayersImages(players: Array<Player>): string[] {
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
