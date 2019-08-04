import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, SimpleChanges } from '@angular/core';
import { SharedService } from '@app/shared-module/services/shared.service';
import { CoverageInformationComponent } from './coverage-information.component';
import { COMMON_MODULES } from '@app/core/commonModules';
describe('CoverageInformationComponent', () => {
  let component: CoverageInformationComponent;
  let fixture: ComponentFixture<CoverageInformationComponent>;
  beforeEach(() => {
    const sharedServiceStub = {
      getMemberProfilePicture: arg1 => ({ subscribe: () => ({}) })
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports:[COMMON_MODULES],
      declarations: [CoverageInformationComponent],
      providers: [
        { provide: SharedService, useValue: sharedServiceStub }
      ]
    });
    fixture = TestBed.createComponent(CoverageInformationComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnChanges', () => {
    it('makes expected calls', () => {
      const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
        SharedService
      );
      component.dependents =[{
        "firstName": ".kbn5451154",
        "lastName": "655416+15",
        "memberName": ".kbn5451154655416+15",
        "memberType": "Dependent",
        "dependentRelationship": "Spouse",
        "planName": [
          "Trinity Value $ 10000 MSRA (181 Days +)",
          "Trinity Value $ 10000 MSRA (181 Days +)",
          "Trinity Value $ 10000 MSRA (181 Days +)"
        ],
        "product": [
          "Trinity Value",
          "Trinity Value",
          "Trinity Value"
        ],
        "plans":[
          "Trinity Value $ 10000 MSRA (181 Days +)",
        "Trinity Value $ 10000 MSRA (181 Days +)",
        "Trinity Value $ 10000 MSRA (181 Days +)"
      ],
        "levelOfCoverage": "Family",
        "paidThroughDate": null,
        "dateOfBirth": "1985-12-11T18:30:00",
        "dependentDetailId": 972,
        "dependentStatus": "Inactive",
        "digitalCardId": 59334,
        "avatarImageId": null
      },
      {
        "firstName": ".kbn5451154",
        "lastName": "655416+15",
        "memberName": ".kbn5451154655416+15",
        "memberType": "Dependent",
        "dependentRelationship": "Spouse",
        "planName": [
          "Trinity Value $ 10000 MSRA (181 Days +)",
          "Trinity Value $ 10000 MSRA (181 Days +)",
          "Trinity Value $ 10000 MSRA (181 Days +)"
        ],
        "product": [
          "Trinity Value",
          "Trinity Value",
          "Trinity Value"
        ],
        "plans":[
          "Trinity Value $ 10000 MSRA (181 Days +)",
        "Trinity Value $ 10000 MSRA (181 Days +)",
        "Trinity Value $ 10000 MSRA (181 Days +)"
      ],
        "levelOfCoverage": "Family",
        "paidThroughDate": null,
        "dateOfBirth": "1985-12-11T18:30:00",
        "dependentDetailId": 972,
        "dependentStatus": "Inactive",
        "digitalCardId": 59334,
        "avatarImageId": 59334
      },
      {
        "firstName": ".kbn5451154",
        "lastName": "655416+15",
        "memberName": ".kbn5451154655416+15",
        "memberType": "Dependent",
        "dependentRelationship": "Spouse",
        "planName": [
          "Trinity Value $ 10000 MSRA (181 Days +)",
          "Trinity Value $ 10000 MSRA (181 Days +)",
          "Trinity Value $ 10000 MSRA (181 Days +)"
        ],
        "plans":[
          "Trinity Value $ 10000 MSRA (181 Days +)",
        "Trinity Value $ 10000 MSRA (181 Days +)",
        "Trinity Value $ 10000 MSRA (181 Days +)"
      ],
        "product": [
          "Trinity Value",
          "Trinity Value",
          "Trinity Value"
        ],
        "levelOfCoverage": "Family",
        "paidThroughDate": null,
        "dateOfBirth": "1985-12-11T18:30:00",
        "dependentDetailId": 972,
        "dependentStatus": "Inactive",
        "digitalCardId": 59334,
        "avatarImageId": null
      }];
      let changes: SimpleChanges ={};
      component.ngOnChanges(changes);
      // spyOn(component, 'showPaginator').and.callThrough();
      // spyOn(sharedServiceStub, 'getMemberProfilePicture').and.callThrough();
      // expect(component.showPaginator).toBeTruthy();
      // expect(sharedServiceStub.getMemberProfilePicture).toBeTruthy();
    });
  });
  describe('showPaginator', () => {
    it('makes expected calls', () => {
      const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
        SharedService
      );
      component.showPaginator([12,11,1,14]);
      // spyOn(component, 'showPaginator').and.callThrough();
      // spyOn(sharedServiceStub, 'getMemberProfilePicture').and.callThrough();
      // expect(component.showPaginator).toBeTruthy();
      // expect(sharedServiceStub.getMemberProfilePicture).toBeTruthy();
    });
  });
});
