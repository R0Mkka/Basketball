import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesModule } from 'src/app/features/features.module';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';

import { PlayerCardComponent } from './player-card/player-card.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';

@NgModule({
    imports: [
        FeaturesModule,
        CommonModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatInputModule
    ],
    declarations: [
        PlayerCardComponent,
        EditModalComponent
    ],
    exports: [
        PlayerCardComponent,
        EditModalComponent
    ]
})
export class PlayerModule {}