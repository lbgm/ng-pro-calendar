import { Component, EventEmitter, Output } from '@angular/core';
import { TrPipe } from '../../../pipes/tr.pipe';

@Component({
  selector: 'close-button',
  templateUrl: './close-button.component.html',
  styleUrls: [
    '../../../tailwind.scss',
    './close-button.component.scss'
  ],
  providers: [
    TrPipe
  ]
})
export class CloseButtonComponent {
  @Output() tap = new EventEmitter<void>();

  constructor (private trPipe: TrPipe) {}

  emitTap (): void {
    this.tap.emit();
  }
}
