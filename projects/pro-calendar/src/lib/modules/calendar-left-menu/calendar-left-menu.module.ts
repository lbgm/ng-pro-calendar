import { NgModule } from '@angular/core';
import { CalendarAssetsModule } from '../calendar-assets/calendar-assets.module';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FaIconLibrary, FaConfig } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faCalendar, fas } from '@fortawesome/free-solid-svg-icons';




@NgModule({
  declarations: [
    LeftMenuComponent
  ],
  imports: [
    CalendarAssetsModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule
  ],
  exports: [
    LeftMenuComponent
  ]
})
export class CalendarLeftMenuModule {
  constructor(library: FaIconLibrary, faConfig: FaConfig) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faCalendar);
    faConfig.fixedWidth = true;
    library.addIconPacks(fas, far);
  }
}
