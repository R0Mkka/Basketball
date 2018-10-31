import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamListComponent } from './team-list.component';
import { TeamPlayersListComponent } from './team-players-list/team-players-list.component';

const teamListRoutes: Routes = [
    {
        path: '',
        component: TeamListComponent
    },
    {
        path: ':team',
        component: TeamPlayersListComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(teamListRoutes) ],
    exports: [ RouterModule ]
})
export class TeamListRoutingModule { }