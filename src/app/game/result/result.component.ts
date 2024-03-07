import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, timer, concat, of, map, concatMap } from 'rxjs';

import { AudioPlayer } from '@shared/audio-player';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent extends AudioPlayer {
  @Input() set letter(value: string | null) {
    if(!value) {
      return;
    }
    this.lastGiven.next(value);
  }

  @Input() set word(value: string | null) {
    if (!value) {
      return;
    }
    this.lastGiven.next('');
    this._word.next(value);
    this.successCounter = 0;
  }

  @Output() success = new EventEmitter();

  get letters() {
    return this.lettersAsArray;
  }

  lastGiven = new BehaviorSubject<string>('');

  protected playlist = {
    'show-letter': 'sound.wav'
  }

  private _word = new BehaviorSubject('');
  private successCounter = 0;

  onSuccessLetter(t: any) {
    this.play('show-letter');
    this.successCounter++;
    this.notifySuccess();
  }

  private lettersAsArray = this._word.pipe(concatMap(last => {
    return concat(of(['-']), timer(500).pipe(map(() => last.split(''))))
  }));

  private notifySuccess() {
    if (this.successCounter < this._word.getValue().length) {
      return;
    }
    this.success.emit(true);
  }
}
