import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualDeductablesLimitsComponent } from './individual-deductables-limits.component';

describe('IndividualDeductablesLimitsComponent', () => {
  let component: IndividualDeductablesLimitsComponent;
  let fixture: ComponentFixture<IndividualDeductablesLimitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualDeductablesLimitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualDeductablesLimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
