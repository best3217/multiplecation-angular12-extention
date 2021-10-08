import { DialogMessageComponent } from './../dialog-message/dialog-message.component';
import { BuySubscriptionComponent } from './../buy-subscription/buy-subscription.component';
import { AddStudentComponent } from './../add-student/add-student.component';
import { ClassService } from './../class.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StateService } from '../state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../models/student.model';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { environment } from 'src/environments/environment';
import { ProgressSpinnerDialogComponent } from '../progress-spinner-dialog/progress-spinner-dialog.component';

@Component({
  selector: 'app-class-students',
  templateUrl: './class-students.component.html',
  styleUrls: ['./class-students.component.scss']
})
export class ClassStudentsComponent implements OnInit {

  students!: Student[];

  classCode!: string | null;
  is_subscription!: string;

  constructor(private classService: ClassService,
              private stateService: StateService,
              private userService: UserService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    const classId = this.route.snapshot.paramMap.get('id');

    this.classCode  = this.route.snapshot.paramMap.get('code');

    const refSpinner = this.dialog.open(ProgressSpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true,
    });
    if (this.stateService.state.teacher?.id && classId) {
    this.classService.getSudentsCalss(this.stateService.state.teacher.id, Number(classId)).subscribe(data => {
      refSpinner.close();
      if (data) {
        this.students = data;
        console.log(data)
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
      this.is_subscription = String(this.stateService.state.teacher.is_subscription)
      // this.is_subscription = "1"
      // this.is_subscription = "0"
      console.log(this.is_subscription)
    }
    }

    addStudent(): void {
      const refDialog = this.dialog.open(AddStudentComponent, {
        data: {
         code: this.classCode
        },
        panelClass: 'my-dialog',
        disableClose: true
      });

      refDialog.afterClosed().subscribe(d => {
        if (d) {
       this.students.push(d);
        }
      });
    }
    showStudent(e:any,id:number | undefined):void {
      e.preventDefault();
      this.router.navigate(["../../../students-view",id],{relativeTo: this.route})
    }
    buySubscription(e: any): void {

      e.preventDefault();

      // const refDialog =   this.dialog.open(BuySubscriptionComponent);
      const refDialog = this.dialog.open(DialogMessageComponent, {
        data: {
          title: 'You need a subscription to monitor quizzes',
          confirm: true
        },
        panelClass: 'my-dialog',
        disableClose: true

      });

      refDialog.afterClosed().subscribe(d => {
        if (d) {
          this.router.navigate(['../../../subscription'], {relativeTo: this.route});
        }
      });
    }

    confirmDelete(e: any, id: number | undefined): void {

      e.preventDefault();

      const refDialog = this.dialog.open(DialogMessageComponent, {
        data: {
          title: 'Do you want delete the student?',
          confirm: true
        },
        panelClass: 'my-dialog',
        disableClose: true

      });

      refDialog.afterClosed().subscribe(d => {
       if (d && id) {
        const refSpinner = this.dialog.open(ProgressSpinnerDialogComponent, {
          panelClass: 'transparent',
          disableClose: true,
        });

        this.userService.deleteStudent(id).subscribe(data => {
          refSpinner.close();
          if (data) {
            this.students = this.students.filter(s => s.id !== id);
            this.toastr.success('Student succefully deleted', 'Success');
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

      getImage(image: string | undefined): string {
        if (image) {
          return environment.appConfig.imgURL + image;
        }
        return '../../assets/images/profile.png';
      }

    }
