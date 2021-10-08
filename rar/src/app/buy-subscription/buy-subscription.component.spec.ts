import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySubscriptionComponent } from './buy-subscription.component';

describe('BuySubscriptionComponent', () => {
  let component: BuySubscriptionComponent;
  let fixture: ComponentFixture<BuySubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuySubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuySubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
