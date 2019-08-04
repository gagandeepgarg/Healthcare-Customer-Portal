import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyDeductablesComponent } from './family-deductables.component';

describe('FamilyDeductablesComponent', () => {
  let component: FamilyDeductablesComponent;
  let fixture: ComponentFixture<FamilyDeductablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyDeductablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyDeductablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
