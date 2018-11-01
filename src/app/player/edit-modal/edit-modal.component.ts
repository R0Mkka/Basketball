import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Player } from 'src/app/dataTypes/player';

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
      ? '/src/assets/images/favorite-pink.png'
      : '/src/assets/images/favorite-grey.png';
  }

  public favoriteToggle() {
    this.player.is_favorite = !this.player.is_favorite;
    this.favoriteChanged.emit(this.player.is_favorite);
    this.toggleHeartColor();
  }

  public closeModal() {
    this.modalClosed.emit();
  }

  private toggleHeartColor() {
    if (this.heartImage === '/src/assets/images/favorite-grey.png') {
      this.heartImage = '/src/assets/images/favorite-pink.png';
    } else {
      this.heartImage = '/src/assets/images/favorite-grey.png';
    }
  }
}
