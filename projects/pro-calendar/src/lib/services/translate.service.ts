import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { T_LANG } from '../types/main';

import fr from '../locales/calendar.fr.json';
import en from '../locales/calendar.en.json';
import pt from '../locales/calendar.pt.json';
import es from '../locales/calendar.es.json';
import eu from '../locales/calendar.eu.json';
import ru from '../locales/calendar.ru.json';
import uk from '../locales/calendar.uk.json';

type IDictionary = {
  [key in T_LANG]: Record<string, unknown>;
};

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  #lang: BehaviorSubject<T_LANG | undefined> = new BehaviorSubject<T_LANG | undefined>(undefined);
  #dictionary: IDictionary = { fr, en, pt, eu, es, ru, uk };

  #fallbackLocale: T_LANG = 'fr';

  readonly lang$ = this.#lang.asObservable();

  static instance: TranslateService;

  constructor(@Inject(DOCUMENT) private document: Document) {
    const browserLocale = window.navigator.language.split("-")[0];
    if (Object.keys(this.#dictionary).includes(browserLocale)) this.#lang.next(browserLocale as T_LANG);
    else this.#lang.next(this.#fallbackLocale); // fallback

    TranslateService.instance = this;
  }

  get lang(): T_LANG {
    return this.#lang.getValue() as T_LANG;
  }

  set lang(value: T_LANG) {
    this.#lang.next(value);
  }

  translate(key: string, args?: Record<string, unknown>, locale: T_LANG = this.lang): string {
    try {
      const keys = key.split('.');
      let translated = keys.reduce((previous: Record<string, unknown> | string , current: string) => {
        return typeof previous === "string" ? previous : <Record<string, unknown>>previous[current];
      }, this.#dictionary?.[locale] ?? this.#dictionary[this.#fallbackLocale]) as string;

      if (args) {
        for (const [key, value] of Object.entries(args)) {
          let regex = new RegExp(`{${key}}`, "g");
          translated = translated.replace(regex, `${value}`);
        }
      }

      return translated;
    } catch (e) {
      void e;
      return "";
    }
  }
}
