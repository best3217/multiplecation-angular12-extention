import { StateService } from './state.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private stateService: StateService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }

  checkLogin = (): Observable<boolean | UrlTree>   => {
    let student_login = sessionStorage.getItem('student_login')
    const student_detail:any = sessionStorage.getItem('student_detail')

    let teacher_login = sessionStorage.getItem('teacher_login');
    const teacher_detail:any = sessionStorage.getItem('teacher_detail')
    if (student_login) {
          this.stateService.state.student = JSON.parse(student_detail)
      return of(true);
    }
    if(teacher_login){
      this.stateService.state.teacher = JSON.parse(teacher_detail)
      return of(true);
    }

    return of(this.router.parseUrl('/welcome'));
  }

}
