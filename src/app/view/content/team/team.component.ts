import { Component, Input } from '@angular/core';
import { TeamsService } from './teams.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  providers: [ TeamsService ]
})
export class TeamComponent {
  @Input() team: string;
  @Input() acronym: string;
  @Input() imageSrc: string;
  @Input() info: string;

  isImageLoaded = false;

  getTeamName() {
    const splitTeamName = this.team.split('_');

    return splitTeamName.join(' ');
  }

  imageLoaded() {
    this.isImageLoaded = true;
  }
}
