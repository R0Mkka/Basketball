import { Component } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';

import { TeamsService } from '../team/teams.service';

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.css'],
    providers: [ TeamsService ]
})
export class TeamsComponent {
    public teamsList: any[];
    public teamsNames: string[];

    public showLoading = false;

    constructor(private teamsService: TeamsService) {
        this.showLoading = true;
        this.initTeams();
    }

    private initTeams() {
        this.teamsService.getTeams()
            .pipe(
                tap(
                    value => {
                        this.teamsList = value;
                        this.teamsNames = Object.keys(value);
                    },
                    () => console.error('Error with getting teams!!!'),
                    () => {
                        this.showLoading = false;
                    }
                ),
                catchError(() => ([]))
            ).subscribe();
    }
}