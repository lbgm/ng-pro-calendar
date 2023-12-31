import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import fr from '../locales/calendar.fr.json';
import en from '../locales/calendar.en.json';
import pt from '../locales/calendar.pt.json';

type IDictionary = {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  #lang: string = window.navigator.language.split("-")[0];
  #dictionary: IDictionary = {};

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.document.documentElement.lang = this.#lang;
    this.#dictionary['fr'] = fr;
    this.#dictionary['en'] = en;
    this.#dictionary['pt'] = pt;
  }

  get lang(): string {
    return this.#lang;
  }

  translate(key: string, args?: Record<string, string>, locale: string = this.#lang): string {
    try {
      const keys = key.split('.');
      let translated = keys.reduce((previous: IDictionary, current: string) => {
        return previous[current];
      }, this.#dictionary?.[locale] ?? this.#dictionary["en"]) as unknown as string;

      if (args) {
        for (const [key, value] of Object.entries(args)) {
          let regex = new RegExp(`{${key}}`, "g");
          translated = translated.replace(regex, value);
        }
      }

      return translated;
    } catch (e) {
      void e;
      return "";
    }
  }
}
