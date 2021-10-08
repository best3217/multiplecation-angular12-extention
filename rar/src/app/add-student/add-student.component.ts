import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProgressSpinnerDialogComponent } from '../progress-spinner-dialog/progress-spinner-dialog.component';
import { StateService } from '../state.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  constructor( private fb: FormBuilder,
               private userService: UserService,
               private toastr: ToastrService,
               private dialogRef: MatDialogRef<AddStudentComponent>,
               private stateService: StateService,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private dialog: MatDialog
) { }

addForm!: FormGroup;

ngOnInit(): void {
this.addForm = this.fb.group({
name:  ['', Validators.required],
password: ['', Validators.required]
});
}

onSubmit(): void {

const refSpinner = this.dialog.open(ProgressSpinnerDialogComponent, {
    panelClass: 'transparent',
    disableClose: true,
  });

const values = this.addForm?.value;
if (this.stateService.state.teacher?.id) {
  this.userService.studentSignUp({
    name: values.name,
    code: this.data.code,
    password: values.password
}).subscribe(
data => {
  refSpinner.close();

  this.dialogRef.close(data);
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


}
