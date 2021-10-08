import { environment } from 'src/environments/environment';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StateService } from '../state.service';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerDialogComponent } from '../progress-spinner-dialog/progress-spinner-dialog.component';
import { StudentComponent } from "../student/student.component";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  constructor(private fb: FormBuilder,
              private userService: UserService,
              private toastr: ToastrService,
              private stateService: StateService,
              private cd: ChangeDetectorRef,
              private studentCom: StudentComponent,
              private dialog: MatDialog) { }


  updateForm!: FormGroup;

  avatar!: string;

  ngOnInit(): void {

  const imgProfile = this.stateService.state.student?.image;

  if (imgProfile) {
    this.avatar = environment.appConfig.imgURL + imgProfile;
  } else {
    this.avatar = '../../assets/images/profile.png';
  }

  this.updateForm = this.fb.group({
  name:  [this.stateService.state.student?.name, Validators.required],
  avatar: [null],
  });
  }
  onSubmit(): void {
    const values = this.updateForm?.value;

    const  student = new FormData();

    const id = this.stateService.state.student?.id;

    if (id) {
      student.append('user_id', id.toString());
    }

    student.append('user_type', '0' );
    student.append('name', values.name);
    student.append('profile_pic', values.avatar);

    const refSpinner = this.dialog.open(ProgressSpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true,
    });

    this.userService.studentUpdate(student).subscribe(
    data => {
      refSpinner.close();
      if (this.stateService.state.student) {
        this.stateService.state.student.name = data.name;
        this.stateService.state.student.image = data.image;
        if(data.image===null){
          this.avatar = "../../assets/images/profile.png";
        }else{
          this.avatar = environment.appConfig.imgURL + data.image;
        }
        this.studentCom.name = data.name;
        this.studentCom.avatar = this.avatar;
        this.toastr.success('Success', 'Student profile successfully updated');
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

    onSelect(event: any): void {
     if (event.target.files && event.target.files.length) {
        const file = event.target.files[0];
        this.updateForm.patchValue({
          avatar: file
        });
      }
    }



}
