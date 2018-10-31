import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomMaterialModule } from '../core/custom-material/custom-material.module';

import { HeaderComponent } from './header/header.component';
import { ViewComponent } from './view.component';

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
    ViewComponent
  ],
  declarations: [
    HeaderComponent,
    ViewComponent
  ]
})
export class ViewModule { }
