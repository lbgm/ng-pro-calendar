import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaConfig, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CloseButtonComponent } from './close-button/close-button.component';
import { TrPipe } from '../../pipes/tr.pipe';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';



@NgModule({
  declarations: [
    CloseButtonComponent,
    TrPipe
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
    // Pipes
    TrPipe
  ]
})
export class CalendarAssetsModule {
  constructor(library: FaIconLibrary, faConfig: FaConfig) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faXmark);
    faConfig.fixedWidth = true;
    library.addIconPacks(fas, far);
  }
 }
