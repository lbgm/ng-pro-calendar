import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment, Configs } from '../types/main';

export const DEFAULT_CONFIGS: Configs = {
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
  todayButton: false,
  firstDayOfWeek: 0
};

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  #events: BehaviorSubject<Appointment[]> = new BehaviorSubject<Appointment[]>([]);

  #configs: BehaviorSubject<Configs> = new BehaviorSubject<Configs>({ 
    ...DEFAULT_CONFIGS,
    reportEvent: {
      ...DEFAULT_CONFIGS.reportEvent
    },
    viewEvent: {
      ...DEFAULT_CONFIGS.viewEvent
    } 
  });

  constructor() { }

  get _events(): Observable<Appointment[]> {
    return this.#events.asObservable();
  }

  get _configs(): Observable<Configs> {
    return this.#configs.asObservable();
  }

  set $events(newValue: Appointment[]) {
    this.#events.next(newValue);
  }

  set $configs(newValue: Configs) {
    this.#configs.next(newValue);
  }
}
