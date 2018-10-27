import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() title: string;
  @Input() content: string;
  @Input() imageSrc: string;

  isImageLoaded = false;
  heartImage = '/src/assets/images/heart-grey.png';

  imageLoaded() {
    this.isImageLoaded = true;
  }

  changeHeartColor() {
    if (this.heartImage === '/src/assets/images/heart-grey.png') {
      this.heartImage = '/src/assets/images/heart-red.png';
    } else {
      this.heartImage = '/src/assets/images/heart-grey.png';
    }
  }
}
