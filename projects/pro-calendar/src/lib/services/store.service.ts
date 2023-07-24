import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment, Configs } from '../types/main'

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  #events: BehaviorSubject<Appointment[]> = new BehaviorSubject<Appointment[]>([]);

  #configs: BehaviorSubject<Configs> = new BehaviorSubject<Configs>({
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
