import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { PlayerListComponent } from './player-list.component';

const playerListRoutes: Routes = [
    {
        path: '',
        component: PlayerListComponent 
    }
];

@NgModule({
    imports: [ RouterModule.forChild(playerListRoutes) ],
    exports: [ RouterModule ]
})
export class PlayerListRoutingModule { }
