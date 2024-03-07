import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, filter, Observable, map } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

const apocalypseDelay = 300;

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrl: './letter.component.scss'
})
export class LetterComponent {
  @Input() set index(i: number) {
    const delay = i * apocalypseDelay;
    this.setVisibilityDelay(delay);
    this.isSuccess.next(false);
  }

  @Input() set choice(value: string | null) {
    if(this.isSuccess.getValue()) {
      return;
    }
    this.isSuccess.next(this.letter === value);
  }

  @Input() letter!: string;
  @Output() successEmiter = new EventEmitter();

  isVisible!: Observable<boolean>;

  private isSuccess = new BehaviorSubject<boolean>(false);

  private setVisibilityDelay(delayTime = 0) {
    this.isVisible = this.isSuccess.pipe(
      filter(success => success), delay(delayTime),
      tap(success => this.successEmiter.emit(success)),
      map(visible => visible)
    )
  }
}
