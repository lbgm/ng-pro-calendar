import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaConfig, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CloseButtonComponent } from './close-button/close-button.component';
import { TrPipe } from '../../pipes/tr.pipe';

import { faChevronLeft, faChevronRight, faMagnifyingGlass, fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { InputTypingDirective } from '../../directives/input-typing.directive';
import { CalendarSearchComponent } from './calendar-search/calendar-search.component';
import { LoaderWidgetComponent } from './loader-widget/loader-widget.component';
import { LinkActionComponent } from './link-action/link-action.component';
import { CalendarArrowsComponent } from './calendar-arrows/calendar-arrows.component';
import { ViewToggleComponent } from './view-toggle/view-toggle.component';
import { HeaderCompComponent } from './header-comp/header-comp.component';
import { CalendarNativeDatepickerComponent } from './calendar-native-datepicker/calendar-native-datepicker.component';



@NgModule({
  declarations: [
    TrPipe,
    InputTypingDirective,
    CalendarSearchComponent,
    LoaderWidgetComponent,
    LinkActionComponent,
    CloseButtonComponent,
    CalendarArrowsComponent,
    ViewToggleComponent,
    HeaderCompComponent,
    CalendarNativeDatepickerComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    // modules
    CommonModule,
    FontAwesomeModule,
    // components
    CloseButtonComponent,
    CalendarSearchComponent,
    LinkActionComponent,
    LoaderWidgetComponent,
    CalendarArrowsComponent,
    ViewToggleComponent,
    HeaderCompComponent,
    // pipes
    TrPipe,
    // directives
    InputTypingDirective
  ]
})
export class CalendarAssetsModule {
  constructor(library: FaIconLibrary, faConfig: FaConfig) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faXmark, faMagnifyingGlass, faChevronLeft, faChevronRight);
    faConfig.fixedWidth = true;
    library.addIconPacks(fas, far);
  }
 }
