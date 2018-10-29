import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PlayersService } from './players.service';
import {Player} from './player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  providers: [ PlayersService ]
})
export class PlayerComponent {
  @Input() name: string;
  @Input() team: string;
  @Input() gamesPlayed: string;
  @Input() tpp: string;
  @Input() imageSrc: string;
  @Output() dataChanged = new EventEmitter<Object>();
  @Output() favoriteEvent = new EventEmitter<Player>();

  player: Player;
  isPlayerInit = false;
  isFavorite = false;
  showModal = false;
  isImageLoaded = false;
  teamImage = '';
  heartImage = '/src/assets/images/favorite-grey.png';

  constructor(private playersService: PlayersService) {
    this.checkForPlayerImage();
  }

  imageLoaded() {
    this.isImageLoaded = true;
    this.teamImage = this.getTeamImage();
  }

  toggleFavorite() {
    if (!this.isPlayerInit) {
      this.playersService.getPlayerStats(this.name)
        .subscribe(
          (playerStats: Player) => this.player = playerStats,
          () => console.error(`Error with getting ${this.name} stats!`),
          () => {
            this.player.image = this.imageSrc;
            this.player.team_image = this.teamImage;
            this.player.is_favorite = !this.isFavorite;
            this.isFavorite = this.player.is_favorite;

            this.isPlayerInit = true;
            this.favoriteEvent.emit(this.player);
          });
    } else {
      this.player.is_favorite = !this.isFavorite;
      this.isFavorite = this.player.is_favorite;
      this.favoriteEvent.emit(this.player);
    }

    this.toggleHeartColor();
  }

  changeIsFavorite($event: boolean) {
    this.isFavorite = $event;
    this.player.is_favorite = $event;
    this.favoriteEvent.emit(this.player);

    this.heartImage = (this.isFavorite)
      ? '/src/assets/images/favorite-pink.png'
      : '/src/assets/images/favorite-grey.png';
  }

  private toggleHeartColor() {
    if (this.heartImage === '/src/assets/images/favorite-grey.png') {
      this.heartImage = '/src/assets/images/favorite-pink.png';
    } else {
      this.heartImage = '/src/assets/images/favorite-grey.png';
    }
  }

  getTeamImage() {
    const splitTeamName = this.team.split(' ');
    const folderPath = '/src/assets/images/teams/';
    let imageName = '';

    splitTeamName.forEach((word: string) => {
      imageName += word;
    });

    imageName = `${imageName}.png`;

    return `${folderPath}/${imageName}`;
  }

  editPlayer() {
    if (!this.isPlayerInit) {
      this.playersService.getPlayerStats(this.name)
        .subscribe(
          (playerStats: Player) => this.player = playerStats,
          () => console.error(`Error with getting ${this.name} stats!`),
          () => {
            this.player.image = this.imageSrc;
            this.player.team_image = this.teamImage;
            this.player.is_favorite = !this.isFavorite;
            this.isFavorite = this.player.is_favorite;

            this.showModal = true;
            this.isPlayerInit = true;
          });
    } else {
      this.showModal = true;
    }
  }

  closeModal() {
    this.showModal = false;
  }

  private checkForPlayerImage() {
    setTimeout(() => {
      if (!this.isImageLoaded) {
        this.imageSrc = '/src/assets/images/default_player.png';
        this.isImageLoaded = true;
      }
    }, 5000);
  }
}
