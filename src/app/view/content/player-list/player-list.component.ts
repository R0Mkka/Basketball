import { Component } from '@angular/core';

import { retry, tap, catchError } from 'rxjs/operators';

import { Player } from 'src/app/dataTypes/player';
import { PlayerListService } from './player-list.service';

import { LocalStorageService } from 'src/app/core/local-storage/local-storage.service';

@Component({
    selector: 'app-players',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent {
    public playersList: Player[];
    public playersCount: number;
    public playersPageSets: any[] = [];

    public currentPageSetIndex: number;
    public currentPageSet: Player[];

    public showLoading = false;
    public withBackdrop = false;

    public progressBar = {
        value: 0
    }

    constructor(private playerListService: PlayerListService, 
                private storage: LocalStorageService) {
        this.showLoading = true;
        this.initPlayers();
    }
    
    public showBackdrop($event: boolean) {
        this.withBackdrop = $event;
    }

    public setLoadingStatus($event: boolean) {
        this.showLoading = $event;
    }

    public toggleFavoriteState(player: Player) {
        if (!player.is_favorite) {
            this.storage.remove(player.name);
        } else {
            this.storage.set(player.name, "0");
        }
    }

    public setNewPageIndex($event) {
        this.currentPageSetIndex = $event.pageIndex;
        this.currentPageSet = this.playersPageSets[this.currentPageSetIndex];
    }

    private initPlayers() {
        this.playerListService.getPlayers()
        .pipe(
            retry(3),
            tap(
                (playersTotal: Array<any>) => {
                    this.playersList = playersTotal;
                },
                () => console.error('Error with getting players!!!'),
                () => {
                    this.playerListService.getPlayersImages(this.playersList).forEach((url, index) => {
                        this.playersList[index].image = url;
                    });
                    this.getPageSetsFromPlayers();
                    this.currentPageSetIndex = 0;
                    this.currentPageSet = this.playersPageSets[this.currentPageSetIndex];
                    this.playersCount = this.playersList.length;
                    
                    this.showLoading = false;
                    this.progressBar.value = 100;
                }
            ),
            catchError(() => ([]))
        ).subscribe();
    }

    private getPageSetsFromPlayers() {
        const playersForSet = 10;

        let startIndex = 0;
        let endIndex = playersForSet;

        for (let i = 0; i < this.playersList.length; i += playersForSet) {

            if (endIndex > this.playersList.length) {
                endIndex = this.playersList.length;
            }

            const set = this.playersList.slice(startIndex, endIndex);

            this.playersPageSets.push(set);

            startIndex += playersForSet;
            endIndex += playersForSet;
        }
    }
}