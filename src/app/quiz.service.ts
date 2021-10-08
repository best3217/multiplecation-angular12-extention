import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Quiz } from './models/quizz.model';
import { Question } from './models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

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

  getStudentQuizzes(studentId: number ): Observable<Quiz[] | null> {
    const data = {
      student_id: studentId,
      user_type: 0
    };
    // console.log(data)

    return this.http.post(this.baseUrl + 'quizzmodelList', data, { headers: this.headers }).pipe(
      map((response: any) => {
        if ( !(response && response.success)) { throw {apiMsg: response.message}; }

        return response.data.map((d: any) => ({
          id: d.id ,
          name: d.quizzes_name,
          teacherId: d.teacher_id,
          time: Number(d.quize_time),
          isPaid: d.is_paid,
          numberOfQuestion: Number(d.quiz_number),
          progress: (d.progress_results ? Number(d.progress_results) : 0),
          progressTime:d.progress_time,
          answerId: d.quiz_answareid,
          results: d.results
        }));
      }
      )
    );
  }

  getQuiz(studentId: number, quizId: number | undefined): Observable<Question[] | null> {
    const data = {
      student_id: studentId,
      quizzes_id: quizId
    };

    return this.http.post(this.baseUrl + 'quizzmodelData', data, { headers: this.headers }).pipe(
      map((response: any) => {
        if ( !(response && response.success)) { throw {apiMsg: response.message}; }

        return response.data.map((d: any) => ({
          id: d.id ,
          data_1: d.data_1,
          data_2: d.data_2
        }));
      }
      )
    );
  }

  addAnswer(studentId: number, quiz: Quiz): Observable<boolean | null> {
    const data = {
      student_id: studentId,
      quizzes_id: quiz.id,
      progress_time: quiz.progressTime,
      progress_results: quiz.progress,
      results_answare: JSON.stringify(quiz.results?.map(q => {return {
        id: q.id,
        quizzes_id: quiz.id,
        data_1: q.data_1,
        data_2: q.data_2,
        answare: q.answare,
        is_correct: q.iscorrect
      };
    })),
    };
    return this.http.post(this.baseUrl + 'answerequizzes', data, { headers: this.headers }).pipe(
      map((response: any) => {
        if ( !(response && response.success)) { throw {apiMsg: response.message}; }

        return true;
      }
      )
    );
  }
  delAnswer(answerId:number): Observable<boolean | null>{
    const data = {
      quizzesansware_id:answerId
    }
    return this.http.post(this.baseUrl + 'deleteAnswerequizzes', data, {headers: this.headers}).pipe(
      map((response: any) => {
        if ( !(response && response.success)) { throw {apiMsg: response.message}; }
        return true;
      }
    )
    )
  }
}
