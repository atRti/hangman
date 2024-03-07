import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Subject, map, timer, take } from 'rxjs';
import { AudioPlayer } from '@shared/audio-player';
import { GameService } from './game.service';


const gameOverMistakesNumber = 6;
const maxLevel = 5;

@Component({
  selector: 'app-game',
  styleUrls: ['./game.component.scss'],
  templateUrl: './game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent extends AudioPlayer implements OnInit {
  get buttonTXT (): string {
    return (this.level.getValue() <= 5) ? 'NEXT' : 'CHECK';
  }

  get canGoOn(): boolean {
    return this.level.getValue() > this.runningLevel;
  }

  get maxLevel(): number {
    return maxLevel;
  }

  choiceHandler = new BehaviorSubject('');
  guessWord = new BehaviorSubject('');
  hangmanTrigger = new Subject<number>();
  incorrectLetters = new Set<string>();
  level = new BehaviorSubject(1);

  private answers: Array<string> = [];
  private currentDraw!: Array<string>;
  private usedLetters = new Set<string>();
  private runningLevel = 1;
  private start!: number;
  private sum = 0;

  constructor(private gameSvc: GameService, private router: Router) {
    super()
  }

  ngOnInit(): void {
    this.runTime();
    
    this.gameSvc.getAnswers().pipe(take(1)).subscribe(response => {
      this.answers = response;
      this.makeRandomization();
    });

    // this.test();
  }

  test() {
    this.currentDraw = ['AAAA', 'KOC', 'KOK', 'KOT', 'KLOSZ'];
    this.takeNextWord();
  }

  goOn() {
    if(!this.canGoOn) {
      this.checkResult();
      return;
    }
    this.resetState();
    this.runningLevel++;
    this.takeNextWord();
    this.checkResult();
  }

  onChoice(choice: string) {
    if (this.canGoOn) {
      return;
    }
    this.usedLetters.add(choice);
    this.checkCorrectness(choice);
    this.choiceHandler.next(choice);
  }
  
  wordGuessed() {
    this.sum += Math.floor((new Date().getTime() - this.start) / 1000);
    this.level.next(this.runningLevel + 1);
  }

  protected playlist = {
    gone: 'ZMIJKA.wav',
    next: 'Level.wav'
  }

  private checkCorrectness(givenLetter: string) {
    if(!this.guessWord.getValue().includes(givenLetter)) {
      this.incorrectLetters.add(givenLetter);
      this.kickHangman();
      this.isGameOver();
    }
  }

  private checkResult() {
    if (this.runningLevel <= maxLevel) {
      return
    }

    this.router.navigate(['win', this.sum]);
  }

  private isGameOver() {
    if(this.incorrectLetters.size < gameOverMistakesNumber) {
      return;
    }
    
    timer(3000).pipe(map(() => this.router.navigate(['try-again']))).subscribe();
  }

  private kickHangman() {
    this.hangmanTrigger.next(this.incorrectLetters.size);
  }

  private makeRandomization() {
    const test = [...Array(5)].map(_=>(Math.floor(Math.random() * (1 - 1 + 30)) + 1));
    this.currentDraw = test.map(index => this.answers[index]);
    this.takeNextWord();
  }

  private resetState() {
    this.runTime();
    this.incorrectLetters.clear();
    this.choiceHandler.next('');
    this.usedLetters.clear();
    this.kickHangman();
  }

  private runTime() {
    this.start = new Date().getTime();
  }

  private takeNextWord() {
    if (this.runningLevel > maxLevel) {
      return
    }
    const worIndex = this.runningLevel - 1;
    this.guessWord.next(this.currentDraw[worIndex]);
  }
}
