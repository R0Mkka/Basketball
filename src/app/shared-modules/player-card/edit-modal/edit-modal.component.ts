import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Player } from 'src/app/dataTypes/player';
import { icons } from 'src/app/config/icons';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditModalComponent implements OnInit {
  @Input() set playerSettings(player: Player) {
    if (!player) {
      return;
    }

    this.player = player;
    this.playerControl.patchValue(player);
  };
  @Output() favoriteStateChanged = new EventEmitter<boolean>();
  @Output() modalClosed = new EventEmitter<any>();

  public player: Player;
  public favoriteStateImage: string;
  public playerControl: FormControl;

  constructor() {
    this.playerControl = new FormControl('');
  }

  ngOnInit() {
    this.favoriteStateImage = (this.player.is_favorite)
      ? icons.favorite.active
      : icons.favorite.inactive;
  }

  public toggleFavoriteState(): void {
    this.player.is_favorite = !this.player.is_favorite;
    this.favoriteStateChanged.emit(this.player.is_favorite);
    this.toggleHeartColor();
  }

  public closeModal(): void {
    this.modalClosed.emit();
  }

  private toggleHeartColor(): void {
    if (this.favoriteStateImage === icons.favorite.inactive) {
      this.favoriteStateImage = icons.favorite.active;
    } else {
      this.favoriteStateImage = icons.favorite.inactive;
    }
  }
}
