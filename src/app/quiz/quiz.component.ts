import { DialogMessageComponent } from './../dialog-message/dialog-message.component';
import { MatDialog } from '@angular/material/dialog';
import { StateService } from '../state.service';
import { Quiz } from '../models/quizz.model';
import { Component, OnDestroy, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Question } from 'src/app/models/question.model';
import { QuizService } from '../quiz.service';
import { Subscription, interval } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressSpinnerDialogComponent } from '../progress-spinner-dialog/progress-spinner-dialog.component';
import * as confetti from 'canvas-confetti';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {

  quiz!: Quiz;

  questions!: Question[];

  displayedColumns: string[] = ['name', 'progress'];

  start = false;
  interval:any;

  currentTime!: number;

  timerSubscription!: Subscription;

  minute!: number;

  second!: string;


  constructor(private quizService: QuizService,
              private toastr: ToastrService,
              private stateService: StateService,
              private dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private renderer2: Renderer2,
              private elementRef: ElementRef
              ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    const qz = this.stateService.state.quizzes?.find(q => q.id === Number(id));
    if (qz) {
      this.quiz = qz;
    }

    this.currentTime = this.quiz.time;
    this.minute = this.currentTime/60;
    if(this.currentTime%60==0){
      this.second = "00"
    }
    if (this.stateService.state.student?.id||this.stateService.state.student?.id==0) {
    const refSpinner = this.dialog.open(ProgressSpinnerDialogComponent, {
        panelClass: 'transparent',
        disableClose: true,
      });

    this.quizService.getQuiz(this.stateService.state.student?.id, this.quiz?.id).subscribe(
      data => {
        refSpinner.close();
        
        if (data) { this.questions = data; }
      },
      err => {
        refSpinner.close();

        if (err.apiMsg){
this.toastr.error(err.apiMsg, 'Error');
}
else {
this.toastr.error('server problem!', 'Server Error');
}
      }
  );
}
  }

  startQuiz(e: any): void {
    e.preventDefault();
    this.start = true;
    this.interval = setInterval(() => {
      if(this.currentTime > 0) {
        if(this.second=="00"){
          this.minute--
          this.currentTime=59
        }
        if(this.currentTime<10){
          this.second = "0"+String(this.currentTime)
        }else{
          this.second = String(this.currentTime)
          if(this.currentTime>60){
            this.currentTime=60
          }
        }
        this.currentTime--;
      } else {
        if(this.minute>0){
          this.currentTime=59
          this.minute--
        }else{
          clearInterval(this.interval)
          const refDialog = this.dialog.open(DialogMessageComponent, {
            data: {
              title: 'TIME OUT!!!',
              msg: 'PLEASE TRY AGAIN',
              confirm: false
            },
            panelClass: 'my-dialog',
            disableClose: true
          });
  
          refDialog.afterClosed().subscribe(d => {
  
            this.router.navigate(['../../list-quiz'], {relativeTo: this.route});
          });
        }
      }
    },1000)
  }

  ngOnDestroy(): void {
  //  this.timerSubscription.unsubscribe();
  }

  handlQuiz(): void {
    // this.timerSubscription.unsubscribe();
    clearInterval(this.interval)
    this.questions.forEach(q => {
      // tslint:disable-next-line:triple-equals
      q.iscorrect = Number( q.answare == q.data_1 * q.data_2 );
      console.log(q.iscorrect)
    });

    const wrongQuestions = this.questions.filter(q => !q.iscorrect);

    const score = ((1 - (wrongQuestions.length / this.questions.length)) * 100).toFixed(0);

    const title = wrongQuestions.length ? 'YOUR SCORE IS' : 'CONGRATULATIONS' ;
    const msg = wrongQuestions.length ? `${score}%` : 'YOUR SCORE IS 100%' ;

    const refDialog = this.dialog.open(DialogMessageComponent, {
      data: {
        title,
        msg
      }
    });
    const canvas = this.renderer2.createElement('canvas');

    this.renderer2.appendChild(this.elementRef.nativeElement, canvas);

    const myConfetti = confetti.create(canvas, {
      resize: true // will fit all screen sizes
    });
    if (String(score)=="100"){
      var duration = 15 * 1000;
      var animationEnd = Date.now() + duration;
      var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min:number, max:number) {
        return Math.random() * (max - min) + min;
      }

      const remind:any = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(remind);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        myConfetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        myConfetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250)
    }


    refDialog.afterClosed().subscribe(d => {
      if (this.quiz) {
        console.log(this.quiz)
        this.quiz.hasResult = true;
        this.quiz.progress = Number(score);
        this.quiz.progressTime = this.currentTime;
        this.quiz.results = this.questions.filter(q => q.answare);
        console.log(this.quiz)
        if(this.stateService.state.student?.id==0){
          this.router.navigate(['../../list-quiz'], {relativeTo: this.route});
        }
        if (this.stateService.state.student?.id) {
          const refSpinner = this.dialog.open(ProgressSpinnerDialogComponent, {
            panelClass: 'transparent',
            disableClose: true,
          });
          this.quizService.addAnswer(this.stateService.state.student.id, this.quiz).subscribe(
          data => {
            refSpinner.close();
            if (data) { this.toastr.success('Success', 'Quiz answer added successfuly'); }

            this.router.navigate(['../../list-quiz'], {relativeTo: this.route});
          },
          err => {
            refSpinner.close();

            if (err.apiMsg){
              this.toastr.error(err.apiMsg, 'Error');
              }
              else {
              this.toastr.error('server problem!', 'Server Error');
              }

            this.router.navigate(['../../list-quiz'], {relativeTo: this.route});
          }
        );
        }
        }
      });
    }

}
