import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';

import { FeaturesModule } from 'src/app/features/features.module';
import { PlayerModule } from 'src/app/player/player.module';
import { PlayerListRoutingModule } from './player-list-routing.module';

import { PlayerListComponent } from './player-list.component';

@NgModule({
    imports: [
        MatCardModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatPaginatorModule,
        FeaturesModule,
        PlayerModule,
        PlayerListRoutingModule
    ],
    declarations: [
        PlayerListComponent
    ],
    exports: []
})
export class PlayerListModule { }