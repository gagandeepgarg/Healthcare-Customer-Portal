import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessTimerComponent } from './success-timer.component';

describe('SuccessTimerComponent', () => {
  let component: SuccessTimerComponent;
  let fixture: ComponentFixture<SuccessTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessTimerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
