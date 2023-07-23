import { NgModule } from '@angular/core';
import { CalendarAssetsModule } from '../calendar-assets/calendar-assets.module';
import { WeekViewComponent } from './week-view/week-view.component';
import { CalendarEventModule } from '../calendar-event/calendar-event.module';



@NgModule({
  declarations: [
    WeekViewComponent
  ],
  imports: [
    CalendarAssetsModule,
    CalendarEventModule
  ],
  exports: [
    WeekViewComponent
  ]
})
export class CalendarWeekViewModule { }
