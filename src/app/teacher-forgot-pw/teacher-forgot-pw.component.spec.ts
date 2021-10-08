import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherForgotPwComponent } from './teacher-forgot-pw.component';

describe('TeacherForgotPwComponent', () => {
  let component: TeacherForgotPwComponent;
  let fixture: ComponentFixture<TeacherForgotPwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherForgotPwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherForgotPwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
