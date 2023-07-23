import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'close-button',
  templateUrl: './close-button.component.html',
  styleUrls: [
    '../../../tailwind.scss',
    './close-button.component.scss'
  ]
})
export class CloseButtonComponent {
  @Output() tap = new EventEmitter<void>(true);

  constructor () {}

  emitTap (): void {
    this.tap.emit();
  }
}
