import { Component } from '@angular/core';

import { LocalStorageService } from 'src/app/core/local-storage/local-storage.service';

import { PlayerListService } from '../player-list/player-list.service';
import { Player } from 'src/app/dataTypes/player';

@Component({
    selector: 'app-favorites-list',
    templateUrl: './favorites-list.component.html',
    styleUrls: ['./favorites-list.component.css']
})
export class FavoritesListComponent {
    public favoritesList: Player[];
    public isFavoritesListEmpty: boolean;
    public showLoading: boolean;
    public withBackdrop: boolean;
    public progressBar = { value: 0 }

    constructor(private playerListService: PlayerListService, 
                private storage: LocalStorageService) {
        this.favoritesList = [];
        this.isFavoritesListEmpty = false;
        this.showLoading = true;
        this.withBackdrop = false;
        this.initFavorites();
    }

    public setLoadingStatus($event: boolean): void {
        this.showLoading = $event;
    }

    public setBackdropStatus($event: boolean): void {
        this.withBackdrop = $event;
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

    private checkIsEmpty(): boolean {
        return this.favoritesList.length === 0;
    }

    private removeFromFavorites(playerName: string): void {
        this.favoritesList.forEach((favoritePlayer: Player, index: number) => {
            if (favoritePlayer.name === playerName) {
                this.favoritesList.splice(index, 1);
                return;
            }
        });
    }

    private initFavorites(): void {
        let players = [];
    
        this.playerListService.getPlayers()
            .subscribe(
                playersList => players = playersList,
                () => console.error('Error with getting players!!!'),
                () => {
                    players.forEach((player: Player) => {
                        if (this.storage.has(player.name)) {
                            player.image = this.playerListService.getPlayerImage(player);
                            player.team_image = this.getTeamImage(player);

                            this.favoritesList.push(player);
                        }
                    });

                    this.isFavoritesListEmpty = this.checkIsEmpty();
                    this.showLoading = false;
                    this.progressBar.value = 100;
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