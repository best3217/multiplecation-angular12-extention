import { StateService } from '../state.service';
import { Quiz } from '../models/quizz.model';
import { Component, OnInit, Injectable } from '@angular/core';
import { QuizService } from '../quiz.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerDialogComponent } from '../progress-spinner-dialog/progress-spinner-dialog.component';
import { DialogMessageComponent } from './../dialog-message/dialog-message.component';
@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.scss']
})

export class ListQuizComponent implements OnInit {

  quizzes!: Quiz[];

  displayedColumns: string[] = ['name', 'progress'];
  student_id!:number;
  teacher_subscription!:string;

  constructor(private quizService: QuizService,
              private toastr: ToastrService,
              private stateService: StateService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    if(!sessionStorage.getItem("student_login")){
      this.router.navigate(['welcome']);
    }else{
      if (this.stateService.state.quizzes && this.stateService.state.quizzes.length) {
        this.quizzes = this.stateService.state.quizzes;
        if(this.stateService.state.student?.teacher){
          this.teacher_subscription = String(this.stateService.state.student?.teacher.is_subscription)
        }
      }
      console.log(this.stateService.state)
        this.student_id = Number(this.stateService.state.student?.id);
        if(this.stateService.state.student?.teacher){
          this.teacher_subscription = String(this.stateService.state.student?.teacher.is_subscription)
          // this.teacher_subscription = "1";
        }
          // console.log(this.teacher_subscription)


        const refSpinner = this.dialog.open(ProgressSpinnerDialogComponent, {
          panelClass: 'transparent',
          disableClose: true,
        });
  
        console.log(this.stateService.state.student?.id);
        this.quizService.getStudentQuizzes(this.student_id).subscribe(
        data => {
            refSpinner.close();
            if (data) { this.quizzes = data; }
            this.stateService.state.quizzes = data;
            console.log(data)
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

  displayQuestions(quiz: Quiz): void {
    console.log(quiz);
      this.router.navigate(['../quiz', quiz.id], {relativeTo: this.route});
  }
  displayComplete(quiz: Quiz):void {
    this.router.navigate(['../quize-complete',quiz.id], {relativeTo: this.route});
  }
  displayAlert() {
    const msg =  'Your teacher needs a subscription for this quiz' ;

    const refDialog = this.dialog.open(DialogMessageComponent, {
      data: {
        msg
      }
    });
    refDialog.afterClosed()
  }

}
