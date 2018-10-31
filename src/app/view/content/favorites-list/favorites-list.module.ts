import { NgModule } from '@angular/core';

import { FeaturesModule } from 'src/app/features/features.module';
import { PlayerModule } from 'src/app/player/player.module';
import { FavoritesListRoutingModule } from './favorites-list-routing.module';

import { FavoritesListComponent } from './favorites-list.component';
import { FavoritePlayerComponent } from './favoritePlayer/favorite-player.component';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    imports: [
        FeaturesModule,
        PlayerModule,
        FavoritesListRoutingModule,
        MatCardModule,
        MatProgressSpinnerModule
    ],
    exports: [],
    declarations: [
        FavoritesListComponent,
        FavoritePlayerComponent
    ]
})
export class FavoritesListModule { }