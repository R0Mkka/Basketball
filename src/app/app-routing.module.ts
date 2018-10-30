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
        path: 'favorites',
        loadChildren: './view/content/favorites-list/favorites-list.module#FavoritesListModule'
    },
    {
        path: '',
        redirectTo: 'teams',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [],
    exports: [
        RouterModule
    ]    
})
export class AppRoutingModule { }