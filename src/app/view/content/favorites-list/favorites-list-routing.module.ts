import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavoritesListComponent } from './favorites-list.component';

const favoritesRoutes: Routes = [
    {
        path: '',
        component: FavoritesListComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(favoritesRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class FavoritesListRoutingModule { }