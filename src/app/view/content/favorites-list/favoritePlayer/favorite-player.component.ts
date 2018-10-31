import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { LocalStorageService } from 'src/app/core/local-storage/local-storage.service';
import { PlayerListService } from '../../player-list/player-list.service';
import { Player } from 'src/app/dataTypes/player';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite-player.component.html',
  styleUrls: ['./favorite-player.component.css']
})
export class FavoritePlayerComponent {
  @Input() name: string;
  @Input() team: string;
  @Input() gamesPlayed: string;
  @Input() tpp: string;
  @Input() imageSrc: string;
  @Output() dataChanged = new EventEmitter<Object>();
  @Output() favoriteEvent = new EventEmitter<Player>();
  @Output() loading = new EventEmitter<boolean>();
  @Output() backdrop = new EventEmitter<boolean>();

  player: Player;
  isPlayerInit = false;
  isFavorite = false;
  showModal = false;
  isImageLoaded = false;
  teamImage = '';
  heartImage = '/src/assets/images/favorite-grey.png';

  isEditDisabled = true;

  constructor(private playerListService: PlayerListService,
              private storage: LocalStorageService) {
    this.checkForPlayerImage();
  }

  ngOnInit() {
    if (this.storage.has(this.name)) {
      this.isFavorite = true;
      this.heartImage = '/src/assets/images/favorite-pink.png';
    }
  }

  imageLoaded() {
    this.isImageLoaded = true;
    this.teamImage = this.getTeamImage();
    this.isEditDisabled = false;
  }

  toggleFavorite() {
    this.loading.emit(true);
    this.backdrop.emit(true);

    if (!this.isPlayerInit) {
      this.playerListService.getPlayerStats(this.name)
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
            this.loading.emit(false);
            this.backdrop.emit(false);
          });
    } else {
      this.player.is_favorite = !this.isFavorite;
      this.isFavorite = this.player.is_favorite;
      this.favoriteEvent.emit(this.player);
      this.loading.emit(false);
      this.backdrop.emit(false);
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
    if (!this.isEditDisabled) {
      this.loading.emit(true);
      this.backdrop.emit(true);

      if (!this.isPlayerInit) {
        this.playerListService.getPlayerStats(this.name)
          .subscribe(
            (playerStats: Player) => {
              this.player = playerStats;
            },
            () => console.error(`Error with getting ${this.name} stats!`),
            () => {
              this.player.image = this.imageSrc;
              this.player.team_image = this.teamImage;
              this.player.is_favorite = this.isFavorite;
  
              this.showModal = true;
              this.isPlayerInit = true;
              this.loading.emit(false);
              this.backdrop.emit(false);
            });
      } else {
        this.showModal = true;
        this.loading.emit(false);
        this.backdrop.emit(false);
      }
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
