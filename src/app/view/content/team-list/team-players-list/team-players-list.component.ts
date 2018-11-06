import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { TeamListService } from '../../team-list/team-list.service';
import { PlayerListService } from '../../player-list/player-list.service';
import { ProgressBarService } from 'src/app/shared-modules/progress-bar/progress-bar.service';

import { Player } from 'src/app/dataTypes/player';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-team-players-list',
    templateUrl: './team-players-list.component.html',
    styleUrls: ['./team-players-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamPlayersListComponent implements OnInit {
    public showLoading: boolean;
    public withBackdrop: boolean;
    public playerList$: Observable<Player[]>;

    constructor(
        private teamListService: TeamListService,
        private playerListService: PlayerListService,
        private progressBar: ProgressBarService,
        private route: ActivatedRoute) {
            this.showLoading = true;
            this.withBackdrop = false;
        }

    ngOnInit() {
        this.initTeamPlayers();
    }

    public setLoadingStatus($event: boolean): void {
        this.showLoading = $event;
    }

    public setBackdropStatus($event: boolean): void {
        this.withBackdrop = $event;
    }

    private initTeamPlayers(): void {
        this.route.queryParams.subscribe(params => {
            const acronym = params['acronym'];

            this.playerList$ = this.teamListService.getPlayersOfTheTeam(acronym)
                .pipe(
                    map((players: Player[]) => {
                        players.map((player: Player) => {
                            player.image = this.playerListService.getPlayerImage(player);
                            return player;
                        });

                        this.showLoading = false;
                        this.progressBar.emitContentLoaded();

                        return players;
                    })
                );
        });
    }
}