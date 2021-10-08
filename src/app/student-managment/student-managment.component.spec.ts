import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentManagmentComponent } from './student-managment.component';

describe('StudentManagmentComponent', () => {
  let component: StudentManagmentComponent;
  let fixture: ComponentFixture<StudentManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentManagmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
