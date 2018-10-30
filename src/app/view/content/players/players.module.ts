import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersRoutingModule } from './players-routing.module';

import { PlayersComponent } from './players.component';

@NgModule({
    imports: [
        CommonModule,
        PlayersRoutingModule
    ],
    exports: [],
    declarations: [
        PlayersComponent
    ]
})
export class PlayersModule { }