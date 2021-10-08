import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSigneupComponent } from './teacher-signeup.component';

describe('TeacherSigneupComponent', () => {
  let component: TeacherSigneupComponent;
  let fixture: ComponentFixture<TeacherSigneupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherSigneupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSigneupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
