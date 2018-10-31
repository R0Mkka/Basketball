import { Component, DoCheck } from '@angular/core';

import { Player } from '../player/player';
import { LocalStorageService } from '../../../core/local-storage/local-storage.service';
import { PlayersService } from '../player/players.service';

@Component({
    selector: 'app-favorites-list',
    templateUrl: './favorites-list.component.html',
    styleUrls: ['./favorites-list.component.css']
})
export class FavoritesListComponent {
    public favoritesList: Player[] = [];
    public isFavoritesListEmpty = false;

    public showLoading = false;
    public withBackdrop = false;

    constructor(private playersService: PlayersService, private storage: LocalStorageService) {
        this.showLoading = true;
        this.initFavorites();
    }

    public setLoadingStatus($event: boolean) {
        this.showLoading = $event;
    }

    public showBackdrop($event: boolean) {
        this.withBackdrop = $event;
    }

    public favoriteStateChange(player: Player) {
        if (!player.is_favorite) {
            this.storage.remove(player.name);
            this.removeFromFavorites(player.name);
        } else {
            this.storage.set(player.name, "0");
        }

        this.isFavoritesListEmpty = this.favoritesList.length === 0;
    }

    private removeFromFavorites(playerName: string) {
        this.favoritesList.forEach((favoritePlayer: Player, index: number) => {
            if (favoritePlayer.name === playerName) {
                this.favoritesList.splice(index, 1);
                return;
            }
        });
    }

    private initFavorites() : void {
        let players = [];
    
        this.playersService.getPlayers()
            .subscribe(
                value => players = value,
                () => console.error('Error with getting players!!!'),
                () => {
                    players.forEach((player: Player) => {
                        if (this.storage.has(player.name)) {
                            player.image = this.playersService.getPlayerImage(player);
                            player.team_image = this.getTeamImage(player);

                            this.favoritesList.push(player);
                        }
                    });

                    this.isFavoritesListEmpty = this.favoritesList.length === 0;
                    this.showLoading = false;
                });  
    }

    private getTeamImage(player: Player) : string {
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