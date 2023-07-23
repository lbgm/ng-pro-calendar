import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { TrPipe } from '../../../pipes/tr.pipe';

@Component({
  selector: 'calendar-search',
  templateUrl: './calendar-search.component.html',
  styleUrls: [
    '../../../tailwind.scss',
    './calendar-search.component.scss'
  ]
})
export class CalendarSearchComponent {
  @Input() placeholder?: string = "";
  @Input() timing?: number = 200;

  @Output('search') handleInput: EventEmitter<string> = new EventEmitter<string>(true);
  @Output() typingFinish: EventEmitter<string> = new EventEmitter<string>(true); 
  @Output() typingRun: EventEmitter<string> = new EventEmitter<string>(true);

  @Input() searchIcon!: TemplateRef<any>;
}
