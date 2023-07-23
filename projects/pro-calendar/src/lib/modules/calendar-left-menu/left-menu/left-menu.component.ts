import { Component, ContentChild, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, WritableSignal, effect, signal } from '@angular/core';
import { Configs } from '../../../types/main';
import { StoreService } from '../../../services/store.service';

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

  @Output() calendarDatepicker: EventEmitter<Date> = new EventEmitter<Date>(true);
  @Output() calendarClose: EventEmitter<void> = new EventEmitter<void>(true);

  configs: WritableSignal<Configs> = signal({});
  dateRequested: WritableSignal<Date | undefined> = signal(this.date);
  datepicked: WritableSignal<Date> = signal(new Date());

  @ContentChild('loader') loaderRef!: TemplateRef<any>;
  @ContentChild('sideEvent') sideEventRef!: TemplateRef<any>;
  @ContentChild('closeButton') closeButtonRef!: TemplateRef<any>;

  constructor(private storeService: StoreService) { 
    effect(() => {
      this.calendarDatepicker.emit(new Date(this.datepicked()));
    });
  }

  ngOnInit(): void {
    this.storeService.getConfigs.subscribe((value: Configs) => {
       this.configs.set(value);
    });

    this.calendarDatepicker.emit( new Date(this.datepicked()) );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['date']?.currentValue) {
      this.dateRequested.set(changes['date'].currentValue as unknown as Date);
      this.datepicked.set(this.dateRequested() as Date);
    }
  }

}
