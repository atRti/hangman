import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GameService {

  constructor(private http: HttpClient) { }

  getAnswers(): Observable<Array<string>> {
    return this.http.get<Array<string>>('/assets/answers.json');
  }
}
