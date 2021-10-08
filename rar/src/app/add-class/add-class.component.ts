import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClassService } from '../class.service';
import { ProgressSpinnerDialogComponent } from '../progress-spinner-dialog/progress-spinner-dialog.component';
import { StateService } from '../state.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnInit {

  constructor( private fb: FormBuilder,
               private classService: ClassService,
               private toastr: ToastrService,
               private dialogRef: MatDialogRef<AddClassComponent>,
               private stateService: StateService,
               private dialog: MatDialog
) { }

addForm!: FormGroup;

ngOnInit(): void {
  this.addForm = this.fb.group({
  name:  ['', Validators.required],
  });
  
}

onSubmit(): void {
 const refSpinner = this.dialog.open(ProgressSpinnerDialogComponent, {
    panelClass: 'transparent',
    disableClose: true,
  });

 const values = this.addForm?.value;

 if (this.stateService.state.teacher?.id) {
this.classService.addClass( this.stateService.state.teacher.id, values.name).subscribe(
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
