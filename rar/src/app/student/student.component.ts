import { StateService } from './../state.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { Student } from '../models/student.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  name!: string | undefined;

  avatar!: string | undefined;

  currentTitle!:string

  constructor(private stateService: StateService,
              private router: Router,
              private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.currentTitle = 'Quiz Progress';
    this.name = this.stateService.state.student?.name;

    if (this.stateService.state.student?.image) {
      this.avatar = environment.appConfig.imgURL + this.stateService.state.student.image;
    }else{
      this.avatar = '../../assets/images/profile.png';
    }
  }

  logout(): void {

    const refDialog = this.dialog.open(DialogMessageComponent, {
      data: {
        title: 'Logout',
        msg: 'Are you sure you want logout?',
        confirm: true
      },
      panelClass: 'my-dialog',
      disableClose: true
    });

    refDialog.afterClosed().subscribe(d => {
      if (d) {
        this.stateService.state.quizzes = null;
        this.stateService.state.student = null;

        this.router.navigate(['welcome']);
        sessionStorage.removeItem('student_login');
        sessionStorage.removeItem('student_detail');
      }
    });

  }

}
