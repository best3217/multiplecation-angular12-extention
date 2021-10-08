import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListQuizComponent } from "../list-quiz/list-quiz.component";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private stateService: StateService,
    private router: Router,
    private route: ActivatedRoute,
    private ListQuiz:ListQuizComponent
  ) { }

  ngOnInit(): void {
  }

  guest_login(): void {
    const data:any = {
      id:0,
      name:"Guest",
      image:null,
    }
    this.stateService.state.student = data;
    sessionStorage.setItem("student_login","true")
    sessionStorage.setItem("student_detail",JSON.stringify(data))
    this.router.navigate(['../student/list-quiz'], {relativeTo: this.route});
  }

}
