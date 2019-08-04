import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthAssesment2Component } from './health-assesment2.component';

describe('HealthAssesment2Component', () => {
  let component: HealthAssesment2Component;
  let fixture: ComponentFixture<HealthAssesment2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthAssesment2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthAssesment2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
