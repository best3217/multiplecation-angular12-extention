import { Class } from './../models/class.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClassService } from '../class.service';
import { StateService } from '../state.service';
import { ProgressSpinnerDialogComponent } from '../progress-spinner-dialog/progress-spinner-dialog.component';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss']
})
export class EditClassComponent implements OnInit {

  constructor( private fb: FormBuilder,
               private classService: ClassService,
               private toastr: ToastrService,
               private dialogRef: MatDialogRef<EditClassComponent>,
               private stateService: StateService,
               @Inject(MAT_DIALOG_DATA) public data: Class,
               private dialog: MatDialog

) { }

addForm!: FormGroup;

ngOnInit(): void {
this.addForm = this.fb.group({
name: [this.data.name, Validators.required],
});
}

onSubmit(): void {
const values = this.addForm?.value;
if (this.stateService.state.teacher?.id) {
  const refSpinner = this.dialog.open(ProgressSpinnerDialogComponent, {
    panelClass: 'transparent',
    disableClose: true,
  });
  this.classService.editClass(this.stateService.state.teacher.id, this.data.id, values.name).subscribe(
data => {
  refSpinner.close();
  this.dialogRef.close(values.name);
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
