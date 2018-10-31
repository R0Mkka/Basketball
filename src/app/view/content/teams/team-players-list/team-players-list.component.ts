import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TeamsService } from '../../team/teams.service';
import { PlayersService } from '../../player/players.service';

import { Player } from '../../player/player';

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

    constructor(private teamsService: TeamsService,
                private playersService: PlayersService,
                private route: ActivatedRoute) {}

    ngOnInit() {
        this.showLoading = true;

        this.route.queryParams.subscribe(params => {
            const acronym = params['acronym'];

            this.teamsService.getPlayersOfTheTeam(acronym)
                .subscribe(
                    list => this.teamPlayersList = list,
                    () => console.error(`Error with getting ${acronym} players!!!`),
                    () => {
                        const imagesList = this.playersService.getPlayersImages(this.teamPlayersList);
                        
                        imagesList.forEach((imageUrl: string, index: number) => {
                            this.teamPlayersList[index].image = imageUrl;
                        });

                        this.playersLoaded = true;
                        this.showLoading = false;
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