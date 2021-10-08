import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { StateService } from '../state.service';
import { StudentManagmentComponent } from "../student-managment/student-managment.component"
import { AuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  constructor(private stateService: StateService,
              private StudentCom:StudentManagmentComponent,
              private router: Router,
              private authService: AuthService,
              private dialog: MatDialog) { }
  name!: string | undefined;
  avatar!: string | undefined;
  currentTitle = 'Student Management';
  titleState!:string | undefined;
  user!: SocialUser;

  ngOnInit(): void {
    this.name = this.stateService.state.teacher?.firstName + ' ' + this.stateService.state.teacher?.lastName;
    if (this.stateService.state.teacher?.image) {
      this.avatar = environment.appConfig.imgURL + this.stateService.state.teacher.image;
    }else{
      this.avatar = '../../assets/images/profile.png';
    }
    if(this.currentTitle=='Student Management'){
      this.titleState="ok";
    }
  }
  addClass():void {
    this.StudentCom.ngOnInit();
    // console.log(this.StudentCom.qwer)  
    // console.log(this.StudentCom.qwer)
    // this.StudentCom.addClass();
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
        this.stateService.state.teacher = null;
        sessionStorage.removeItem('teacher_login')
        sessionStorage.removeItem('teacher_detail')
        let google = sessionStorage.getItem('google')
        if(google){
          this.authService.signOut();
          sessionStorage.removeItem('google')
        }
        this.router.navigate(['welcome']);
      }
    });

  }

}
