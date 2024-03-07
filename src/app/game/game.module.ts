import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameComponent } from './game.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { ProgressComponent } from './progress/progress.component';
import { ResultModule } from './result/result.module';

import { GameService } from './game.service';
import { HangmanComponent } from './hangman/hangman.component';

export const gameRoutes: Routes = [
  {path: '', component: GameComponent}
];

@NgModule({
  declarations: [GameComponent, KeyboardComponent, ProgressComponent, HangmanComponent],
  exports: [GameComponent],
  imports: [CommonModule, RouterModule.forChild(gameRoutes), HttpClientModule, ResultModule],
  providers: [{provide: GameService}]
})
export default class GameModule { }
