import { Component, OnInit } from '@angular/core';
import { StateService } from './../state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerDialogComponent } from '../progress-spinner-dialog/progress-spinner-dialog.component';

@Component({
  selector: 'app-teacher-signeup',
  templateUrl: './teacher-signeup.component.html',
  styleUrls: ['./teacher-signeup.component.scss']
})
export class TeacherSigneupComponent implements OnInit {

  constructor( private fb: FormBuilder,
               private userService: UserService,
               private toastr: ToastrService,
               private stateService: StateService,
               private router: Router,
               private dialog: MatDialog ) { }

signupForm!: FormGroup;

ngOnInit(): void {
this.signupForm = this.fb.group({
firstName: ['', Validators.required],
lastName: ['', Validators.required],
email: ['', Validators.required],
password: ['', Validators.required]
});
}

onSubmit(): void {
const values = this.signupForm?.value;

const refSpinner = this.dialog.open(ProgressSpinnerDialogComponent, {
  panelClass: 'transparent',
  disableClose: true,
});

this.userService.teacherSignUp(values).subscribe(
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

}
