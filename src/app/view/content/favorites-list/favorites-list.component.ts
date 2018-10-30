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

    constructor(private storage: LocalStorageService, private playersService: PlayersService) {
        this.initFavorites();
    }

    // ngDoCheck() {
    //     console.log('doCheck');
    // }

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