import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardHoverDirective } from './card-hover.directive';
import { ShowImageDirective } from './show-image.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CardHoverDirective,
        ShowImageDirective
    ],
    exports: [
        CommonModule,
        CardHoverDirective,
        ShowImageDirective
    ]
})
export class AddFeaturesModule {}