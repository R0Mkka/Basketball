import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Player } from 'src/app/dataTypes/player';
import { Team } from 'src/app/dataTypes/team';

@Injectable({
  providedIn: 'root'
})
export class TeamListService {
  private baseUrl = '/src/assets/teams.json';

  constructor(private http: HttpClient) {}

  getTeams() {
    return this.http.get<Array<Team>>(this.baseUrl);
  }

  getPlayersOfTheTeam(acronym: string) {
    return this.http.get<Array<Player>>(`https://nba-players.herokuapp.com/players-stats-teams/${acronym}`);
  }
}
