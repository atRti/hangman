import { Component, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';

const startLetter = 'A'.charCodeAt(0);
const endLetter = 'Z'.charCodeAt(0);

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyboardComponent {
  *letters(): Iterable<string> {
    let i = startLetter;
    for(; i <= endLetter; i++) {
      yield String.fromCharCode(i);
    }
    return;
  }

  @Output() emitLetter = new EventEmitter();
}
