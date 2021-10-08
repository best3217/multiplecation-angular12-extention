import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../quiz.service';
import { StateService } from '../state.service';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerDialogComponent } from '../progress-spinner-dialog/progress-spinner-dialog.component';
import { DialogMessageComponent } from './../dialog-message/dialog-message.component';
import { Quiz } from '../models/quizz.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.scss']
})
export class ViewStudentsComponent implements OnInit {
  
  quizzes!: Quiz[];
  constructor(
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute,
    private stateService: StateService,
    private dialog: MatDialog,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    console.log(this.stateService.state)
    const student_id = Number(this.route.snapshot.paramMap.get('id'));
    const refSpinner = this.dialog.open(ProgressSpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true,
    });

    this.quizService.getStudentQuizzes(student_id).subscribe(
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
    })
    console.log(this.stateService.state.quizzes)
  }
  displayMessage():void {
    this.dialog.open(DialogMessageComponent, {
      data: {
        title: 'Warning',
        msg: "Student didn't passed this quiz yet.",
        confirm: false
      },
      panelClass: 'my-dialog',
      disableClose: true
    });
  }
  displayResult(q_id:number,answerId:number):void {
    let id = Number(this.route.snapshot.paramMap.get('id'))
    this.router.navigate(["../../students-view/"+id,answerId,q_id],{relativeTo:this.route})
  }

}
