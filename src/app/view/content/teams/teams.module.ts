import { NgModule } from '@angular/core';

import { AddFeaturesModule } from '../../../add-features/add-features.module';
import { TeamsRoutingModule } from './teams-routing.module';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TeamsComponent } from './teams.component';
import { TeamComponent } from './team/team.component';

@NgModule({
    imports: [
        AddFeaturesModule,
        TeamsRoutingModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatTooltipModule
    ],
    declarations: [
        TeamsComponent,
        TeamComponent
    ],
    exports: []
})
export class TeamsModule {
    constructor () { }
}