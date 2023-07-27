import { NgModule } from '@angular/core';
import { CalendarAssetsModule } from '../calendar-assets/calendar-assets.module';
import { SideEventComponent } from './side-event/side-event.component';



@NgModule({
  declarations: [
    SideEventComponent
  ],
  imports: [
    CalendarAssetsModule
  ],
  exports: [
    SideEventComponent
  ]
})
export class CalendarSideEventModule { }
