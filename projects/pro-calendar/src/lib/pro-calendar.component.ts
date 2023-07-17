import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Signal, SimpleChanges, TemplateRef, WritableSignal, computed, effect, signal } from '@angular/core';
import { Appointment, Configs, IStartEndDates, T_View } from './types/main';
import { StoreService } from './services/store.service';

import {
  dateLabel,
  twoDigitTime,
  incrementTime,
  fixDateTime,
  randomId,
  dayName,
  copyDate,
  isoStringToDate,
  dateToIsoString,
  getWeekInterval,
  weekGenerator,
  monthGenerator,
  prevDate,
  nextDate,
} from "./common/main";
import { TrPipe } from './pipes/tr.pipe';

@Component({
  selector: 'pro-calendar',
  templateUrl: './pro-calendar.component.html',
  styleUrls: [
    './tailwind.scss',
    './pro-calendar.component.scss'
  ],
  providers: [
    TrPipe
  ]
})
export class ProCalendarComponent implements OnInit, OnChanges {

  @Input() date?: string = undefined;

  @Input() view?: T_View = "week";

  @Input() events?: Appointment[] = [];

  @Input() loading?: boolean = false;

  @Input() config?: Configs = {
    viewEvent: {
      icon: true,
      text: "",
    },
    reportEvent: {
      icon: true,
      text: "",
    },
    searchPlaceholder: "",
    eventName: "",
    closeText: "",
    nativeDatepicker: true,
  };

  @Output() calendarClosed: EventEmitter<void> = new EventEmitter<void>();

  @Output() fetchEvents: EventEmitter<IStartEndDates> = new EventEmitter<IStartEndDates>();

  dateSelected: WritableSignal<Date> = signal(new Date());

  weekDays: WritableSignal<Date[]> = signal([]);

  dayTimes: WritableSignal<string[]> = signal([]);

  view_type: WritableSignal<T_View> = signal(this.view as T_View);

  externalRequestDate: WritableSignal<Date | undefined> = signal(undefined);

  monthDays: WritableSignal<Date[]> = signal([]);

  monthDates: WritableSignal<IStartEndDates> = signal({
    start: "",
    end: "",
  });

  isLoading: WritableSignal<boolean> = signal(false);

  // store
  calendarEvents: WritableSignal<Appointment[]> = signal([]);
  configs: WritableSignal<Configs> = signal({});

  /**
   * Loading State
   */
  calendarGotLoading = computed(() => {
    return this.loading || this.isLoading();
  });

  dateLabel = dateLabel;
  prevDate = prevDate;
  nextDate = nextDate;
  // dateToIsoString = dateToIsoString;
  // fixDateTime = fixDateTime;
  // weekGenerator = weekGenerator;
  // monthGenerator = monthGenerator;
  // getWeekInterval = getWeekInterval;

  constructor(
    private el: ElementRef,
    private storeService: StoreService,
    private trPipe: TrPipe
  ) {

    /**
     * watch dateSelected to change everything
     */
    effect(() => {
      //refresh week days'date
      this.weekDays.set( weekGenerator(getWeekInterval(this.dateSelected())) );
      //refresh month days'date
      this.monthDays.set( monthGenerator(this.dateSelected())._days );
      //month date start & end
      this.monthDates.set({
        start: monthGenerator(this.dateSelected()).firstDay,
        end: monthGenerator(this.dateSelected()).lastDay,
      });
      // fetch appointments
      this.fetchAppointments();
    }, {
      allowSignalWrites: true
    })
  };
  
  // display date selected on calendar-arrows
  get getSelectedDateLabel(): string {
    return /calendar/i.test(this.dateLabel(this.dateSelected())) ? this.trPipe.transform(this.dateLabel(this.dateSelected())) : dateLabel(this.dateSelected());
  }

  ngOnInit(): void {
    this.storeService.getConfigs.subscribe((value: Configs) => {
      this.configs.set(value);
    });

    this.storeService.getEvents.subscribe((value: Appointment[]) => {
      this.calendarEvents.set(value);
    });
    
    // generate day times
    this.generateDayTimes();
    
    // boot with first props
    this.verifyFirstBind();
  }


  // when props change ?
  ngOnChanges(changes: SimpleChanges): void {
    // events
    this.storeService.setEvents = this.events as Appointment[];
    // configs
    this.storeService.setConfigs = this.config as Configs;
  }

  /**
   * runSearch
   * search by event
   * @param value {string}
   */
  async runSearch(value: string): Promise<void> {
    const _s = new RegExp(value, "i");
    let _search = [];
    //
    if (!value.replace(/\s/g, "").length) {
      this.storeService.setEvents = this.events as Appointment[];
      return void 0;
    }
    //
    this.isLoading.set(true);
    _search = this.calendarEvents().filter((rdv: any) => {
      try {
        return _s.test(`${rdv.name}`) || _s.test(`${rdv.keywords}`);
      } catch (e) {
        return false;
      }
    });
    this.isLoading.set(false);
    if (_search.length !== 0) this.storeService.setEvents = _search;
  }

  /**
   * generateDayTimes
   */
  generateDayTimes(): void {
    // dayTimes generation from 08h00 to 23h00
    const _p1 = Array.from(
      { length: 23 - 8 + 1 },
      (_, i) => `${twoDigitTime(i + 8)}:${twoDigitTime(0)}`
    );
    //dayTimes generation from 07h00 to 23h59
    const _p2 = Array.from(
      { length: 7 - 0 + 1 },
      (_, i) => `${twoDigitTime(i + 0)}:${twoDigitTime(0)}`
    );
    this.dayTimes.set(_p1.concat(_p2));
  }

  /**
   * fetch Appointments
   */
  fetchAppointments(): void {
    // fetch appointments from server
    this.fetchEvents.emit({
      start: dateToIsoString(
        fixDateTime(this.monthDates().start as Date, "00:00")
      ),
      end: dateToIsoString(fixDateTime(this.monthDates().end as Date, "23:59")),
    });
  }

  /**
   * verifyFirst Props
   */
  verifyFirstBind(): void {
    // date
    if (this.date) {
      const b = isoStringToDate(this.date);
      if (b.getTime()) {
        this.dateSelected.set(b);
        this.externalRequestDate.set(this.dateSelected());
      }
    }

    // events
    this.storeService.setEvents = this.events as Appointment[];
    // config
    this.storeService.setConfigs = this.config as Configs;
  };

}
