import { NgModule } from '@angular/core';
import { CalendarAssetsModule } from '../calendar-assets/calendar-assets.module';
import { MonthViewComponent } from './month-view/month-view.component';
import { CalendarEventModule } from '../calendar-event/calendar-event.module';



@NgModule({
  declarations: [
    MonthViewComponent
  ],
  imports: [
    CalendarAssetsModule,
    CalendarEventModule
  ],
  exports: [
    MonthViewComponent
  ]
})
export class CalendarMonthViewModule { }
