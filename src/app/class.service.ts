import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Class } from './models/class.model';
import { Student } from './models/student.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    appKey: environment.appConfig.appKey
  });

  baseUrl = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.appConfig.baseUrl;
   }

  getAllClasses(id: number): Observable<Class[] | null> {

    const data = {
      user_type: 1,
      user_id: id
    };

    return this.http.post(this.baseUrl + 'teacherclassList', data, { headers: this.headers }).pipe(
      map((response: any) => {
       if ( !(response && response.success)) { throw {apiMsg: response.message}; }

       return response.data.map((d: any) => ({
          id: d.id,
          code: d.class_code,
          name: d.class_name
        }));
      }
      )
    );

  }

  getSudentsCalss(userId: number, id: number): Observable<Student[] | null> {

    const data = {
      user_id: userId,
      class_id: id
    };

    return this.http.post(this.baseUrl + 'classstudents', data, { headers: this.headers }).pipe(
      map((response: any) => {
       if ( !(response && response.success)) { throw {apiMsg: response.message}; }
       console.log(response.data)
       return response.data.map((d: any) => ({
          id: d.id,
          name: d.name,
          image: d.profile_pic
        }));
      }
      )
    );

  }

  addClass(id: number, name: string): Observable<Class | null> {

    const data = {
      user_id: id,
      user_type: 1,
      class_name: name
    };

    return this.http.post(this.baseUrl + 'addclass', data, { headers: this.headers }).pipe(
      map((response: any) => {
       if ( !(response && response.success)) { throw {apiMsg: response.message}; }

       return {
        id: response.data.id,
        code: response.data.class_code,
        name: response.data.class_name
        };
      }
      )
    );
  }

  editClass(idTeacher: number, idClass: number, name: string): Observable<boolean | null> {

    const data = {
      user_id: idTeacher,
      user_type: 1,
      class_id: idClass,
      class_name: name
    };

    return this.http.post(this.baseUrl + 'updateclass', data, { headers: this.headers }).pipe(
      map((response: any) => {
       if ( !(response && response.success)) { throw {apiMsg: response.message}; }

       return true;
      }
      )
    );
  }

  deleteClass(userId: number, id: number): Observable<boolean | null> {
    const data = {
      user_id: userId,
      user_type: 1,
      class_id: id
    };

    return this.http.post(this.baseUrl + 'deleteclass', data, { headers: this.headers }).pipe(
     map((response: any) => {
       if ( !(response && response.success)) { throw {apiMsg: response.message}; }

       return true;
     }
     )
   );
    }
}
