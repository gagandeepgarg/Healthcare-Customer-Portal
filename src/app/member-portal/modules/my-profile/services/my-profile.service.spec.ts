import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { AuthRouteService } from '@core/services/auth.service';
import { MyProfileService } from './my-profile.service';
describe('MyProfileService', () => {
  let service: MyProfileService;
  beforeEach(() => {
    const httpClientStub = {
      get: arg1 => ({}),
      post: (arg1, userDetais2) => ({})
    };
    const authRouteServiceStub = {};
    TestBed.configureTestingModule({
      providers: [
        MyProfileService,
        { provide: HttpClient, useValue: httpClientStub },
        { provide: AuthRouteService, useValue: authRouteServiceStub }
      ]
    });
    service = TestBed.get(MyProfileService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
