import { TeacherForgotPwComponent } from './../teacher-forgot-pw/teacher-forgot-pw.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit  } from '@angular/core';
import { StateService } from './../state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Teacher } from "../models/teacher.model";
import { ProgressSpinnerDialogComponent } from '../progress-spinner-dialog/progress-spinner-dialog.component';
import { AuthService,GoogleLoginProvider, SocialUser } from 'angularx-social-login';


@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.scss']
})
export class TeacherLoginComponent implements OnInit {

  constructor( private fb: FormBuilder,
              private userService: UserService,
              private toastr: ToastrService,
              private stateService: StateService,
              private router: Router,
              private authService: AuthService,
              private route: ActivatedRoute,
              private dialog: MatDialog ) { }
loginForm!: FormGroup;
user!: SocialUser;
loggedIn!: boolean;
googleData!: Teacher

ngOnInit(): void {
  this.loginForm = this.fb.group({
  email: ['', Validators.required],
  password: ['', Validators.required]
  });
  let login_state = sessionStorage.getItem('teacher_login')
  if(String(login_state=="true")){
    console.log("teacher")
    this.router.navigate(['../teacher/student-management'], {relativeTo: this.route});
  }
  if(!login_state){
    this.router.navigate(['../teacher-login'], {relativeTo: this.route})
  }
  this.authService.authState.subscribe((user) => {
    this.user = user;
    this.loggedIn = (user != null);
    if(this.loggedIn){
      this.googleData = {
        id:Number(this.user.id),
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        image: this.user.photoUrl,
        is_subscription:0,
        subscription:''
      }
      this.stateService.state.teacher = this.googleData;
      sessionStorage.setItem('teacher_login',"true");
      sessionStorage.setItem('teacher_detail',JSON.stringify(this.googleData))
      sessionStorage.setItem('google',"true")
      this.router.navigate(['teacher']);
    }
  })
}
signInWithGoogle(): void {
  if(!this.loggedIn){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
onSubmit(): void {
const values = this.loginForm?.value;

const refSpinner = this.dialog.open(ProgressSpinnerDialogComponent, {
  panelClass: 'transparent',
  disableClose: true,
});

this.userService.teacherLogIn(values.email, values.password).subscribe(
data => {
  refSpinner.close();
  this.stateService.state.teacher = data;
  sessionStorage.setItem('teacher_login',"true");
  sessionStorage.setItem('teacher_detail',JSON.stringify(data))
  this.router.navigate(['teacher']);
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

handlForgotPW(e: any): void {

  e.preventDefault();

  this.dialog.open(TeacherForgotPwComponent, {
    panelClass: 'my-dialog',
    disableClose: true
  });

}

}
