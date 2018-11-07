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

  constructor(private storage: LocalStorageService, private cdr: ChangeDetectorRef) {
    this.isEditModal = false;
    this.isPlayerImageLoaded = false;
    this.isTeamImageLoaded = false;
    this.favoriteStateImage = icons.favorite.inactive;

    this.isEditDisabled = true;
      
    this.checkForPlayerImage();
  }

  ngOnInit() {
    if (this.storage.has(this.player.name)) {
      this.player.is_favorite = true;
      this.favoriteStateImage = icons.favorite.active;
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
      this.storage.set(this.player.name, "0");
    } else {
      this.storage.remove(this.player.name);
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

        if (!this.cdr['destroyed']) {
          this.cdr.detectChanges();
        }
      }
    }, 10000);
  }
}
