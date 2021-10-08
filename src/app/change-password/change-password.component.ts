import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProgressSpinnerDialogComponent } from '../progress-spinner-dialog/progress-spinner-dialog.component';
import { StateService } from '../state.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor( private fb: FormBuilder,
               private userService: UserService,
               private toastr: ToastrService,
               private stateService: StateService,
               private dialog: MatDialog ) { }

pwForm!: FormGroup;

ngOnInit(): void {
this.pwForm = this.fb.group({
  cpassword:  ['', Validators.required],
  npassword: ['', Validators.required],
  cnpassword: ['', Validators.required]
});
}

onSubmit(): void {

const values = this.pwForm?.value;

if (values.npassword !== values.cnpassword) {
  this.toastr.error('Matching Failed', 'New Password and confirm password don\'t match');
  return;
}

const user = this.stateService.state.student?.id ?
{id : this.stateService.state.student.id, type: 0 } :
{id: this.stateService.state.teacher?.id, type: 1};

const refSpinner = this.dialog.open(ProgressSpinnerDialogComponent, {
  panelClass: 'transparent',
  disableClose: true,
});

this.userService.changePassword(user, values.cpassword, values.npassword).subscribe(
data => {
refSpinner.close();
if (data) {
  this.toastr.success('Success', 'Password successfully changed');
}
},
err => {
refSpinner.close();
if (err.apiMsg){
  this.toastr.error('Error', err.apiMsg);
}
else {
  this.toastr.error('Server Error', 'server problem!');
}
}
);


}

}
