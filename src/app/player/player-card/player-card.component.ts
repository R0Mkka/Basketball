import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { LocalStorageService } from 'src/app/core/local-storage/local-storage.service';

import { PlayerListService } from '../../view/content/player-list/player-list.service';
import { Player } from 'src/app/dataTypes/player';

import { icons } from 'src/app/config/icons';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent implements OnInit {
  @Input() name: string;
  @Input() team: string;
  @Input() gamesPlayed: string;
  @Input() tpp: string;
  @Input() imageSrc: string;
  @Output() favoriteActionEvent = new EventEmitter<Player>();
  @Output() loading = new EventEmitter<boolean>();
  @Output() backdrop = new EventEmitter<boolean>();

  player: Player;
  isPlayerInit = false;
  isFavorite = false;
  showEditModal = false;
  isImageLoaded = false;
  teamImage = '';
  heartImage = icons.favorite.inactive;

  isEditDisabled = true;

  constructor(private playerListService: PlayerListService, 
              private storage: LocalStorageService) {
    this.checkForPlayerImage();
  }

  ngOnInit() {
    if (this.storage.has(this.name)) {
      this.isFavorite = true;
      this.heartImage = icons.favorite.active;
    }
  }

  imageLoaded() {
    this.isImageLoaded = true;
    this.teamImage = this.getTeamImage();
    this.isEditDisabled = false;
  }

  favoriteStateChange() {
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

            if (this.isFavorite) {
              this.storage.set(this.name, "0");
            } else {
              this.storage.remove(this.name);
            }

            this.isPlayerInit = true;
            this.favoriteActionEvent.emit(this.player);
            this.loading.emit(false);
            this.backdrop.emit(false);
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
      this.backdrop.emit(false);
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
      ? icons.favorite.active
      : icons.favorite.inactive;
  }
 
  editPlayer() {
    if (!this.isEditDisabled) {
      this.loading.emit(true);
      this.backdrop.emit(true);

      if (!this.isPlayerInit) {
        this.playerListService.getPlayerStats(this.name)
          .subscribe(
            (playerInfo: Player) => this.player = playerInfo,
            () => console.error(`Error with getting ${this.name} stats!`),
            () => {
              this.player.image = this.imageSrc;
              this.player.team_image = this.teamImage;
              this.player.is_favorite = this.isFavorite;
              this.isPlayerInit = true;

              this.loading.emit(false);
              this.backdrop.emit(false);
              this.showEditModal = true;
            });
      } else {
        this.showEditModal = true;
        this.loading.emit(false);
        this.backdrop.emit(false);
      }
    }
  }

  closeModal() {
    this.showEditModal = false;
  }

  private toggleHeartColor() {
    if (this.heartImage === icons.favorite.inactive) {
      this.heartImage = icons.favorite.active;
    } else {
      this.heartImage = icons.favorite.inactive;
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
    }, 10000);
  }
}
