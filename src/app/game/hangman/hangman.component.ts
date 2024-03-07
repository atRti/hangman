import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, delay, filter, map, take, tap, timer } from 'rxjs';

import { AudioPlayer } from '@shared/audio-player';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrl: './hangman.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HangmanComponent extends AudioPlayer implements OnInit {
  @Input() set triggerConsume(incorrectNumber: number | null) {
    console.log('triggerConsume' ,incorrectNumber);
    if (!incorrectNumber) {
      this.reset(incorrectNumber!)
      return;
    }
    const visivilityFlag = this.visibilityStack[incorrectNumber - 1];
    this.playDrawing(visivilityFlag);
    visivilityFlag.next(true);
  }

  get isHeadVisible(): BehaviorSubject<boolean> {
    return this.visibilityStack[0];
  }

  get isBodyVisible(): BehaviorSubject<boolean> {
    return this.visibilityStack[1];
  }

  get isLeftHandVisible(): BehaviorSubject<boolean> {
    return this.visibilityStack[2];
  }

  get isRightHandVisible(): BehaviorSubject<boolean> {
    return this.visibilityStack[3];
  }

  get isRightLegVisible(): BehaviorSubject<boolean> {
    return this.visibilityStack[4];
  }

  get isLeftLegVisible(): Observable<boolean> {
    return this.visibilityStack[5].pipe(
      filter(show => show),
      tap(() => this.play('surprise')),
      map(show => show)
    );
  }

  get isGallows(): Observable<boolean> {
    return this.isReady.pipe(map(visible => visible));
  }

  get surprised(): Observable<boolean> {
    return this.makeSurprised.pipe(
      filter(show => show), tap(() => this.play('surprise')), map(visible => visible)
    );
  }

  ngOnInit(): void {
    this.prepareWood();
    timer(1700).subscribe(() => {
      this.isReady.next(true);
      this.buildGallows();
    });
  }

  protected playlist = {
    paint: 'Deal.wav',
    bum: 'UPADEK.wav',
    gone: 'ZMIJKA.wav',
    surprise: 'HARAKIRI.wav',
    axe: 'menu_step2.wav',
    construction: 'Stats.wav'
  }

  private isReady = new BehaviorSubject(false);
  private makeSurprised = new BehaviorSubject(false);
  private visibilityStack = [...Array(6)].map(() => new BehaviorSubject(false));

  private buildGallows() {
    console.log('buildGallows');
    this.playMultiple('bum', 2, 500);
    timer(1700).subscribe(() => this.playMultiple('construction', 3, 900));
  }

  private playDrawing(visivilityFlag: BehaviorSubject<boolean>) {
    if (visivilityFlag.getValue()) {
      return;
    }
    this.play('paint');
  }

  private prepareWood() {
    this.playMultiple('axe', 2, 800);
  }

  private reset(incorrect: number) {
    if(incorrect !== 0) {
      return;
    }
    this.visibilityStack.some(obs => {
      const isVisible = obs.getValue();
      obs.next(false);
      return !isVisible
    });
    this.play('gone');
  }
}
