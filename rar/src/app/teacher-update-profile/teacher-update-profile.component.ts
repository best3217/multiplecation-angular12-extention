import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ProgressSpinnerDialogComponent } from '../progress-spinner-dialog/progress-spinner-dialog.component';
import { TeacherComponent } from "../teacher/teacher.component";
import { StateService } from '../state.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-teacher-update-profile',
  templateUrl: './teacher-update-profile.component.html',
  styleUrls: ['./teacher-update-profile.component.scss']
})
export class TeacherUpdateProfileComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private toastr: ToastrService,
              private stateService: StateService,
              private teacherCom: TeacherComponent,
              private cd: ChangeDetectorRef,
              private dialog: MatDialog) { }

updateForm!: FormGroup;

avatar!: string;

email!: string | undefined;

ngOnInit(): void {

const imgProfile = this.stateService.state.teacher?.image;

this.email = this.stateService.state.teacher?.email;
if (imgProfile) {
  this.avatar = environment.appConfig.imgURL + imgProfile;
} else {
  this.avatar = '../../assets/images/profile.png';
}

this.updateForm = this.fb.group({
  firstName:  [this.stateService.state.teacher?.firstName, Validators.required],
  lastName:  [this.stateService.state.teacher?.lastName, Validators.required],
  avatar: [null],
});
}

onSubmit(): void {
const values = this.updateForm?.value;

const  teacher = new FormData();

const id = this.stateService.state.teacher?.id;

if (id) {
teacher.append('user_id', id.toString());
}

teacher.append('user_type', '1' );
teacher.append('first_name', values.firstName);
teacher.append('last_name', values.lastName);
teacher.append('profile_pic', values.avatar);

const refSpinner = this.dialog.open(ProgressSpinnerDialogComponent, {
  panelClass: 'transparent',
  disableClose: true,
});


this.userService.teacherUpdate(teacher).subscribe(
  data => {
  refSpinner.close();

  if (this.stateService.state.teacher) {
    this.stateService.state.teacher.firstName = data.firstName ;
    this.stateService.state.teacher.lastName = data.lastName ;
    this.stateService.state.teacher.image = data.image;
    if (data.image) {
    this.avatar = environment.appConfig.imgURL + data.image;
    }
    this.teacherCom.name = data.firstName+ " " + data.lastName;
    this.teacherCom.avatar = this.avatar;
    this.toastr.success('Success', 'Teacher profile successfully updated');
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

console.log(this.stateService.state.teacher)
}

onSelect(event: any): void {
if (event.target.files && event.target.files.length) {
  const file = event.target.files[0];
  this.updateForm.patchValue({
    avatar: file
  });
  }
}


}
