import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TeamListService } from './team-list.service';
import { ProgressBarService } from 'src/app/shared-modules/progress-bar/progress-bar.service';

import { Team } from 'src/app/dataTypes/team';

@Component({
    selector: 'app-teams',
    templateUrl: './team-list.component.html',
    styleUrls: ['./team-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamListComponent implements OnInit{
    public teamList$: Observable<Team[]>;
    public showLoading: boolean;

    constructor(
        private teamListSerivce: TeamListService,
        private progressBar: ProgressBarService) {
            this.showLoading = true;
        }

    ngOnInit() {
        this.initTeams();
    }

    private initTeams(): void {
        this.teamList$ = this.teamListSerivce.getTeamsAsArray()
            .pipe(
                map((teams: Team[]) => {
                    this.showLoading = false;
                    this.progressBar.emitContentLoaded();

                    return teams;
                })
            );
    }
}