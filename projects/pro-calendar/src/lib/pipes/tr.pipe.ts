import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/translate.service';

@Pipe({
  name: 'tr',
  pure: false
})
export class TrPipe implements PipeTransform {

  constructor (private translateService: TranslateService) {}

  transform(value: string, locale?: string): string{
    return this.translateService.translate(value, locale);
  }

}
