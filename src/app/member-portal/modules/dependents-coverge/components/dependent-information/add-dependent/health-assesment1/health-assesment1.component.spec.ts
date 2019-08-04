import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthAssesment1Component } from './health-assesment1.component';

describe('HealthAssesment1Component', () => {
  let component: HealthAssesment1Component;
  let fixture: ComponentFixture<HealthAssesment1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthAssesment1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthAssesment1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
