import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthRouteService } from '@core/services/auth.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ResetPasswordLinkResolver implements Resolve<any> {
  constructor(private authService: AuthRouteService) {
  }

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<any> { //: Observable<any> 
    let username = route.queryParams['username'];
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('token', route.queryParams['token']);
    let token = route.queryParams['token'];
    if (!username) {
      username = '';
    }
    if (!token) {
      token = '';
    }

    const obj = {
      username: username,
      token: token
    }
    // return this.authService.ValidateResetPasswordLink(userId, guid);
     return this.authService.ValidateResetPasswordLink(obj).pipe(
      catchError((err: any) => of(false))
     );
  }
}
