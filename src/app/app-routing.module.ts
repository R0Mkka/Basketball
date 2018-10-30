import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    {
        path: 'players',
        loadChildren: './view/content/players/players.module#PlayersModule'
    },
    { 
        path: 'teams', 
        loadChildren: './view/content/teams/teams.module#TeamsModule'
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }