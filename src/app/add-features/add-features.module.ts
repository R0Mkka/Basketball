import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';

import { CardHoverDirective } from './directives/card-hover.directive';
import { ShowImageDirective } from './directives/show-image.directive';

import { LoadingComponent } from './loading/loading.component';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatInputModule
    ],
    declarations: [
        CardHoverDirective,
        ShowImageDirective,
        LoadingComponent
    ],
    exports: [
        CommonModule,
        MatProgressSpinnerModule,
        CardHoverDirective,
        ShowImageDirective,
        LoadingComponent
    ]
})
export class AddFeaturesModule {}