import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() stateChanged = new EventEmitter<boolean>();
  @Output() toggleFavorites = new EventEmitter<boolean>();

  isTeams = true;
  isFavorites = false;

  constructor() { }

  changeContent() {
    this.isTeams = !this.isTeams;
    this.isFavorites = false;
    this.toggleFavorites.emit(this.isFavorites);
    this.stateChanged.emit(this.isTeams);
  }

  toggleFavoritesShow() {
    this.isFavorites = !this.isFavorites;
    this.toggleFavorites.emit(this.isFavorites);
  }

}
