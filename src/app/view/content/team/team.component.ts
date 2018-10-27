import { Component, Input } from '@angular/core';
import { TeamsService } from './teams.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  providers: [ TeamsService ]
})
export class TeamComponent {
  @Input() title: string;
  @Input() content: string;
  @Input() image: string;

  constructor() {}
}
