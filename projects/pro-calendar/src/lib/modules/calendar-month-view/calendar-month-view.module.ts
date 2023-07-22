import { NgModule } from '@angular/core';
import { CalendarAssetsModule } from '../calendar-assets/calendar-assets.module';
import { MonthViewComponent } from './month-view/month-view.component';



@NgModule({
  declarations: [
    MonthViewComponent
  ],
  imports: [
    CalendarAssetsModule
  ],
  exports: [
    MonthViewComponent
  ]
})
export class CalendarMonthViewModule { }
