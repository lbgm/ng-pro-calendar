import { Component, ContentChild, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, WritableSignal, effect, signal } from '@angular/core';
import { Configs, T_LANG } from '../../../types/main';
import { StoreService } from '../../../services/store.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { TranslateService } from '../../../services/translate.service';
import { Platform } from '@angular/cdk/platform';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: [
    '../../../tailwind.scss',
    './left-menu.component.scss'
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter, deps: [MAT_DATE_LOCALE, Platform] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS }
  ]
})
export class LeftMenuComponent implements OnInit, OnChanges, OnDestroy {
  @Input() date?: Date | undefined = undefined;

  @Output() calendarDatepicker: EventEmitter<Date> = new EventEmitter<Date>(true);

  configs: WritableSignal<Configs> = signal({});
  dateRequested: WritableSignal<Date | undefined> = signal(this.date);
  datepicked: WritableSignal<Date> = signal(new Date());

  @ContentChild('loader') loaderRef!: TemplateRef<any>;
  @ContentChild('sideEvent') sideEventRef!: TemplateRef<any>;
  @ContentChild('closeButton') closeButtonRef!: TemplateRef<any>;

  private destroy$ = new Subject<void>();

  constructor(
    private storeService: StoreService,
    private translateService: TranslateService,
    private _adapter: DateAdapter<Date>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
  ) {
    // set locale for datepickers
    this._locale = this.translateService.lang;
    this._adapter.setLocale(this.translateService.lang);

    effect(() => {
      this.calendarDatepicker.emit(new Date(this.datepicked()));
    });

    this.translateService.lang$.pipe(takeUntil(this.destroy$)).subscribe((lang) => {
      // update locale for datepickers
      this._locale = <T_LANG>lang;
      this._adapter.setLocale(<T_LANG>lang);
    });
  }

  ngOnInit(): void {
    this.storeService._configs.subscribe((value: Configs) => {
      this.configs.set(value);
    });

    this.calendarDatepicker.emit(new Date(this.datepicked()));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['date']?.currentValue) {
      this.dateRequested.set(changes['date'].currentValue as unknown as Date);
      this.datepicked.set(this.dateRequested() as Date);
    }
  }

  dateSelected(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) this.datepicked.set(event.value);
  }

}
