import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProgressSpinnerDialogComponent } from '../progress-spinner-dialog/progress-spinner-dialog.component';
import { StateService } from '../state.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup-student',
  templateUrl: './signup-student.component.html',
  styleUrls: ['./signup-student.component.scss']
})
export class SignupStudentComponent implements OnInit {

  constructor( private fb: FormBuilder,
               private userService: UserService,
               private toastr: ToastrService,
               private router: Router,
               private route: ActivatedRoute,
               private stateService: StateService,
               private dialog: MatDialog
               ) { }

signupForm!: FormGroup;

ngOnInit(): void {
this.signupForm = this.fb.group({
name:  ['', Validators.required],
code: ['', Validators.required],
password: ['', Validators.required]
});
}

onSubmit(): void {
const values = this.signupForm?.value;

const refSpinner = this.dialog.open(ProgressSpinnerDialogComponent, {
  panelClass: 'transparent',
  disableClose: true,
});

this. userService.studentSignUp(values).subscribe(
data => {

refSpinner.close();
if (data) {
  this.stateService.state.student = data;
  sessionStorage.setItem('student_login',"true");
  sessionStorage.setItem('student_detail',JSON.stringify(data))
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
