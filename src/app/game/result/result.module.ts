import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LetterComponent } from './letter/letter.component';
import { ResultComponent } from './result.component';

@NgModule({
  declarations: [ResultComponent, LetterComponent],
  exports: [ResultComponent],
  imports: [CommonModule]
})
export class ResultModule { }
