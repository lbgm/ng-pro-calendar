import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { E_View, T_View } from '../../../types/main';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'view-toggle',
  templateUrl: './view-toggle.component.html',
  styleUrls: [
    '../../../tailwind.scss',
    './view-toggle.component.scss'
  ]
})
export class ViewToggleComponent implements OnInit {
  @Input() view?: T_View = "week";

  @Output() viewChanged: EventEmitter<T_View> = new EventEmitter<T_View>(true);

  tabs: Record<string, T_View> = {
    ...Object.fromEntries(Object.entries(E_View)),
  };

  ngOnInit(): void {
    this.viewChanged.emit(this.view);
  }

  changeView(state: T_View, event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.view = state;

    this.viewChanged.emit(this.view);
  };

  tracktab(index: number, tab: KeyValue<string, T_View>) {
    return index;
  }
}
