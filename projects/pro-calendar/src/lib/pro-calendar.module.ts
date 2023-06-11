import { NgModule } from '@angular/core';
import { CalendarAssetsModule } from './modules/calendar-assets/calendar-assets.module';
import { ProCalendarComponent } from './pro-calendar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalendarBaseHeaderModule } from './modules/calendar-base-header/calendar-base-header.module';
import { CalendarDayViewModule } from './modules/calendar-day-view/calendar-day-view.module';
import { CalendarEventModule } from './modules/calendar-event/calendar-event.module';
import { CalendarLeftMenuModule } from './modules/calendar-left-menu/calendar-left-menu.module';
import { CalendarMonthViewModule } from './modules/calendar-month-view/calendar-month-view.module';
import { CalendarNativeDatepickerModule } from './modules/calendar-native-datepicker/calendar-native-datepicker.module';
import { CalendarSearchModule } from './modules/calendar-search/calendar-search.module';
import { CalendarSideEventModule } from './modules/calendar-side-event/calendar-side-event.module';
import { CalendarViewToggleModule } from './modules/calendar-view-toggle/calendar-view-toggle.module';
import { CalendarWeekViewModule } from './modules/calendar-week-view/calendar-week-view.module';


@NgModule({
  declarations: [
    ProCalendarComponent
  ],
  imports: [
    CalendarAssetsModule,
    CalendarAssetsModule,
    CalendarBaseHeaderModule,
    CalendarDayViewModule,
    CalendarEventModule,
    CalendarLeftMenuModule,
    CalendarMonthViewModule,
    CalendarNativeDatepickerModule,
    CalendarSearchModule,
    CalendarSideEventModule,
    CalendarViewToggleModule,
    CalendarWeekViewModule
  ],
  exports: [
    ProCalendarComponent
  ],
  providers: [
    {
      provide: Window,
      useValue: window
    }
  ]
})
export class ProCalendarModule { }