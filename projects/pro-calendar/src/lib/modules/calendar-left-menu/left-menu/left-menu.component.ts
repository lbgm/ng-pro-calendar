import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, WritableSignal, effect, signal } from '@angular/core';
import { Configs } from '../../../types/main';
import { StoreService } from '../../../services/store.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: [
    '../../../tailwind.scss',
    './left-menu.component.scss'
  ]
})
export class LeftMenuComponent implements OnInit, OnChanges {
  @Input() date?: Date | undefined = undefined;

  @Output() calendarDatepicker: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() calendarClose: EventEmitter<void> = new EventEmitter<void>();

  configs: WritableSignal<Configs> = signal({});

  dateRequested: WritableSignal<Date | undefined> = signal(this.date);

  datepicked: WritableSignal<Date> = signal(new Date());

  constructor(private storeService: StoreService) { 
    effect(() => {
      this.calendarDatepicker.emit(new Date(this.datepicked()));
    }, {
      allowSignalWrites: true
    });
  }

  ngOnInit(): void {
    this.storeService.getConfigs.subscribe((value: Configs) => {
       this.configs.set(value);
    });

    this.calendarDatepicker.emit( new Date(this.datepicked()) );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dateRequested()) this.datepicked.set(this.dateRequested() as Date);
  }

}
