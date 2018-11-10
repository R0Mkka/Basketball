import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FeaturesModule } from 'src/app/features/features.module';

import { PlayerCardComponent } from './player-card.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { EditStatsFormComponent } from './edit-modal/edit-stats-form/edit-stats-form.component';

import { ValidationDirective } from './edit-modal/edit-stats-form/validation.directive';

@NgModule({
    imports: [
        FeaturesModule,
        ReactiveFormsModule
    ],
    declarations: [
        PlayerCardComponent,
        EditModalComponent,
        EditStatsFormComponent,
        ValidationDirective
    ],
    exports: [
        PlayerCardComponent,
        EditModalComponent,
        EditStatsFormComponent
    ]
})
export class PlayerCardModule {}