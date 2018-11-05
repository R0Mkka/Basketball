import { Component } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';

import { TeamListService } from './team-list.service';
import { ProgressBarService } from 'src/app/shared-modules/progress-bar/progress-bar.service';

import { Team } from 'src/app/dataTypes/team';

@Component({
    selector: 'app-teams',
    templateUrl: './team-list.component.html',
    styleUrls: ['./team-list.component.css']
})
export class TeamListComponent {
    public teamList: Team[];
    public teamsNames: string[];
    public showLoading = false;

    constructor(private teamListSerivce: TeamListService,
                private progressBar: ProgressBarService) {
        this.showLoading = true;
        this.initTeams();
    }

    private initTeams() {
        this.teamListSerivce.getTeams().pipe(
            tap(
                (teams: Team[]) => {
                    this.teamList = teams;
                    this.teamsNames = Object.keys(teams);
                },
                () => console.error('Error with getting teams!!!'),
                () => {
                    this.progressBar.emitContentLoaded();
                    this.showLoading = false;
                }
            ),
            catchError(() => ([]))
        ).subscribe();
    }
}