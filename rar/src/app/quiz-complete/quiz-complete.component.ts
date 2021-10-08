import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../models/quizz.model';
import { StateService } from '../state.service';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-quiz-complete',
  templateUrl: './quiz-complete.component.html',
  styleUrls: ['./quiz-complete.component.scss']
})
export class QuizCompleteComponent implements OnInit {

  quiz!: Quiz;
  answers!: Question[];

  constructor(
              private stateService: StateService,
              private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // const student_id = this.route.snapshot.paramMap.get('student_id');
    const qz = this.stateService.state.quizzes?.find(q => q.id === Number(id));
    console.log(qz)
    if (qz) {
      this.quiz = qz;
      if(this.quiz.results){
        this.answers = this.quiz.results
      }
    }
  }

}
