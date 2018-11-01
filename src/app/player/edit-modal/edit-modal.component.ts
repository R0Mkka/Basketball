import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Player } from 'src/app/dataTypes/player';
import { icons } from 'src/app/config/icons';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {
  @Input() player: Player;
  @Output() favoriteChanged = new EventEmitter<boolean>();
  @Output() modalClosed = new EventEmitter<any>();

  heartImage = '';

  ngOnInit() {
    this.heartImage = (this.player.is_favorite)
      ? icons.favorite.active
      : icons.favorite.inactive;
  }

  public toggleFavoriteState() {
    this.player.is_favorite = !this.player.is_favorite;
    this.favoriteChanged.emit(this.player.is_favorite);
    this.toggleHeartColor();
  }

  public closeModal() {
    this.modalClosed.emit();
  }

  private toggleHeartColor() {
    if (this.heartImage === icons.favorite.inactive) {
      this.heartImage = icons.favorite.active;
    } else {
      this.heartImage = icons.favorite.inactive;
    }
  }
}
