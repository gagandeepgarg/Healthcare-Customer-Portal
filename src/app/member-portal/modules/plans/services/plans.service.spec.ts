import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { AuthRouteService } from '@core/services/auth.service';
import { PlansService } from './plans.service';
describe('PlansService', () => {
  let service: PlansService;
  beforeEach(() => {
    const httpClientStub = { get: (arg1, object2) => ({}) };
    const authRouteServiceStub = {};
    TestBed.configureTestingModule({
      providers: [
        PlansService,
        { provide: HttpClient, useValue: httpClientStub },
        { provide: AuthRouteService, useValue: authRouteServiceStub }
      ]
    });
    service = TestBed.get(PlansService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
