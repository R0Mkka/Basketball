import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FeaturesModule } from 'src/app/shared-modules/features/features.module';
import { PlayerCardModule } from 'src/app/shared-modules/player-card/player-card.module';
import { FavoritesListRoutingModule } from './favorites-list-routing.module';

import { FavoritesListComponent } from './favorites-list.component';

@NgModule({
    imports: [
        FeaturesModule,
        PlayerCardModule,
        FavoritesListRoutingModule,
        MatCardModule,
        MatProgressSpinnerModule
    ],
    exports: [],
    declarations: [
        FavoritesListComponent
    ]
})
export class FavoritesListModule { }