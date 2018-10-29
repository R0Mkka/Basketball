import {Component, Output, EventEmitter} from '@angular/core';
import { PlayersService } from '../content/player/players.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ PlayersService ]
})
export class HeaderComponent {
  @Output() stateChanged = new EventEmitter<boolean>();
  @Output() toggleFavorites = new EventEmitter<boolean>();
  @Output() hideTeamPlayers = new EventEmitter<boolean>();
  @Output() favoritesClear = new EventEmitter<any>();

  isTeams = true;
  isFavorites = false;
  isTeamPlayers = false;

  constructor(private playersService: PlayersService) {}

  clearFavorites() {
    const answer = confirm("Do you really want to clear your favorites list?")

   if (answer) {
     this.playersService.clear();
     this.favoritesClear.emit();
   }
  }

  changeContent() {
    this.isTeams = !this.isTeams;
    this.isFavorites = false;
    this.hideTeamPlayers.emit(this.isTeamPlayers);
    this.toggleFavorites.emit(this.isFavorites);
    this.stateChanged.emit(this.isTeams);
  }

  toggleFavoritesShow() {
    this.isFavorites = !this.isFavorites;
    this.hideTeamPlayers.emit(this.isTeamPlayers);
    this.toggleFavorites.emit(this.isFavorites);
  }

}
