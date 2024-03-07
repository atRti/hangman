import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressComponent {
  @Input() set currentLevel(value: number | null) {
    if (!value) {
      return;
    }
    this._currentLevel = value;
  }
  @Input() maxLevel!: number;

  private _currentLevel = 1;

  *levels(): Iterable<{passed: boolean, current: boolean}> {
    let level = 1;
    while (level <= this.maxLevel) {
      yield {
        passed: level < this._currentLevel,
        current: level === this._currentLevel
      };
      level++;
    }
    return;
  }
}
