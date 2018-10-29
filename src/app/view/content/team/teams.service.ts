import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../player/player';

@Injectable()
export class TeamsService {
  private baseUrl = '/src/assets/teams.json';

  constructor(private http: HttpClient) {}

  getTeams() {
    return this.http.get<Array<Object>>(this.baseUrl);
  }

  getPlayersOfTheTeam(acronym: string) {
    return this.http.get<Array<Player>>(`https://nba-players.herokuapp.com/players-stats-teams/${acronym}`);
  }
}
