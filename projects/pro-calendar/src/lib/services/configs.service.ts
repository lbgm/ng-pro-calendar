import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment, Configs } from '../types/main'

@Injectable({
  providedIn: 'root'
})
export class ConfigsService {

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

  get getEvents(): Observable<Appointment[]> {
    return this.#events.asObservable();
  }

  get getConfigs(): Observable<Configs> {
    return this.#configs.asObservable();
  }

  set setEvents(newValue: Appointment[]) {
    this.#events.next(newValue);
  }

  set setConfigs(newValue: Configs) {
    this.#configs.next(newValue);
  }
}
