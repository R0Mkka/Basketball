// import { Injectable } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

// import { throwError } from 'rxjs';
// import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { tap, catchError, map, filter, retry } from 'rxjs/operators';

import { Player } from './player';

// const httpOptions = {
//   headers: new HttpHeaders({
//     "Content-Type": "text/html; charset=UTF-8"
//   })
// };

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

  tryGetImageAgain(fullName: string) {
    let filteredName = '';

    for (let i = 0; i < fullName.length; i++) {
      if (fullName[i] != "'" && fullName[i] != ".") {
        filteredName += fullName[i];
      }
    }

    const splitFullName = filteredName.split(' ');

    return this.baseUrl + `players/${splitFullName[1]}`;
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

      // this.http.get(this.baseUrl + `players/${splitFullName[1]}/${splitFullName[0]}`, httpOptions)
      //   .subscribe(
      //     (value: Array<any>) => console.log(value),
      //     (error) => this.handleError(error),
      //     () => console.log('complete!')
      //   );

      return this.baseUrl + `players/${splitFullName[1]}/${splitFullName[0]}`;
    });
  }

  getPlayerStats(fullName: string) {
    const splitFullName = fullName.split(' ');

    if (splitFullName.length > 2 || ~splitFullName.indexOf('.')) {
      
      return this.http.get<Player>(this.baseUrl + `players-stats/${splitFullName[1]}`);
    }

    return this.http.get<Player>(this.baseUrl + `players-stats/${splitFullName[1]}/${splitFullName[0]}`);
  }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // console.error(
  //     //   `Backend returned code ${error.status}, ` +
  //     //   `body was: ${error.error}`);
  //     console.log(error.error);
  //   }

  //   return throwError(
  //     'Something bad happened; please try again later.');
  // };
}
