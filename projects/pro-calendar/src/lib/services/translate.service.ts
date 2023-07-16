import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import fr from '../assets/calendar.fr.json';
import en from '../assets/calendar.en.json';
import pt from '../assets/calendar.pt.json';

type IDictionnary = {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  #lang: string = window.navigator.language.split("-")[0];
  #dictionary: IDictionnary = {};

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.document.documentElement.lang = this.#lang;
    this.#dictionary['fr'] = fr;
    this.#dictionary['en'] = en;
    this.#dictionary['pt'] = pt;
  }

  get lang(): string {
    return this.#lang;
  }

  translate(key: string, locale: string = this.#lang): string {
    try {
      const keys = key.split('.');
      return keys.reduce((previous: IDictionnary, current: string) => {
        return previous[current];
      }, this.#dictionary?.[locale] ?? this.#dictionary["en"]) as unknown as string;
    } catch (e) {
      void e;
      return "";
    }
  }
}
