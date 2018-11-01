import { Component } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';

import { TeamListService } from './team-list.service';

@Component({
    selector: 'app-teams',
    templateUrl: './team-list.component.html',
    styleUrls: ['./team-list.component.css']
})
export class TeamListComponent {
    public teamList: any[];
    public teamsNames: string[];

    public showLoading = false;

    public progressBar = {
        value: 0
    }

    constructor(private teamListSerivce: TeamListService) {
        this.showLoading = true;
        this.initTeams();
    }

    private initTeams() {
        this.teamListSerivce.getTeams()
            .pipe(
                tap(
                    value => {
                        this.teamList = value;
                        this.teamsNames = Object.keys(value);
                    },
                    () => console.error('Error with getting teams!!!'),
                    () => {
                        this.showLoading = false;
                        this.progressBar.value = 100;
                    }
                ),
                catchError(() => ([]))
            ).subscribe();
    }
}