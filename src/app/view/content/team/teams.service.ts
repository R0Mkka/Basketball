import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TeamsService {
  private baseUrl = '/src/assets/teams.json';

  constructor(private http: HttpClient) {}

  getTeams() {
    return this.http.get<Array<Object>>(this.baseUrl);
  }
}
