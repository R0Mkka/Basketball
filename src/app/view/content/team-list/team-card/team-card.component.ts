import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { SlideToggleService } from 'src/app/core/slide-toggle/slide-toggle.serivce';

@Component({
  selector: 'app-team',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamCardComponent {
  @Input() teamName: string;
  @Input() acronym: string;
  @Input() image: string;
  @Input() info: string;

  public isTeamImageLoaded: boolean;

  constructor(
    private router: Router, private slideToggle: SlideToggleService) {
      this.isTeamImageLoaded = false;
    }

  public showTeamPlayers(): void {
    this.slideToggle.changeState(false);

    const splitTeamName = this.teamName.split('_')
      .map(word => word.toLowerCase());

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

  public getTeamName(): string {
    const splitTeamName = this.teamName.split('_');

    return splitTeamName.join(' ');
  }

  public teamImageLoaded(): void {
    this.isTeamImageLoaded = true;
  }
}
