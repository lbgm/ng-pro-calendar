import { NgModule } from '@angular/core';
import { CalendarAssetsModule } from '../calendar-assets/calendar-assets.module';
import { WeekViewComponent } from './week-view/week-view.component';



@NgModule({
  declarations: [
    WeekViewComponent
  ],
  imports: [
    CalendarAssetsModule
  ],
  exports: [
    WeekViewComponent
  ]
})
export class CalendarWeekViewModule { }
