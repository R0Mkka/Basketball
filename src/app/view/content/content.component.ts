import {Component, EventEmitter, Input, Output, OnChanges, SimpleChanges} from '@angular/core';

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
export class ContentComponent implements OnChanges {
  @Input() isTeams: boolean;
  @Input() isFavorites: boolean;
  @Input() isClearFavorites: boolean;
  @Output() teamsLoaded = new EventEmitter<boolean>();

  isLoading = false;

  teams: Array<any>;
  teamsNames: Array<string>;

  players: Array<Player>;
  playersSets: Array<any> = [];
  currentSetIndex: number;
  currentSet: Array<Player>;

  favorites: Array<Player> = [];
  showFavorites = false;

  isTeamPlayers: boolean;
  teamPlayers: Array<Player>;

  constructor(private teamsService: TeamsService,
              private playersService: PlayersService) {
    this.initPlayers();
    this.initTeams();
  }

  ngOnChanges() {
    this.isTeamPlayers = false;
    if (this.isClearFavorites) {
      this.isLoading = true;
      this.favorites = [];
      this.players.forEach((player) => {
        player.is_favorite = false;
      });

      this.isClearFavorites = false;
      this.isLoading = false;
    }
  }

  setLoadingStatus($event: boolean) {
    this.isLoading = $event;
  }

  prevSet() {
    if (this.currentSetIndex === 1) {
      this.currentSetIndex = this.playersSets.length;
    } else {
      this.currentSetIndex--;
    }

    this.currentSet = this.playersSets[this.currentSetIndex - 1];
  }

  nextSet() {
    if (this.currentSetIndex === this.playersSets.length) {
      this.currentSetIndex = 1;
    } else {
      this.currentSetIndex++;
    }

    this.currentSet = this.playersSets[this.currentSetIndex - 1];
  }

  moveToSet($event) {
    const target = $event.target;

    if (target.value > 0 && target.value < 51) {
      this.currentSetIndex = target.value;
    } else {
      target.value = 1;
      this.currentSetIndex = 1;
    }

    this.currentSet = this.playersSets[this.currentSetIndex - 1];
  }

  getSetsCount() {
    return this.playersSets.length;
  }

  displayTeam(team: Array<Player>) {
    this.teamPlayers = team;
    this.isTeamPlayers = true;
    this.isFavorites = false;
  }

  toggleFavorites(player: Player) {
    if (!player.is_favorite) {
      this.favorites.forEach((favorite, index) => {
        if (favorite.name === player.name) {
          this.playersService.remove(favorite.name);
          this.favorites.splice(index, 1);
        }
      });
    } else {
      this.playersService.set(player.name, player.name);
      this.favorites.push(player);
    }
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
            this.playersService.getPlayersImages(this.players).forEach((url, index) => {
              this.players[index].image = url;
            });
            this.getSetsFromPlayers();
            this.currentSetIndex = 1;
            this.currentSet = this.playersSets[this.currentSetIndex - 1];
            this.initFavorites();
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
          value => {
            this.teams = value;
            this.teamsNames = Object.keys(value);
          },
          () => console.error('Error with getting teams!!!'),
          () => {
            this.teamsLoaded.emit();
          }
        ),
        catchError(() => ([]))
      ).subscribe();
  }

  private initFavorites() {
    const storagePlayers = Object.keys(this.playersService.storage);

    this.players.forEach((player: Player) => {
      if (~storagePlayers.indexOf(player.name)) {
        this.favorites.push(player);
      }
    });
  }
}
