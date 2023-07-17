import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output('search') handleInput: EventEmitter<string> = new EventEmitter<string>();
  @Output() typingFinish: EventEmitter<string> = new EventEmitter<string>(); 
  @Output() typingRun: EventEmitter<string> = new EventEmitter<string>(); 
}
