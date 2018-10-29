import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Player } from '../player';

@Component({
  selector: 'app-player-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() player: Player;
  @Output() favoriteChanged = new EventEmitter<boolean>();
  @Output() modalClosed = new EventEmitter<any>();

  heartImage = '';

  ngOnInit() {
    console.log(this.player.is_favorite);

    this.heartImage = (this.player.is_favorite)
      ? '/src/assets/images/favorite-pink.png'
      : '/src/assets/images/favorite-grey.png';
  }

  favoriteToggle() {
    this.player.is_favorite = !this.player.is_favorite;
    this.favoriteChanged.emit(this.player.is_favorite);
    this.toggleHeartColor();
  }

  closeModal() {
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
