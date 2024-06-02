import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/translate.service';
import { Subject, takeUntil } from 'rxjs';

@Pipe({
  name: 'tr',
  pure: false
})
export class TrPipe implements PipeTransform, OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(
    private translateService: TranslateService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.translateService.lang$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      // This will mark the pipe to be checked for the next change detection cycle
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

  transform(value: string, args?: Record<string, unknown>): string {
    return this.translateService.translate(value, args);
  }

}
