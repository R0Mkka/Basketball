import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    {
        path: 'players',
        loadChildren: './view/content/player-list/player-list.module#PlayerListModule'
    },
    { 
        path: 'teams', 
        loadChildren: './view/content/team-list/team-list.module#TeamListModule'
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
    imports: [ RouterModule.forRoot(appRoutes) ],
    declarations: [],
    exports: [ RouterModule ]    
})
export class AppRoutingModule { }