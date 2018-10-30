import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { PlayersComponent } from './players.component';

const playersRoutes: Routes = [
    {
        path: '',
        component: PlayersComponent 
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(playersRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PlayersRoutingModule { }
