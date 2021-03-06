import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingComponent } from 'src/app/shared-modules/loading/loading.component';
import { HeaderComponent } from './header/header.component';
import { ViewComponent } from './view.component';

import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    AppRoutingModule
  ],
  exports: [
    LoadingComponent,
    HeaderComponent,
    ViewComponent
  ],
  declarations: [
    LoadingComponent,
    HeaderComponent,
    ViewComponent
  ]
})
export class ViewModule { }
