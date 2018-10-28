import {Component, EventEmitter, Input, Output} from '@angular/core';

import { TeamsService } from './team/teams.service';
import { PlayersService } from './player/players.service';
import { catchError, retry, tap } from 'rxjs/operators';

import { Player } from './player/player';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [ TeamsService, PlayersService ]
})
export class ContentComponent {
  @Input() isTeams: boolean;
  @Output() teamsLoaded = new EventEmitter<boolean>();

  teams: Array<any>;
  players: Array<Player>;
  playersSets: Array<any> = [];
  currentSetIndex: number;
  currentSet: Array<Player>;

  constructor(private teamsService: TeamsService,
              private playersService: PlayersService) {
    this.initPlayers();
    this.initTeams();
  }

  prevSet() {
    if (this.currentSetIndex === 0) {
      this.currentSetIndex = this.playersSets.length - 1;
    } else {
      this.currentSetIndex -= 1;
    }

    this.currentSet = this.playersSets[this.currentSetIndex];
  }

  nextSet() {
    console.log(this.currentSet);
    if (this.currentSetIndex === this.playersSets.length - 1) {
      this.currentSetIndex = 0;
    } else {
      this.currentSetIndex += 1;
    }

    this.currentSet = this.playersSets[this.currentSetIndex];
  }

  getCurrentSet() {
    return this.currentSetIndex + 1;
  }

  getSetsCount() {
    return this.playersSets.length;
  }

  private initPlayers() {
    this.playersService.getPlayers()
      .pipe(
        retry(3),
        tap(
          (playersTotal: Array<any>) => {
              this.players = playersTotal;

            },
          () => console.error('Error with getting players!!!'),
          () => {
            this.teamsLoaded.emit();
            this.playersService.getPlayersImages(this.players).forEach((url, index) => {
              this.players[index].image = url;
            });
            this.getSetsFromPlayers();
            this.currentSetIndex = 0;
            this.currentSet = this.playersSets[this.currentSetIndex];
          }
        ),
        catchError(() => ([]))
      ).subscribe();
  }

  private getSetsFromPlayers() {
    const setCount = 10;

    let startIndex = 0;
    let endIndex = setCount;

    for (let i = 0; i < this.players.length; i += setCount) {

      if (endIndex > this.players.length) {
        endIndex = this.players.length;
      }

      const set = this.players.slice(startIndex, endIndex);

      this.playersSets.push(set);

      startIndex += setCount;
      endIndex += setCount;

    }
  }

  private initTeams() {
    this.teamsService.getTeams()
      .pipe(
        tap(
          value => console.log(value)
        ),
        catchError(() => ([]))
      ).subscribe();
  }
}
