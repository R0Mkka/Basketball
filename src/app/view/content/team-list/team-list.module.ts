import { NgModule } from '@angular/core';

import { FeaturesModule } from 'src/app/features/features.module';
import { PlayerModule } from 'src/app/player/player.module';
import { TeamListRoutingModule } from './team-list-routing.module';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TeamListComponent } from './team-list.component';
import { TeamCardComponent } from './team-card/team-card.component';
import { TeamPlayersListComponent } from './team-players-list/team-players-list.component';

@NgModule({
    imports: [
        FeaturesModule,
        PlayerModule,
        TeamListRoutingModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatTooltipModule
    ],
    declarations: [
        TeamListComponent,
        TeamCardComponent,
        TeamPlayersListComponent
    ],
    exports: []
})
export class TeamListModule { }