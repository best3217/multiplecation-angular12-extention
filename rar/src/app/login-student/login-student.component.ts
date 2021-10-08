import { StateService } from './../state.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerDialogComponent } from '../progress-spinner-dialog/progress-spinner-dialog.component';

@Component({
  selector: 'app-login-student',
  templateUrl: './login-student.component.html',
  styleUrls: ['./login-student.component.scss']
})
export class LoginStudentComponent implements OnInit {

  constructor( private fb: FormBuilder,
              private userService: UserService,
              private toastr: ToastrService,
              private stateService: StateService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }

loginForm!: FormGroup;

ngOnInit(): void {
  this.loginForm = this.fb.group({
  name:  ['', Validators.required],
  code: ['', Validators.required],
  password: ['', Validators.required]
  });
  let login_state = sessionStorage.getItem('student_login')
  if(String(login_state=="true")){
    this.router.navigate(['../student'], {relativeTo: this.route});
  }
  if(!login_state){
    this.router.navigate(['../student-login'], {relativeTo: this.route})
  }
}

onSubmit(): void {
const values = this.loginForm?.value;

const refSpinner = this.dialog.open(ProgressSpinnerDialogComponent, {
  panelClass: 'transparent',
  disableClose: true,
});

this.userService.studentLogIn(values).subscribe(
data => {
  refSpinner.close();
  if (data) {
  this.stateService.state.student = data;
  console.log(data);
  sessionStorage.setItem('student_login',"true");
  sessionStorage.setItem('student_detail', JSON.stringify(data));
  this.router.navigate(['student']);
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
}
);

}

}
