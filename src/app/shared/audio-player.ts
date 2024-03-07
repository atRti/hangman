import { interval, take } from "rxjs";

interface AudioList {
    [key: string]: HTMLAudioElement;
}

interface PlayList {
    [key: string]: string;
}

const audioPath = './assets/sounds/';

export abstract class AudioPlayer {
  protected abstract playlist: PlayList;

  private soundsList: AudioList = {};

  protected play(name: string) {
    if (!this.playlist[name]) {
      console.warn('Not defined on component playlist');
      return
    }
    this.createSound(name);
    this.playSound(name);
  }

  protected playMultiple(name: string, times: number, freq: number) {
    if (!this.playlist[name]) {
      console.warn('Not defined on component playlist');
      return;
    }
    interval(freq).pipe(take(times)).subscribe(() => this.play(name));
  }

  private createSound(name: string) {
    if (this.soundsList[name]) {
            return;
    }
    try {
      this.soundsList[name] = new Audio(audioPath + this.playlist[name]);
    } catch (error) {
      console.log('user didn\'t interact');
    }
  
  }

  private playSound(name: string) {
    if (this.soundsList[name]) {
      if (!this.soundsList[name].paused) {
        this.soundsList[name].currentTime = 0;
      }
      try {
        this.soundsList[name].play();
      } catch (error) {
        console.log('fail in tests');
      }
    }
  }
}