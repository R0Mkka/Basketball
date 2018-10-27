import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../player';

@Component({
  selector: 'app-player-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() player: Player;
  @Output() modalClosed = new EventEmitter<any>();

  isImageLoaded = false;
  heartImage = '/src/assets/images/favorite-grey.png';

  imageLoaded() {
    this.isImageLoaded = true;
  }

  toggleHeartColor() {
    if (this.heartImage === '/src/assets/images/favorite-grey.png') {
      this.heartImage = '/src/assets/images/favorite-pink.png';
    } else {
      this.heartImage = '/src/assets/images/favorite-grey.png';
    }
  }

  closeModal() {
    this.modalClosed.emit();
  }
}
