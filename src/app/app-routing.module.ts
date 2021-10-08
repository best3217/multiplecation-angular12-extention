import { ClassStudentsComponent } from './class-students/class-students.component';
import { TeacherSigneupComponent } from './teacher-signeup/teacher-signeup.component';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { TeacherUpdateProfileComponent } from './teacher-update-profile/teacher-update-profile.component';
import { StudentManagmentComponent } from './student-managment/student-managment.component';
import { TeacherComponent } from './teacher/teacher.component';
import { TermsComponent } from './terms/terms.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { SignupStudentComponent } from './signup-student/signup-student.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginStudentComponent } from './login-student/login-student.component';
import { StudentComponent } from './student/student.component';
import { PrivatePolicyComponent } from "./private-policy/private-policy.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListQuizComponent } from './list-quiz/list-quiz.component';
import { QuizCompleteComponent } from "./quiz-complete/quiz-complete.component";
import { ViewStudentsComponent } from "./view-students/view-students.component";
import { ViewResultsComponent } from "./view-results/view-results.component";
import { QuizComponent } from './quiz/quiz.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'student',
    pathMatch: 'full',
  },
  {
    path: 'student',
    component: StudentComponent,
    children: [
      {
        path: '',
        redirectTo: 'list-quiz',
        pathMatch: 'full',
      },
      {
        path: 'list-quiz',
        component: ListQuizComponent
      },
      {
        path: 'quize-complete/:id',
        component: QuizCompleteComponent,
      },
      {
        path: 'update',
        component: UpdateProfileComponent
      },
      {
        path: 'quiz/:id',
        component: QuizComponent,
      },
      {
        path: 'change-pw',
        component: ChangePasswordComponent,
      },
      {
        path: 'terms',
        component: TermsComponent,
      },
      {
        path: 'private',
        component:PrivatePolicyComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'teacher',
    component: TeacherComponent,
    children: [
      {
        path: '',
        redirectTo: 'student-management',
        pathMatch: 'full',
      },
      {
        path: 'student-management',
        component: StudentManagmentComponent
      },
      {
        path: 'students-class/:id/:code',
        component: ClassStudentsComponent
      },
      {
        path: 'students-view/:id',
        component:ViewStudentsComponent
      },
      {
        path: 'students-view/:id/:answerId/:id1',
        component:ViewResultsComponent
      },
      {
        path: 'update',
        component: TeacherUpdateProfileComponent
      },
      {
        path: 'subscription',
        component: SubscriptionComponent,
      },
      {
        path: 'change-pw',
        component: ChangePasswordComponent,
      },
      {
        path: 'terms',
        component: TermsComponent,
      },
      {
        path: 'private',
        component:PrivatePolicyComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'student-login',
    component: LoginStudentComponent
  },
  {
    path: 'student-signup',
    component: SignupStudentComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'terms-condition',
    component:TermsComponent
  },
  {
    path: 'private-policy',
    component:PrivatePolicyComponent
  },
  {
    path: 'teacher-login',
    component: TeacherLoginComponent
  },
  {
    path: 'teacher-signup',
    component: TeacherSigneupComponent
  },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
