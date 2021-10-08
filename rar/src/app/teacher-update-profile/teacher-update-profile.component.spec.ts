import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherUpdateProfileComponent } from './teacher-update-profile.component';

describe('TeacherUpdateProfileComponent', () => {
  let component: TeacherUpdateProfileComponent;
  let fixture: ComponentFixture<TeacherUpdateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherUpdateProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherUpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
