import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Player } from 'src/app/dataTypes/player';

@Component({
  selector: 'app-team',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css']
})
export class TeamCardComponent {
    @Input() teamName: string;
    @Input() acronym: string;
    @Input() imageSrc: string;
    @Input() info: string;

  @Output() showTeam = new EventEmitter<Array<Player>>();

  teamPlayers: Array<Player>;
  isImageLoaded = false;

  constructor(private router: Router) { }

  showTeamPlayers() {
    const splitTeamName = this.teamName.split('_')
      .map(word => {
        return word.toLowerCase();
      });

    const teamUrl = splitTeamName.join('-');

    this.router.navigate(
      ['/teams', teamUrl],
      {
        queryParams: {
          acronym: this.acronym
        }
      }
    );
  }

  getTeamImage() {
    const splitTeamName = this.teamName.split('_');
    const folderPath = '/src/assets/images/teams';
    let imageName = '';

    splitTeamName.forEach((word: string) => {
      imageName += word;
    });

    imageName = `${imageName}.png`;

    return `${folderPath}/${imageName}`;
  }

  getTeamName() {
    const splitTeamName = this.teamName.split('_');

    return splitTeamName.join(' ');
  }

  imageLoaded() {
    this.isImageLoaded = true;
  }
}
