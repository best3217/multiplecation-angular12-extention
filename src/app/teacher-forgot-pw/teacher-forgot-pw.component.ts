import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProgressSpinnerDialogComponent } from '../progress-spinner-dialog/progress-spinner-dialog.component';

@Component({
  selector: 'app-teacher-forgot-pw',
  templateUrl: './teacher-forgot-pw.component.html',
  styleUrls: ['./teacher-forgot-pw.component.scss']
})
export class TeacherForgotPwComponent implements OnInit {

  constructor( private fb: FormBuilder,
               private userService: UserService,
               private toastr: ToastrService,
               private dialogRef: MatDialogRef<TeacherForgotPwComponent>,
               private dialog: MatDialog
    ) { }

    rpForm!: FormGroup;

ngOnInit(): void {
  this.rpForm = this.fb.group({
  email:  ['', [Validators.required, Validators.email]],
});
console.log(this.rpForm)
}

onSubmit(): void {
const values = this.rpForm?.value;
console.log(this.rpForm)
const refSpinner = this.dialog.open(ProgressSpinnerDialogComponent, {
  panelClass: 'transparent',
  disableClose: true,
});

this.userService.resetPassword(values.email).subscribe(
  data => {
    refSpinner.close();

    this.dialogRef.close();

    this.toastr.success('Please check your email', 'Success');
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
