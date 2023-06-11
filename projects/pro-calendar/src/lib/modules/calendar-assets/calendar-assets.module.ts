import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CloseButtonComponent } from './close-button/close-button.component';



@NgModule({
  declarations: [
    CloseButtonComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    CloseButtonComponent
  ]
})
export class CalendarAssetsModule { }
