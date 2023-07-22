import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'link-action',
  templateUrl: './link-action.component.html',
  styleUrls: [
    '../../../tailwind.scss',
    './link-action.component.scss'
  ]
})
export class LinkActionComponent {
  @Input() text?: string | number = "";
  @Input() directLink?: boolean = false;
  @Input() iconmgl?: number = 2;

  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();

  @ContentChild('icon') iconRef!: TemplateRef<any>;
}
