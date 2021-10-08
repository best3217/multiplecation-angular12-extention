import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizCompleteComponent } from './quiz-complete.component';

describe('QuizCompleteComponent', () => {
  let component: QuizCompleteComponent;
  let fixture: ComponentFixture<QuizCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
