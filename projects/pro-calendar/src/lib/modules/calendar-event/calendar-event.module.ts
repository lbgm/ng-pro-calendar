import { NgModule } from '@angular/core';
import { CalendarAssetsModule } from '../calendar-assets/calendar-assets.module';
import { EventComponent } from './event/event.component';
import { FaConfig, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEye, faPenNib, fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';



@NgModule({
  declarations: [
    EventComponent
  ],
  imports: [
    CalendarAssetsModule
  ],
  exports: [
    EventComponent
  ]
})
export class CalendarEventModule { 
  constructor(library: FaIconLibrary, faConfig: FaConfig) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faEye, faPenNib);
    faConfig.fixedWidth = true;
    library.addIconPacks(fas, far);
  }
}
