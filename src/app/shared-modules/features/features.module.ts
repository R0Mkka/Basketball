import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';

import { CardHoverDirective } from './directives/card-hover.directive';
import { ShowImageDirective } from './directives/show-image.directive';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatInputModule
    ],
    declarations: [
        CardHoverDirective,
        ShowImageDirective
    ],
    exports: [
        CommonModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatInputModule,
        CardHoverDirective,
        ShowImageDirective
    ]
})
export class FeaturesModule {}