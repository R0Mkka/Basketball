import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Player } from 'src/app/dataTypes/player';
import { Team } from 'src/app/dataTypes/team';

@Injectable({
  providedIn: 'root'
})
export class TeamListService {
  private baseUrl = '/src/assets/teams.json';

  constructor(private http: HttpClient) {}

  public getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.baseUrl);
  }

  public getPlayersOfTheTeam(acronym: string): Observable<Player[]> {
    return this.http.get<Player[]>(`https://nba-players.herokuapp.com/players-stats-teams/${acronym}`);
  }
}
