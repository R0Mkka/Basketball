import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { LocalStorageService } from 'src/app/core/local-storage/local-storage.service';

import { ProgressBarService } from 'src/app/shared-modules/progress-bar/progress-bar.service';
import { PlayerListService } from '../player-list/player-list.service';
import { LoadingService } from 'src/app/shared-modules/loading/loading.service';

import { Player } from 'src/app/dataTypes/player';

@Component({
    selector: 'app-favorites-list',
    templateUrl: './favorites-list.component.html',
    styleUrls: ['./favorites-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesListComponent implements OnInit {
    public favoritesList: Player[];
    public isFavoritesListEmpty: boolean;

    constructor(
        private cdRef: ChangeDetectorRef,
        private progressBar: ProgressBarService,
        private playerListService: PlayerListService, 
        private storage: LocalStorageService,
        private loading: LoadingService) {
            this.isFavoritesListEmpty = false;
        }

    ngOnInit() {
        this.initFavorites();
    }

    public favoriteStateChange(player: Player): void {
        if (!player.is_favorite) {
            this.storage.remove(player.name);
            this.removeFromFavorites(player.name);
        } else {
            this.storage.set(player.name, "0");
        }

        this.isFavoritesListEmpty = this.checkIsEmpty();
    }

    private initFavorites(): void {
        this.playerListService.getPlayers().subscribe({
            next: (players: Player[]) => {
                const filtered = players.filter((player: Player) => {
                    return this.storage.has(player.name);
                });

                filtered.forEach((favorite: Player) => {
                    favorite.image = this.playerListService.getPlayerImage(favorite);
                    favorite.team_image = this.getTeamImage(favorite);
                });

                this.favoritesList = filtered;
            },
            complete: () => {
                this.isFavoritesListEmpty = this.checkIsEmpty();
                this.loading.hide();
                this.progressBar.emitContentLoaded();

                if (!this.cdRef['destroyed']) {
                    this.cdRef.detectChanges();
                }
            }
        });
    }

    private checkIsEmpty(): boolean {
        return this.favoritesList.length === 0;
    }

    private removeFromFavorites(playerName: string): void {
        this.favoritesList = this.favoritesList
            .filter((favorite: Player) => {
                return favorite.name !== playerName;
            });
    }

    private getTeamImage(player: Player): string {
        const splitTeamName = player.team_name.split(' ');
        const folderPath = '/src/assets/images/teams/';
        let imageName = '';

        splitTeamName.forEach((word: string) => {
            imageName += word;
        });

        const fullImageName = `${imageName}.png`;

        return `${folderPath}/${fullImageName}`;
    }
}