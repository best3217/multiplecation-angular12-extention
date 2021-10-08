import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Student } from './models/student.model';
import { Teacher } from './models/teacher.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = new HttpHeaders({
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "*", 
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    "Content-Type": "application/json",
    appKey: environment.appConfig.appKey
  });

  headers2 = new HttpHeaders({
    appKey: environment.appConfig.appKey
  });

  baseUrl = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.appConfig.baseUrl;
   }



   studentSignUp(student: Student): Observable<Student | null> {
    const data = {
      name: student.name,
      teacher_code: student.code,
      password: student.password,
      user_type: 0
     };

    return this.http.post(this.baseUrl + 'stuendtsignup', data, { headers: this.headers }).pipe(
      map((response: any) => {
        if ( !(response && response.success)) { throw {apiMsg: response.message}; }
        return {
          id: response.data.id ,
          name: response.data.name,
          image: response.data.profile_pic,
          teacher:response.data.teacher
        };
      }
      )
    );
   }

   studentLogIn(student: Student): Observable<Student | null> {
     const data = {
      name: student.name,
      teacher_code: student.code,
      password: student.password,
      user_type: 0
     };

     return this.http.post(this.baseUrl + 'studentlogin', data, { headers: this.headers }).pipe(
      map((response: any) => {
        if ( !(response && response.success)) { throw {apiMsg: response.message}; }

        return {
          id: response.data.id ,
          name: response.data.name,
          image: response.data.profile_pic,
          teacher: response.data.teacher
        };
      }
      )
    );
   }

   studentUpdate(student: any): Observable<Student> {

    return this.http.post(this.baseUrl + 'studentUpdateProfile', student, { headers: this.headers2 }).pipe(
      map((response: any) => {
        if ( !(response && response.success)) { throw {apiMsg: response.message}; }
        return {
          id: response.data.id ,
          name: response.data.name,
          image: response.data.profile_pic,
          teacher:response.data.teacher
        };
      }
      )
    );
   }


   changePassword(user: any, opassword: string, npassword: string): Observable<boolean | null> {
    const data = {
      user_type: user.type,
      user_id: user.id,
      password: opassword,
      new_password: npassword
    };

    return this.http.post(this.baseUrl + 'changePassword', data, { headers: this.headers }).pipe(
     map((response: any) => {
       if ( !(response && response.success)) { throw {apiMsg: response.message}; }

       return true;
     }
     )
   );
  }

  teacherLogIn(email: string, password: string): Observable<Teacher | null> {
    const data = {
     email,
     password,
     user_type: 1
    };

    return this.http.post(this.baseUrl + 'login', data, { headers: this.headers }).pipe(
     map((response: any) => {
      if ( !(response && response.success)) { throw {apiMsg: response.message}; }

      return {
         id: response.data.id ,
         firstName: response.data.first_name,
         lastName: response.data.last_name,
         email: response.data.email,
         image: response.data.profile_pic,
         is_subscription: response.data.is_subscription,
         subscription: response.data.subscription
       };
     }
     )
   );
  }


  teacherSignUp(values: any): Observable<Teacher | null> {
    const data = {
     first_name: values.firstName,
     last_name: values.lastName,
     email: values.email,
     password: values.password,
     user_type: 1
    };

    return this.http.post(this.baseUrl + 'signup', data, { headers: this.headers }).pipe(
     map((response: any) => {
      if ( !(response && response.success)) { throw {apiMsg: response.message}; }

      return {
         id: response.data.id ,
         firstName: response.data.first_name,
         lastName: response.data.last_name,
         email: response.data.email,
         image: response.data.profile_pic,
         is_subscription: response.data.is_subscription,
         subscription: response.data.subscription
       };
     }
     )
   );
  }

  resetPassword(email: string): Observable<boolean | null> {
    const data = {
     email,
     user_type: 1
    };

    return this.http.post(this.baseUrl + 'forgotpassword', data, { headers: this.headers }).pipe(
     map((response: any) => {
      if ( !(response && response.success)) { throw {apiMsg: response.message}; }
      return true;
     }
     )
   );
    }

    deleteStudent(id: number): Observable<boolean | null> {
      const data = {
        user_id: id,
      };

      return this.http.post(this.baseUrl + 'deleteClassstudents', data, { headers: this.headers }).pipe(
       map((response: any) => {
         if ( !(response && response.success)) { throw {apiMsg: response.message}; }

         return true;
       }
       )
     );
    }

    teacherUpdate(teacher: any): Observable<Teacher> {

      return this.http.post(this.baseUrl + 'updateProfile', teacher, { headers: this.headers2 }).pipe(
        map((response: any) => {
          if ( !(response && response.success)) { throw {apiMsg: response.message}; }
          return {
            id: response.data.id,
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            email: response.data.email,
            image: response.data.profile_pic,
            is_subscription: response.data.is_subscription,
            subscription: response.data.subscription
          };
        }
        )
      );
     }
}
