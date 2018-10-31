import { NgModule } from '@angular/core';

import { AddFeaturesModule } from '../../../add-features/add-features.module';
import { PlayerModule } from '../../../player/player.module';
import { TeamsRoutingModule } from './teams-routing.module';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TeamsComponent } from './teams.component';
import { TeamCardComponent } from './team-card/team-card.component';
import { TeamPlayersListComponent } from './team-players-list/team-players-list.component';

@NgModule({
    imports: [
        AddFeaturesModule,
        PlayerModule,
        TeamsRoutingModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatTooltipModule
    ],
    declarations: [
        TeamsComponent,
        TeamCardComponent,
        TeamPlayersListComponent
    ],
    exports: []
})
export class TeamsModule {
    constructor () { }
}