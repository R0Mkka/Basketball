import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FeaturesModule } from 'src/app/features/features.module';

import { PlayerCardComponent } from './player-card/player-card.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { EditStatsFormComponent } from './edit-modal/edit-stats-form/edit-stats-form.component';
import { FieldComponent } from './edit-modal/edit-stats-form/field/field.component';

@NgModule({
    imports: [
        FeaturesModule,
        ReactiveFormsModule
    ],
    declarations: [
        PlayerCardComponent,
        EditModalComponent,
        EditStatsFormComponent,
        FieldComponent
    ],
    exports: [
        PlayerCardComponent,
        EditModalComponent,
        EditStatsFormComponent,
        FieldComponent
    ]
})
export class PlayerModule {}