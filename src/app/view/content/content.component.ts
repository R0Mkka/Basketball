import {Component, EventEmitter, Input, Output} from '@angular/core';

import { TeamsService } from './team/teams.service';
import { PlayersService } from './player/players.service';
import { catchError, retry, tap } from 'rxjs/operators';

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
  players: Array<any>;

  constructor(private teamsService: TeamsService,
              private playersService: PlayersService) {
    this.initPlayers();
    this.initTeams();
  }

  private initPlayers() {
    this.playersService.getPlayers()
      .pipe(
        retry(3),
        tap(
          (value: Array<any>) => {
              this.players = value.slice(0, 10);
              console.log(value);
            },
          () => console.error('Error with getting players!!!'),
          () => {
            this.teamsLoaded.emit();
            this.playersService.getPlayersImages(this.players).forEach((url, index) => {
              this.players[index].image = url;
            });
          }
        ),
        catchError(() => ([]))
      ).subscribe();
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
