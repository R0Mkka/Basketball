import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { PlayersService } from '../../player/players.service';
import { Player } from '../../player/player';

import { LocalStorageService } from '../../../../core/local-storage/local-storage.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  providers: [ PlayersService ]
})
export class PlayerComponent implements OnInit {
  @Input() name: string;
  @Input() team: string;
  @Input() gamesPlayed: string;
  @Input() tpp: string;
  @Input() imageSrc: string;
  @Output() favoriteActionEvent = new EventEmitter<Player>();
  @Output() loading = new EventEmitter<boolean>();

  player: Player;
  isPlayerInit = false;
  isFavorite = false;
  showEditModal = false;
  isImageLoaded = false;
  teamImage = '';
  heartImage = '/src/assets/images/favorite-grey.png';

  isEditDisabled = true;

  constructor(private playersService: PlayersService, private storage: LocalStorageService) {
    this.checkForPlayerImage();
  }

  ngOnInit() {
    if (this.playersService.has(this.name)) {
      this.isFavorite = true;
      this.heartImage = '/src/assets/images/favorite-pink.png';
    }
  }

  imageLoaded() {
    this.isImageLoaded = true;
    this.teamImage = this.getTeamImage();
    this.isEditDisabled = false;
  }

  favoriteStateChange() {
    this.loading.emit(true);

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

            if (this.isFavorite) {
              this.storage.set(this.name, "0");
            } else {
              this.storage.remove(this.name);
            }

            this.isPlayerInit = true;
            this.favoriteActionEvent.emit(this.player);
            this.loading.emit(false);
          });
    } else {
      this.player.is_favorite = !this.isFavorite;
      this.isFavorite = this.player.is_favorite;

      if (this.isFavorite) {
        this.storage.set(this.name, "0");
      } else {
        this.storage.remove(this.name);
      }

      this.favoriteActionEvent.emit(this.player);
      this.loading.emit(false);
    }

    this.toggleHeartColor();
  }

  changeFavoriteState($event: boolean) {
    if ($event) {
      this.storage.set(this.name, "0");
    } else {
      this.storage.remove(this.name);
    }

    this.isFavorite = $event;
    this.player.is_favorite = $event;
    this.favoriteActionEvent.emit(this.player);

    this.heartImage = (this.isFavorite)
      ? '/src/assets/images/favorite-pink.png'
      : '/src/assets/images/favorite-grey.png';
  }
 
  editPlayer() {
    if (!this.isEditDisabled) {
      this.loading.emit(true);

      if (!this.isPlayerInit) {
        this.playersService.getPlayerStats(this.name)
          .subscribe(
            (playerInfo: Player) => this.player = playerInfo,
            () => console.error(`Error with getting ${this.name} stats!`),
            () => {
              this.player.image = this.imageSrc;
              this.player.team_image = this.teamImage;
              this.player.is_favorite = this.isFavorite;
              this.isPlayerInit = true;

              this.loading.emit(false);
              this.showEditModal = true;
            });
      } else {
        this.showEditModal = true;
        this.loading.emit(false);
      }
    }
  }

  closeModal() {
    this.showEditModal = false;
  }

  private toggleHeartColor() {
    if (this.heartImage === '/src/assets/images/favorite-grey.png') {
      this.heartImage = '/src/assets/images/favorite-pink.png';
    } else {
      this.heartImage = '/src/assets/images/favorite-grey.png';
    }
  }

  private getTeamImage() {
    const splitTeamName = this.team.split(' ');
    const folderPath = '/src/assets/images/teams/';
    let imageName = '';

    splitTeamName.forEach((word: string) => {
      imageName += word;
    });

    imageName = `${imageName}.png`;

    return `${folderPath}/${imageName}`;
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
