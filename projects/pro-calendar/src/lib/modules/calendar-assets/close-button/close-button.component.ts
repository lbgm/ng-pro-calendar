import { Component, EventEmitter, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'close-button',
  templateUrl: './close-button.component.html',
  styleUrls: ['./close-button.component.scss']
})
export class CloseButtonComponent {
  faXmark = faXmark;
  @Output() tap = new EventEmitter<void>();

  closeText = $localize`Fermer`;

  emitTap (): void {
    this.tap.emit();
  }
}
