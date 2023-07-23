import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, WritableSignal, signal } from '@angular/core';
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

  @Input('leftSwitchArrow') leftSwitchArrowRef!: TemplateRef<any>;
  @Input('rightSwitchArrow') rightSwitchArrowRef!: TemplateRef<any>;

  configs: WritableSignal<Configs> = signal({});

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.getConfigs.subscribe((value: Configs) => {
       this.configs.set(value);
    });
  }
}
