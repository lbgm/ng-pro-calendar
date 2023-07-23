import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[input-typing]',
})
export class InputTypingDirective {

  inputTimer?: number;
  @Input() inputInterval?: number = 100;
  @Input() allowBackspace?: boolean = true;

  @Output() run = new EventEmitter<Event>(true);
  @Output() finish = new EventEmitter<Event>(true);

  constructor(public el: ElementRef<HTMLInputElement>) { }

  @HostListener("keydown",['$event'])
  @HostListener("keyup",['$event'])
  onType(e: Event):void{
    const tping=(e: Event)=>{
      this.run.emit(e);
    };

    const tpfinished=(e: Event)=>{
      this.finish.emit(e);
    };

    if (e.type === "keyup") {
      if (
        (e as KeyboardEvent).key !== "Backspace"
      )
      tping(e); // is typing running callback
      else if (this.allowBackspace === true) tping(e); // is typing running callback
      //
      clearTimeout(this.inputTimer);
      this.inputTimer = setTimeout(() => { tpfinished(e); },this.inputInterval) as unknown as number; // when typing finished

    } else if (e.type === "keydown") {
      clearTimeout(this.inputTimer);
    }
  }

}