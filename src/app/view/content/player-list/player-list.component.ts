import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { retry, tap } from 'rxjs/operators';

import { LocalStorageService } from 'src/app/core/local-storage/local-storage.service';

import { SortPlayersService } from 'src/app/core/sort-players/sort-players.service';
import { ProgressBarService } from 'src/app/shared-modules/progress-bar/progress-bar.service';
import { PlayerListService } from './player-list.service';
import { LoadingService } from 'src/app/shared-modules/loading/loading.service';

import { Player } from 'src/app/dataTypes/player';

@Component({
    selector: 'app-players',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerListComponent implements OnInit, OnDestroy {
    public playersList: Player[];
    public playersCount: number;
    public playersPageSets: Array<Player[]> = [];
    public playersLoaded: boolean;

    public currentPageSetIndex: number;
    public currentPageSet: Player[];

    private onSortSubscription: Subscription;

    constructor(
        private cdRef: ChangeDetectorRef,
        private playerListService: PlayerListService, 
        private sortPlayersService: SortPlayersService,
        private progressBar: ProgressBarService,
        private storage: LocalStorageService,
        private loading: LoadingService) {
            this.playersLoaded = false;
        }

    ngOnInit() {
        this.initPlayers();
        this.subscribeOnSort();        
    }

    ngOnDestroy() {
        this.onSortSubscription.unsubscribe();
    }

    public toggleFavoriteState(player: Player): void {
        if (!player.is_favorite) {
            this.storage.remove(player.name);
        } else {
            this.storage.set(player.name, "0");
        }
    }

    public setNewPageIndex($event): void {
        this.currentPageSetIndex = $event.pageIndex;
        this.currentPageSet = this.playersPageSets[this.currentPageSetIndex];
    }

    private initPlayers(): void {
        const tempSubscription = this.playerListService.getPlayers().pipe(
            retry(3),
            tap({
                next: (players: Player[]) => {
                    this.playersList = players.map((player: Player) => {
                        if (this.storage.has(player.name)) {
                            player = JSON.parse(this.storage.get(player.name));
                        }
                        player.image = this.playerListService.getPlayerImage(player);

                        return player;
                    });

                    this.initPageSets();
                },
                error: (error) => {
                    console.error('Error with getting players!!!');
                    console.error('Error: ' + error);
                },
                complete: () => {
                    this.currentPageSetIndex = 0;
                    this.currentPageSet = this.playersPageSets[0];
                    this.playersCount = this.playersList.length;
                    this.playersLoaded = true;

                    this.progressBar.emitContentLoaded();
                    this.loading.hide();

                    if (!this.cdRef['destroyed']) {
                        this.cdRef.detectChanges();
                    }
                    tempSubscription.unsubscribe();
                }
            })
        ).subscribe();
    }

    private initPageSets(): void {
        this.playersPageSets = [];
        const playersForOneSet = 10;

        let startIndex = 0;
        let endIndex = playersForOneSet;

        for (let i = 0; i < this.playersList.length; i += playersForOneSet) {
            if (endIndex > this.playersList.length) {
                endIndex = this.playersList.length;
            }

            const singleSet = this.playersList.slice(startIndex, endIndex);

            this.playersPageSets.push(singleSet);

            startIndex += playersForOneSet;
            endIndex += playersForOneSet;
        }
    }

    // private getTeamImage(): string {
    //     const splitTeamName = this.player.team_name.split(' ');
    //     const folderPath = '/src/assets/images/teams/';
    //     let imageName = '';

    //     splitTeamName.forEach((word: string) => {
    //         imageName += word;
    //     });

    //     imageName = `${imageName}.png`;

    //     return `${folderPath}/${imageName}`;
    // }

    private subscribeOnSort() {
        this.onSortSubscription = this.sortPlayersService.sortEvent.subscribe({
            next: (players: Player[]) => {
                this.loading.show(true);
                this.playersLoaded = false;

                players.map((player: Player) => {
                    player.image = this.playerListService.getPlayerImage(player);
                });
                
                this.playersList = players;
                this.initPageSets();

                this.currentPageSetIndex = 0;
                this.currentPageSet = this.playersPageSets[0];
                this.playersCount = this.playersList.length;

                this.playersLoaded = true;
                this.loading.hide();
                if (!this.cdRef['destroyed']) {
                    this.cdRef.detectChanges();
                }
            },
            error: (error) => {
                console.error('Error with sorting players!!!');
                console.error('Error: ' + error);
            }
        });
    }
}