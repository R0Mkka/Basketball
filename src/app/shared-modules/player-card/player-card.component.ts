import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

import { LocalStorageService } from 'src/app/core/local-storage/local-storage.service';

import { Player } from 'src/app/dataTypes/player';
import { icons } from 'src/app/config/icons';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerCardComponent implements OnInit {
  @Input() player: Player;
  @Output() favoriteActionEvent = new EventEmitter<Player>();

  public isEditModal: boolean;
  public isPlayerImageLoaded: boolean;
  public isTeamImageLoaded: boolean;
  public favoriteStateImage: string;

  private isEditDisabled: boolean;

  constructor(
    private storage: LocalStorageService,
    private cdRef: ChangeDetectorRef) {
      this.isEditModal = false;
      this.isPlayerImageLoaded = false;
      this.isTeamImageLoaded = false;
      this.favoriteStateImage = icons.favorite.inactive;

      this.isEditDisabled = true;
        
      this.checkForPlayerImage();
    }

  ngOnInit() {
    // console.log(this.player);

    if (this.storage.has('favorites')) {
      const favoritesList = JSON.parse(this.storage.get('favorites'));

      favoritesList.forEach((player: Player) => {
        if (player.name === this.player.name) {
          this.player.is_favorite = true;
          this.favoriteStateImage = icons.favorite.active;
          return;
        }
      });
    } else {
      this.storage.set('favorites', '[]');

      this.player.is_favorite = false;
      this.favoriteStateImage = icons.favorite.inactive;
    }
  }

  public playerImageLoaded(): void {
    this.isPlayerImageLoaded = true;
    this.player.team_image = this.getTeamImage();
    this.isTeamImageLoaded = true;
    this.isEditDisabled = false;
  }

  public toggleFavoriteState(): void {
    this.player.is_favorite = !this.player.is_favorite;
    this.changeFavoriteState(this.player.is_favorite);
  }

  public changeFavoriteState(isFavorite: boolean): void {
    if (isFavorite) {
      if (this.storage.has('favorites')) {
        const favoritesJSON = this.storage.get('favorites');
        const favoritesArray: Player[] = JSON.parse(favoritesJSON);

        favoritesArray.push(this.player);
        this.storage.set('favorites', JSON.stringify(favoritesArray));
      } else {
        const favoritesArray: Player[] = [];

        favoritesArray.push(this.player);
        this.storage.set('favorites', JSON.stringify(favoritesArray));
      }

      // console.log(this.storage.get('favorites'));
    } else {
      if (this.storage.has('favorites')) {
        const favoritesJSON = this.storage.get('favorites');
        const favoritesArray: Player[] = JSON.parse(favoritesJSON);

        favoritesArray.forEach((player: Player, index: number) => {
          if (player.name === this.player.name) {
            favoritesArray.splice(index, 1);
          }
        });

        this.storage.set('favorites', JSON.stringify(favoritesArray));
        // console.log(this.storage.get('favorites'));
      }
    }

    this.player.is_favorite = isFavorite;
    this.favoriteActionEvent.emit(this.player);

    this.toggleHeartColor();
  }

  private toggleHeartColor() {
    this.favoriteStateImage = (this.player.is_favorite)
      ? icons.favorite.active
      : icons.favorite.inactive;
  }
 
  public showEditModal(): void {
    if (!this.isEditDisabled) {
      this.isEditModal = true;

      if (this.storage.has(this.player.name)) {
        this.player = JSON.parse(this.storage.get(this.player.name));
      }
    }
  }

  public closeEditModal(): void {
    this.isEditModal = false;
  }

  private getTeamImage(): string {
    const splitTeamName = this.player.team_name.split(' ');
    const folderPath = '/src/assets/images/teams/';
    let imageName = '';

    splitTeamName.forEach((word: string) => {
      imageName += word;
    });

    imageName = `${imageName}.png`;

    return `${folderPath}/${imageName}`;
  }

  private checkForPlayerImage(): void {
    setTimeout(() => {
      if (!this.isPlayerImageLoaded) {
        this.player.image = '/src/assets/images/default_player.png';
        this.isPlayerImageLoaded = true;

        if (!this.cdRef['destroyed']) {
          this.cdRef.detectChanges();
        }
      }
    }, 10000);
  }
}
