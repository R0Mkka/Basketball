import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomMaterialModule } from '../core/custom-material/custom-material.module';

import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { ViewComponent } from './view.component';

import { LoadingModalComponent } from './content/loading-modal/loading-modal.component';

import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomMaterialModule,
    AppRoutingModule
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
    LoadingModalComponent
  ]
})
export class ViewModule { }
