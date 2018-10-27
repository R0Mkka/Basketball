import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomMaterialModule } from '../core/custom-material/custom-material.module';

import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { ViewComponent } from './view.component';
import { CardComponent } from './content/card/card.component';
import { HoverDirective } from './content/card/card.directive';

import { PlayerComponent } from './content/player/player.component';
import { TeamComponent } from './content/team/team.component';
import { ModalComponent } from './content/player/modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  exports: [
    HeaderComponent,
    ContentComponent,
    ViewComponent
  ],
  declarations: [
    HeaderComponent,
    ContentComponent,
    ViewComponent,
    CardComponent,
    PlayerComponent,
    TeamComponent,
    HoverDirective,
    ModalComponent
  ]
})
export class ViewModule { }
