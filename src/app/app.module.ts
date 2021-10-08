import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { QuizComponent } from './quiz/quiz.component';
import { ListQuizComponent } from './list-quiz/list-quiz.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DialogMessageComponent } from './dialog-message/dialog-message.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { SignupStudentComponent } from './signup-student/signup-student.component';
import { LoginStudentComponent } from './login-student/login-student.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { StudentComponent } from './student/student.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AvatarModule } from 'ngx-avatar';
import { TermsComponent } from './terms/terms.component';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { TeacherSigneupComponent } from './teacher-signeup/teacher-signeup.component';
import { TeacherForgotPwComponent } from './teacher-forgot-pw/teacher-forgot-pw.component';
import { StudentManagmentComponent } from './student-managment/student-managment.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { TeacherUpdateProfileComponent } from './teacher-update-profile/teacher-update-profile.component';
import { ClassStudentsComponent } from './class-students/class-students.component';
import { AddClassComponent } from './add-class/add-class.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { BuySubscriptionComponent } from './buy-subscription/buy-subscription.component';
import { EditClassComponent } from './edit-class/edit-class.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ProgressSpinnerDialogComponent } from './progress-spinner-dialog/progress-spinner-dialog.component';
import { QuizCompleteComponent } from './quiz-complete/quiz-complete.component';
import { PrivatePolicyComponent } from './private-policy/private-policy.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { environment } from "../environments/environment";
import { ReactiveFormsModule } from '@angular/forms';
import { ViewStudentsComponent } from './view-students/view-students.component';
import { ViewResultsComponent } from './view-results/view-results.component';
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.extensionTo)
  }
]);
export function provideConfig() {
  return config;
}



@NgModule({
  declarations: [
    AppComponent,
    ListQuizComponent,
    QuizComponent,
    DialogMessageComponent,
    UpdateProfileComponent,
    SignupStudentComponent,
    LoginStudentComponent,
    WelcomeComponent,
    StudentComponent,
    ChangePasswordComponent,
    TermsComponent,
    TeacherLoginComponent,
    TeacherSigneupComponent,
    TeacherForgotPwComponent,
    StudentManagmentComponent,
    SubscriptionComponent,
    TeacherUpdateProfileComponent,
    ClassStudentsComponent,
    AddClassComponent,
    AddStudentComponent,
    BuySubscriptionComponent,
    EditClassComponent,
    TeacherComponent,
    ProgressSpinnerDialogComponent,
    QuizCompleteComponent,
    PrivatePolicyComponent,
    ViewStudentsComponent,
    ViewResultsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    NgCircleProgressModule.forRoot(),
    AvatarModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
