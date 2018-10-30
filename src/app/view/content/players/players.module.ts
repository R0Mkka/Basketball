import { NgModule } from '@angular/core';

import { AddFeaturesModule } from 'src/app/add-features/add-features.module';
import { PlayersRoutingModule } from './players-routing.module';

import { PlayersComponent } from './players.component';
import { PlayerComponent } from './player/player.component';
import { ModalComponent } from './player/modal/modal.component';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
    imports: [
        AddFeaturesModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatPaginatorModule,
        PlayersRoutingModule
    ],
    declarations: [
        PlayersComponent,
        PlayerComponent,
        ModalComponent
    ],
    exports: []
})
export class PlayersModule { }