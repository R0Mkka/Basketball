import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PlayersService } from './players.service';
import {Player} from './player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  providers: [ PlayersService ]
})
export class PlayerComponent {
  @Input() name: string;
  @Input() team: string;
  @Input() gamesPlayed: string;
  @Input() tpp: string;
  @Input() imageSrc: string;
  @Output() dataChanged = new EventEmitter<Object>();

  player: Player;
  showModal = false;
  isImageLoaded = false;
  teamImage = '';
  heartImage = '/src/assets/images/favorite-grey.png';

  constructor(private playersService: PlayersService) {
    this.checkForPlayerImage();
  }

  imageLoaded() {
    this.isImageLoaded = true;
    this.teamImage = this.getTeamImage();
  }

  toggleHeartColor() {
    if (this.heartImage === '/src/assets/images/favorite-grey.png') {
      this.heartImage = '/src/assets/images/favorite-pink.png';
    } else {
      this.heartImage = '/src/assets/images/favorite-grey.png';
    }
  }

  getTeamImage() {
    const splitTeamName = this.team.split(' ');
    const folderPath = '/src/assets/images/teams/';
    let imageName = '';

    splitTeamName.forEach((word: string) => {
      imageName += word;
    });

    imageName = `${imageName}.png`;

    return `${folderPath}/${imageName}`;
  }

  editPlayer() {
    this.playersService.getPlayerStats(this.name)
      .subscribe(
        (playerStats: Player) => this.player = playerStats,
        () => console.error(`Error with getting ${this.name} stats!`),
        () => {
          this.player.image = this.imageSrc;
          this.player.team_image = this.teamImage;

          this.showModal = true;
        });
  }

  closeModal() {
    this.showModal = false;
  }

  private checkForPlayerImage() {
    setTimeout(() => {
      if (!this.isImageLoaded) {
        this.imageSrc = '/src/assets/images/noQuestion.png';
        this.isImageLoaded = true;
      }
    }, 5000);
  }
}
