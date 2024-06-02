import { Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild, WritableSignal, computed, effect, signal } from '@angular/core';
import { Appointment, Configs, IStartEndDates, T_View } from './types/main';
import { DEFAULT_CONFIGS, StoreService } from './services/store.service';

import {
  dateLabel,
  twoDigit,
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
import { LeftMenuComponent } from './modules/calendar-left-menu/left-menu/left-menu.component';
import { UtilitiesService } from './services/utilities.service';

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

  @Input({ required: false }) date: string | undefined = undefined;

  @Input({ required: false }) view: T_View = "week";

  @Input({ required: false }) events: Appointment[] = [];

  @Input({ required: false }) loading: boolean = false;

  @Input({ required: false }) config: Configs = { 
    ...DEFAULT_CONFIGS,
    reportEvent: {
      ...DEFAULT_CONFIGS.reportEvent
    },
    viewEvent: {
      ...DEFAULT_CONFIGS.viewEvent
    }
  };

  @Output() calendarClosed: EventEmitter<void> = new EventEmitter<void>(true);

  @Output() fetchEvents: EventEmitter<IStartEndDates> = new EventEmitter<IStartEndDates>(true);

  dateSelected: WritableSignal<Date> = signal(new Date());

  weekDays: WritableSignal<Date[]> = signal([]);

  dayTimes: WritableSignal<string[]> = signal([]);

  defineView: WritableSignal<T_View> = signal(this.view as T_View);

  externalRequestDate: WritableSignal<Date | undefined> = signal(undefined);

  monthDays: WritableSignal<Date[]> = signal([]);

  monthDates: WritableSignal<IStartEndDates> = signal({
    start: "",
    end: "",
  });

  isLoading: WritableSignal<boolean> = signal(this.loading as boolean);

  // store
  calendarEvents: WritableSignal<Appointment[]> = signal([]);
  configs: WritableSignal<Configs> = signal({});

  dateLabel = dateLabel;
  prevDate = prevDate;
  nextDate = nextDate;

  //TemplateRef
  @ContentChild('loader') loaderRef!: TemplateRef<any>;
  @ContentChild('closeButton') closeButtonRef!: TemplateRef<any>;
  @ContentChild('searchIcon') searchIconRef!: TemplateRef<any>;
  @ContentChild('rightSwitchArrow') rightSwitchArrowRef!: TemplateRef<any>;
  @ContentChild('leftSwitchArrow') leftSwitchArrowRef!: TemplateRef<any>;
  @ContentChild('sideEvent') sideEventRef!: TemplateRef<any>;
  @ContentChild('eventCard') eventCardRef!: TemplateRef<any>;

  @ViewChild('leftMenu') leftMenuChild!: LeftMenuComponent;

  constructor(
    private el: ElementRef,
    private storeService: StoreService,
    private utilitiesService: UtilitiesService,
    private trPipe: TrPipe
  ) {
    /**
     * watch dateSelected to change everything
     */
    effect(() => {
      //refresh week days'date
      this.weekDays.set(weekGenerator(getWeekInterval(this.dateSelected(), this.config?.firstDayOfWeek)));
      //refresh month days'date
      const __m = monthGenerator(this.dateSelected(), this.config?.firstDayOfWeek);
      this.monthDays.set(__m._days);
      //month date start & end
      this.monthDates.set({
        start: __m.firstDay,
        end: __m.lastDay,
      });
      // fetch appointments
      this.fetchAppointments();
    }, {
      allowSignalWrites: true
    });
  }

  // display date selected on calendar-arrows
  get getSelectedDateLabel(): string {
    return /calendar/i.test(this.dateLabel(this.dateSelected())) ? this.trPipe.transform(this.dateLabel(this.dateSelected())) : dateLabel(this.dateSelected());
  }

  ngOnInit(): void {
    this.storeService._configs.subscribe((value: Configs) => {
      this.configs.set(value);
    });

    this.storeService._events.subscribe((value: Appointment[]) => {
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
    if (changes?.['events']?.currentValue) {
      this.storeService.$events = changes['events'].currentValue as unknown as Appointment[];
    }
    // configs
    if (changes?.['config']?.currentValue) {
      this.storeService.$configs = changes['config'].currentValue as unknown as Configs;
    }
    // loading
    if (changes?.['loading']?.currentValue) {
      this.isLoading.set(changes['loading'].currentValue as unknown as boolean);
    }
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
      this.storeService.$events = this.events as Appointment[];
      return void 0;
    }
    //
    this.isLoading.set(true);
    _search = this.calendarEvents().filter((rdv: Appointment) => {
      try {
        return _s.test(`${rdv.name}`) || _s.test(`${rdv.keywords}`);
      } catch (e) {
        return false;
      }
    });
    this.isLoading.set(false);
    if (_search.length !== 0) this.storeService.$events = _search;
  }

  /**
   * generateDayTimes
   */
  generateDayTimes(): void {
    // dayTimes generation from 08h00 to 23h00
    const _p1 = Array.from(
      { length: 23 - 8 + 1 },
      (_, i) => `${twoDigit(i + 8)}:${twoDigit(0)}`
    );
    //dayTimes generation from 07h00 to 23h59
    const _p2 = Array.from(
      { length: 7 - 0 + 1 },
      (_, i) => `${twoDigit(i + 0)}:${twoDigit(0)}`
    );
    this.dayTimes.set(_p1.concat(_p2));
  }

  /**
   * fetch Appointments
   */
  fetchAppointments(): void {
    // send event to fetch appointments from server
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
    this.storeService.$events = this.events as Appointment[];
    // config
    this.storeService.$configs = this.config as Configs;
  }

  @HostListener("document:click", ["$event"])
  documentClickTarget(event: Event): void {
    this.utilitiesService.$documentClickTarget = event.target as EventTarget;
  }
}
