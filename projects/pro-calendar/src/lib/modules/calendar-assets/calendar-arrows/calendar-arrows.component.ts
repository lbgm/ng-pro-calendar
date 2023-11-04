import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, WritableSignal, signal } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { Configs } from '../../../types/main';

@Component({
  selector: 'calendar-arrows',
  templateUrl: './calendar-arrows.component.html',
  styleUrls: [
    '../../../tailwind.scss',
    './calendar-arrows.component.scss'
  ]
})
export class CalendarArrowsComponent implements OnInit {
  @Input() label?: string = "dd/mm/yyyy";

  @Output() left: EventEmitter<void> = new EventEmitter<void>(true);
  @Output() right: EventEmitter<void> = new EventEmitter<void>(true);
  @Output() today: EventEmitter<Date> = new EventEmitter<Date>();

  @Input('leftSwitchArrow') leftSwitchArrowRef!: TemplateRef<any>;
  @Input('rightSwitchArrow') rightSwitchArrowRef!: TemplateRef<any>;

  configs: WritableSignal<Configs> = signal({});

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService._configs.subscribe((value: Configs) => {
       this.configs.set(value);
    });
  }

  emitToday(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.today.emit(new Date());
  }
}
