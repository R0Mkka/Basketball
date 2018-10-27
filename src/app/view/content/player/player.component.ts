import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
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
