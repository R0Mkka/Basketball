import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TeamsService } from './teams.service';
import { Player } from '../player/player';
import { PlayersService } from '../player/players.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  providers: [ TeamsService, PlayersService ]
})
export class TeamComponent {
  @Input() team: string;
  @Input() acronym: string;
  @Input() imageSrc: string;
  @Input() info: string;
  @Output() showTeam = new EventEmitter<Array<Player>>();

  teamPlayers: Array<Player>;
  isImageLoaded = false;

  constructor(private teamService: TeamsService,
              private playersService: PlayersService) { }

  showTeamPlayers() {
    this.teamService.getPlayersOfTheTeam(this.acronym)
      .subscribe(
        (value: Array<Player>) => this.teamPlayers = value,
        (error) => console.error('Error with getting players of the team ' + this.team),
        () => {
          this.playersService.getPlayersImages(this.teamPlayers).forEach((url, index) => {
            this.teamPlayers[index].image = url;
          });
          this.teamPlayers.forEach((plyer: Player, index) => {
            this.teamPlayers[index].team_image = this.getTeamImage();
          });

          this.showTeam.emit(this.teamPlayers);
        }
      );
  }

  getTeamImage() {
    const splitTeamName = this.team.split('_');
    const folderPath = '/src/assets/images/teams';
    let imageName = '';

    splitTeamName.forEach((word: string) => {
      imageName += word;
    });

    imageName = `${imageName}.png`;

    return `${folderPath}/${imageName}`;
  }

  getTeamName() {
    const splitTeamName = this.team.split('_');

    return splitTeamName.join(' ');
  }

  imageLoaded() {
    this.isImageLoaded = true;
  }
}
