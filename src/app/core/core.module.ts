import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CustomMaterialModule } from './custom-material/custom-material.module';

@NgModule({
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    HttpClientModule
  ],
  exports: [
    FormsModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    HttpClientModule
  ],
  declarations: []
})
export class CoreModule { }
