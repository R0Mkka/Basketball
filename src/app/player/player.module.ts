import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FeaturesModule } from 'src/app/features/features.module';

import { PlayerCardComponent } from './player-card/player-card.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { EditFormComponent } from './edit-modal/edit-form/edit-form.component';

@NgModule({
    imports: [
        FeaturesModule,
        ReactiveFormsModule
    ],
    declarations: [
        PlayerCardComponent,
        EditModalComponent,
        EditFormComponent
    ],
    exports: [
        PlayerCardComponent,
        EditModalComponent
    ]
})
export class PlayerModule {}