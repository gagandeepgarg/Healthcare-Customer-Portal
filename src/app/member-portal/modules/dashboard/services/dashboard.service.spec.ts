import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { AuthRouteService } from '@core/services/auth.service';
import { ClamesFilter } from '../Modals/ClamesFilter';
import { DashboardService } from './dashboard.service';
//import { Headers, ResponseOptions} from '@angular/http';
import { of } from 'rxjs';
describe('DashboardService', () => {
  let service: DashboardService;
  let spy: any;
  beforeEach(() => {
    const httpClientStub = {
      get: arg1 => ({}),
      post: (arg1, clamesFilter2) => ({})
    };
    const authRouteServiceStub = { checkUserPasswordExpire: userId1 => ({}) };
    const clamesFilterStub = {};
    TestBed.configureTestingModule({
      providers: [
        DashboardService,
        { provide: HttpClient, useValue: httpClientStub },
        { provide: AuthRouteService, useValue: authRouteServiceStub },
        { provide: ClamesFilter, useValue: clamesFilterStub }
      ]
    });
    service = TestBed.get(DashboardService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('getClaimDetails', () => {
    it('makes expected calls', () => {
      const httpClientStub: HttpClient = TestBed.get(HttpClient);
      const clamesFilterStub: ClamesFilter = TestBed.get(ClamesFilter);
      spyOn(httpClientStub, 'post').and.callThrough();
      service.getClaimDetails(clamesFilterStub);
      expect(httpClientStub.post).toHaveBeenCalled();
    });
  });
  it('should sendMoveRequest', inject([DashboardService], (service: DashboardService) => {
    const httpClientStub: HttpClient = TestBed.get(HttpClient);
    spy = spyOn(httpClientStub, 'post')
      .and.returnValue(of({}));
    service.getClaimDetails({
      externalMemberId: '674881725',
      userId: '8',
      pageSize: 19,
      pageNumber: 1,
      filterAttribute: 'lastweek',
      sortAttribute: 'Claim',
      sortOrder: 'desc',
      claimsType: 1
    });
    expect(spy.calls.count()).toBe(1);
  }));
  describe('getStates', () => {
    it('makes expected calls', () => {
      const httpClientStub: HttpClient = TestBed.get(HttpClient);
      spyOn(httpClientStub, 'get').and.callThrough();
      service.getStates();
      expect(httpClientStub.get).toHaveBeenCalled();
    });
  });
  describe('checkUserPasswordExpire', () => {
    it('makes expected calls', () => {
      const httpClientStub: HttpClient = TestBed.get(HttpClient);
      spyOn(httpClientStub, 'get').and.callThrough();
      service.checkUserPasswordExpire('8');
      expect(httpClientStub.get).toBeTruthy();
    });
  });
});
