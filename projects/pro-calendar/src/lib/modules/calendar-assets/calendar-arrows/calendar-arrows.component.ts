import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, WritableSignal, signal } from '@angular/core';
import { ConfigsService } from '../../../services/configs.service';
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

  @Output() left: EventEmitter<void> = new EventEmitter<void>();
  @Output() right: EventEmitter<void> = new EventEmitter<void>();

  configs: WritableSignal<Configs> = signal({});

  constructor(private configsService: ConfigsService) { }

  ngOnInit(): void {
    this.configsService.getConfigs.subscribe((value: Configs) => {
       this.configs.set(value);
    });
  }
}
