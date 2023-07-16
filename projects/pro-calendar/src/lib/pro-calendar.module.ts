import { NgModule } from '@angular/core';
import { CalendarAssetsModule } from './modules/calendar-assets/calendar-assets.module';
import { ProCalendarComponent } from './pro-calendar.component';
import { FaIconLibrary, FaConfig } from '@fortawesome/angular-fontawesome';
import { CalendarDayViewModule } from './modules/calendar-day-view/calendar-day-view.module';
import { CalendarEventModule } from './modules/calendar-event/calendar-event.module';
import { CalendarLeftMenuModule } from './modules/calendar-left-menu/calendar-left-menu.module';
import { CalendarMonthViewModule } from './modules/calendar-month-view/calendar-month-view.module';
import { CalendarSideEventModule } from './modules/calendar-side-event/calendar-side-event.module';
import { CalendarWeekViewModule } from './modules/calendar-week-view/calendar-week-view.module';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

@NgModule({
  declarations: [
    ProCalendarComponent,
  ],
  imports: [
    CalendarAssetsModule,
    CalendarDayViewModule,
    CalendarEventModule,
    CalendarLeftMenuModule,
    CalendarMonthViewModule,
    CalendarSideEventModule,
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
export class ProCalendarModule { 
  constructor(library: FaIconLibrary, faConfig: FaConfig) {
    // Add an icon to the library for convenient access in other components
    faConfig.fixedWidth = true;
    library.addIconPacks(fas, far);
  }
}
