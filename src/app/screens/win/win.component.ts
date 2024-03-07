import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map } from 'rxjs';

import { AudioPlayer } from '@shared/audio-player';

function ledZero(val: number) {
  return val.toString().padStart(2, '0');
}

@Component({
  selector: 'app-win',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './win.component.html',
  styleUrl: './win.component.scss'
})
export class WinComponent extends AudioPlayer{
  showTime = this.route.params.pipe(map(params => {
    const allTime = +params['time'];
    
    try {
      this.play('clap');
    } catch (error) {}


    if (allTime > 24*3600) {
      return 'ZA DŁUGO...'
    }

    let minutes = Math.floor(allTime / 60);
    const hours = Math.floor(minutes / 60)
    minutes = minutes - hours*60;

    return [ledZero(hours), ledZero(minutes), ledZero(allTime - 3600*hours - 60*minutes)].join(':');
  }));

  protected playlist = {
    clap: 'REKORDY.wav',
  }

  constructor(private route: ActivatedRoute) {
    super();
  }
}
