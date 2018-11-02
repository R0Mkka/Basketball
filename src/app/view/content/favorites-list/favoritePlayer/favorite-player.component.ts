import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Player } from 'src/app/dataTypes/player';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite-player.component.html',
  styleUrls: ['./favorite-player.component.css']
})
export class FavoritePlayerComponent implements OnInit {
  @Input() player: Player;
  @Output() favoriteEvent = new EventEmitter<Player>();
  @Output() loading = new EventEmitter<boolean>();
  @Output() backdrop = new EventEmitter<boolean>();

  public name: string;
  public teamName: string;
  public gamesPlayed: string;
  public tpp: string;
  public imageSrc: string;

  public showModal: boolean;
  public isImageLoaded: boolean;
  public teamImage: string;
  public favoriteStateImage: string;

  private isEditDisabled: boolean;

  constructor() {
    this.showModal = false;
    this.isImageLoaded = false;
    this.teamImage = '';
    this.favoriteStateImage = '/src/assets/images/favorite-pink.png';

    this.isEditDisabled = true;
      
    this.checkForPlayerImage();
  }

  ngOnInit() {
    this.player.is_favorite = true;

    this.name = this.player.name;
    this.teamName = this.player.team_name;
    this.gamesPlayed = this.player.games_played;
    this.tpp = this.player.three_point_percentage;
    this.imageSrc = this.player.image;
  }

  public imageLoaded() {
    this.isImageLoaded = true;
    this.teamImage = this.getTeamImage();
    this.isEditDisabled = false;
  }

  public toggleFavoriteState() {
    this.loading.emit(true);
    this.backdrop.emit(true);

    this.player.is_favorite = !this.player.is_favorite;

    this.favoriteEvent.emit(this.player);
    this.loading.emit(false);
    this.backdrop.emit(false);

    this.toggleHeartColor();
  }

  changeIsFavorite($event: boolean) {
    this.player.is_favorite = $event;
    this.favoriteEvent.emit(this.player);

    this.favoriteStateImage = (this.player.is_favorite)
      ? '/src/assets/images/favorite-pink.png'
      : '/src/assets/images/favorite-grey.png';
  }

  private toggleHeartColor() {
    if (this.favoriteStateImage === '/src/assets/images/favorite-grey.png') {
      this.favoriteStateImage = '/src/assets/images/favorite-pink.png';
    } else {
      this.favoriteStateImage = '/src/assets/images/favorite-grey.png';
    }
  }

  getTeamImage() {
    const splitTeamName = this.teamName.split(' ');
    const folderPath = '/src/assets/images/teams/';
    let imageName = '';

    splitTeamName.forEach((word: string) => {
      imageName += word;
    });

    imageName = `${imageName}.png`;

    return `${folderPath}/${imageName}`;
  }

  editPlayer() {
    if (!this.isEditDisabled) {
      this.loading.emit(true);
      this.backdrop.emit(true);

      this.showModal = true;
      this.loading.emit(false);
      this.backdrop.emit(false);
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
    }, 10000);
  }
}
