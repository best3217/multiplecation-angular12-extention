import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { StateService } from '../state.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private stateService: StateService,
    ) {}
  is_subscription!:number;
  subscription!:string
  day!:string
  calendar!:string
  year!:string
    
    ngOnInit(): void {
      this.is_subscription = Number(this.stateService.state.teacher?.is_subscription);
      this.subscription = String(this.stateService.state.teacher?.subscription);
      // this.is_subscription = 1;
      // this.subscription = "2021-05-20"
      this.year = this.subscription.substring(0,4)
      let month = this.subscription.substring(5,7)
      this.day = this.subscription.substring(8,10)
      switch (month) {
        case "01": this.calendar = "January"
          break;
        case "02": this.calendar = "February"
          break;
        case "03": this.calendar = "Margh"
          break;
        case "04": this.calendar = "Aprill"
          break;
        case "05": this.calendar = "May"
          break;
        case "06": this.calendar = "June"
          break;
        case "07": this.calendar = "July"
          break;
        case "08": this.calendar = "August"
          break;
        case "09": this.calendar = "September"
          break;
        case "10": this.calendar = "October"
          break;
        case "11": this.calendar = "November"
          break;
        case "12": this.calendar = "December"
          break;
      }
      console.log(this.calendar)
    }
  openDialog() {
    const dialogRef = this.dialog.open(Alert);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
@Component({
  selector: 'alert',
  templateUrl: 'alert.html',
  styleUrls: ['./subscription.component.scss']
})
export class Alert {}
