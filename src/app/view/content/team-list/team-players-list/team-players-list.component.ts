import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TeamListService } from '../../team-list/team-list.service';
import { PlayerListService } from '../../player-list/player-list.service';

import { Player } from 'src/app/dataTypes/player';

@Component({
    selector: 'app-team-players-list',
    templateUrl: './team-players-list.component.html',
    styleUrls: ['./team-players-list.component.css']
})
export class TeamPlayersListComponent implements OnInit {
    public teamPlayersList: Player[];
    public playersLoaded = false;

    public showLoading = false;
    public withBackdrop = false;

    public progressBar = {
        value: 0
    }

    constructor(private teamListService: TeamListService,
                private playerListService: PlayerListService,
                private route: ActivatedRoute) {}

    ngOnInit() {
        this.showLoading = true;

        this.route.queryParams.subscribe(params => {
            const acronym = params['acronym'];

            this.teamListService.getPlayersOfTheTeam(acronym)
                .subscribe(
                    list => this.teamPlayersList = list,
                    () => console.error(`Error with getting ${acronym} players!!!`),
                    () => {
                        const imagesList = this.playerListService
                            .getPlayersImages(this.teamPlayersList);
                        
                        imagesList.forEach((imageUrl: string, index: number) => {
                            this.teamPlayersList[index].image = imageUrl;
                        });

                        this.playersLoaded = true;
                        this.showLoading = false;
                        this.progressBar.value = 100;
                    });
        });
    }

    public showBackdrop($event: boolean) {
        this.withBackdrop = $event;
    }

    public setLoadingStatus($event: boolean) {
        this.showLoading = $event;
    }
}