import { NgModule } from '@angular/core';
import { CalendarAssetsModule } from '../calendar-assets/calendar-assets.module';
import { DayViewComponent } from './day-view/day-view.component';



@NgModule({
  declarations: [
    DayViewComponent
  ],
  imports: [
    CalendarAssetsModule
  ],
  exports: [
    DayViewComponent
  ]
})
export class CalendarDayViewModule { }
