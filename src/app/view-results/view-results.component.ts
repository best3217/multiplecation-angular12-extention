import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../models/quizz.model';
import { StateService } from '../state.service';
import { Question } from 'src/app/models/question.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from './../dialog-message/dialog-message.component';
import { ProgressSpinnerDialogComponent } from '../progress-spinner-dialog/progress-spinner-dialog.component';
import { QuizService } from "../quiz.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.scss']
})
export class ViewResultsComponent implements OnInit {

  quiz!: Quiz;
  answers!: Question[];
  constructor(
    private stateService: StateService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private quizService: QuizService,
    private toastr: ToastrService,
    
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id1');
    const qz = this.stateService.state.quizzes?.find(q => q.id === Number(id));
    console.log(qz)
    if (qz) {
      this.quiz = qz;
      if(this.quiz.results){
        this.answers = this.quiz.results
        console.log(this.answers)
      }
    }
  }
  reassginQuiz():void {
    let answerId = Number(this.route.snapshot.paramMap.get('answerId'));
    let student_id = this.route.snapshot.paramMap.get('id1');
    const refDialog =this.dialog.open(DialogMessageComponent, {
      data: {
        title: 'Do you want to re-assign?',
        msg: "If you want to re-assign then current quiz results will be removed. ",
        confirm: false
      },
      panelClass: 'my-dialog',
      disableClose: true
    });

    refDialog.afterClosed().subscribe(() => {
      const refSpinner = this.dialog.open(ProgressSpinnerDialogComponent, {
        panelClass: 'transparent',
        disableClose: true,
      });
      this.quizService.delAnswer(answerId).subscribe(
        data => {
          if(data){
            console.log(data)
            refSpinner.close();
            this.toastr.success('Quiz succefully reassigned', 'Success');
            this.router.navigate(["../../"],{relativeTo:this.route})
          }
        },
          err => {
            refSpinner.close();
            if (err.apiMsg){
            this.toastr.error(err.apiMsg, 'Error');
            }
            else {
            this.toastr.error('server problem!', 'Server Error');
            }
        })
    }); 
  }

}
