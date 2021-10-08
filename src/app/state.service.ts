import { Injectable } from '@angular/core';
import { State } from './models/state.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  state: State = {
    quizzes: null,
    student: null,
    teacher: null,
    title: null
  };
}
