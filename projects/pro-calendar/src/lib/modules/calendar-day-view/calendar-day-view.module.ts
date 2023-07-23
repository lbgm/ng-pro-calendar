import { NgModule } from '@angular/core';
import { CalendarAssetsModule } from '../calendar-assets/calendar-assets.module';
import { DayViewComponent } from './day-view/day-view.component';
import { CalendarEventModule } from '../calendar-event/calendar-event.module';



@NgModule({
  declarations: [
    DayViewComponent
  ],
  imports: [
    CalendarAssetsModule,
    CalendarEventModule
  ],
  exports: [
    DayViewComponent
  ]
})
export class CalendarDayViewModule { }
