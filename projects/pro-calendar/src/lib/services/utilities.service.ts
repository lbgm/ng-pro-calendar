import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  #documentClickTarget: BehaviorSubject<EventTarget | null> = new BehaviorSubject<EventTarget | null>(null);

  constructor() { }

  get _documentClickTarget(): Observable<EventTarget | null> {
    return this.#documentClickTarget.asObservable();
  }

  set $documentClickTarget(newValue: EventTarget) {
    this.#documentClickTarget.next(newValue);
  }
}
