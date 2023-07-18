import { NgModule } from '@angular/core';
import { CalendarAssetsModule } from '../calendar-assets/calendar-assets.module';
import { LeftMenuComponent } from './left-menu/left-menu.component';



@NgModule({
  declarations: [
    LeftMenuComponent
  ],
  imports: [
    CalendarAssetsModule
  ],
  exports: [
    LeftMenuComponent
  ]
})
export class CalendarLeftMenuModule { }
