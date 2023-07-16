import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class ViewToggleComponent implements OnInit, OnChanges {
  @Input() view?: T_View = "week";

  @Output() viewtype: EventEmitter<T_View> = new EventEmitter<T_View>();

  tabs: Record<string, T_View> = {
    ...Object.fromEntries(Object.entries(E_View)),
  };

  ngOnInit(): void {
    this.viewtype.emit(this.view);
  }

  ngOnChanges(changes: SimpleChanges): void {
   this.viewtype.emit(this.view);
  }

  changeViewType(state: T_View, event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.view = state;
  };

  tracktab(index: number, tab: KeyValue<string, T_View>) {
    return index;
  }
}
