import { EditClassComponent } from './../edit-class/edit-class.component';
import { AddClassComponent } from './../add-class/add-class.component';
import { StateService } from './../state.service';
import { Component, OnInit,Injectable } from '@angular/core';
import { ClassService } from '../class.service';
import { Class } from '../models/class.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { ProgressSpinnerDialogComponent } from '../progress-spinner-dialog/progress-spinner-dialog.component';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-student-managment',
  templateUrl: './student-managment.component.html',
  styleUrls: ['./student-managment.component.scss']
})
export class StudentManagmentComponent implements OnInit {

  classes!: Class[];
  state!: string;
  avatar!:string;

  constructor(private classService: ClassService,
              private stateService: StateService,
              private toastr: ToastrService,
              private dialog: MatDialog, ) { }

  ngOnInit(): void {
    if (this.stateService.state.teacher?.id) {
      const refSpinner = this.dialog.open(ProgressSpinnerDialogComponent, {
        panelClass: 'transparent',
        disableClose: true,
      });
      this.avatar = "../../assets/images/profile.png";
      this.classService.getAllClasses(this.stateService.state.teacher.id).subscribe(data => {
      refSpinner.close();
      if (data) {
        if(data.length==0){
          this.state = "No";
        }
        this.classes = data;
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
      });
    }
  }

  addClass(): void {
    const refDialog = this.dialog.open(AddClassComponent, {
      panelClass: 'my-dialog',
      disableClose: true
    });
    refDialog.afterClosed().subscribe(d => {
      if (d) {
        console.log(this.classes)
      this.classes.push(d);
      this.state = "";
      this.dialog.open(DialogMessageComponent, {
        data: {
          title: `Class Code: ${d.code}` ,
          msg: 'Please share this code to your student',
          confirm: false
        },
        panelClass: 'my-dialog',
        disableClose: true,
      });
    }

    });

  }

  editClass(c: Class): void {
    const refDialog = this.dialog.open(EditClassComponent, {
     data: c,
     panelClass: 'my-dialog',
    disableClose: true
   });

    refDialog.afterClosed().subscribe(d => {
    if (d){
      const cl = this.classes.find( f => f.id === c.id);
      if (cl) { cl.name = d; }
    }
   });
  }

  deleteClass(id: number): void {
    const refDialog = this.dialog.open(DialogMessageComponent, {
      data: {
        title: 'You want delete class?',
        msg: 'If you delete the class,  you will lost your student.',
        confirm: true
      }
    });
  
    refDialog.afterClosed().subscribe(d => {
     if (d && id && this.stateService.state.teacher?.id) {
      const refSpinner = this.dialog.open(ProgressSpinnerDialogComponent, {
        panelClass: 'transparent',
        disableClose: true,
      });

      this.classService.deleteClass(this.stateService.state.teacher?.id , id).subscribe(data => {
        refSpinner.close();
        if (data) {
          this.toastr.success('Class succefully deleted', 'Success');

          this.classes = this.classes.filter(f => f.id !== id);
        }
        console.log(this.classes)
        if(this.classes.length==0){
          this.state = "no";
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
        });
      }
      });
  }
}

