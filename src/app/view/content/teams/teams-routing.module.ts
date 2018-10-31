import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamsComponent } from './teams.component';
import { TeamPlayersListComponent } from './team-players-list/team-players-list.component';

const teamsRoutes: Routes = [
    {
        path: '',
        component: TeamsComponent
    },
    {
        path: ':team',
        component: TeamPlayersListComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(teamsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class TeamsRoutingModule {

}