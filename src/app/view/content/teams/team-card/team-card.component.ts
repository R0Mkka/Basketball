import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { TeamsService } from '../../team/teams.service';
import { PlayersService } from '../../player/players.service';

import { Player } from '../../player/player';

@Component({
  selector: 'app-team',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css'],
  providers: [ TeamsService, PlayersService ]
})
export class TeamCardComponent {
    @Input() teamName: string;
    @Input() acronym: string;
    @Input() imageSrc: string;
    @Input() info: string;

  @Output() showTeam = new EventEmitter<Array<Player>>();

  teamPlayers: Array<Player>;
  isImageLoaded = false;

  constructor(private teamService: TeamsService,
              private playersService: PlayersService,
              private router: Router) { }

  // showTeamPlayers() {
  //   this.teamService.getPlayersOfTheTeam(this.acronym)
  //     .subscribe(
  //       (value: Array<Player>) => this.teamPlayers = value,
  //       (error) => console.error('Error with getting players of the team ' + this.teamName),
  //       () => {
  //         this.playersService.getPlayersImages(this.teamPlayers).forEach((url, index) => {
  //           this.teamPlayers[index].image = url;
  //         });
  //         this.teamPlayers.forEach((plyer: Player, index) => {
  //           this.teamPlayers[index].team_image = this.getTeamImage();
  //         });

  //         this.showTeam.emit(this.teamPlayers);
  //       }
  //     );
  // }

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
