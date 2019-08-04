import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Login, Logout, AuthActionTypes } from './auth.actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { defer, of, Observable } from 'rxjs';



@Injectable()
export class AuthEffects {
  @Effect({ dispatch: false })
  login = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action => localStorage.setItem('CustomerHEalthcareUser', JSON.stringify(action.payload.user)))
  );

  @Effect({ dispatch: false })
  logout = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(() => {
      localStorage.removeItem('CustomerHEalthcareUser');
      this.router.navigateByUrl('/login');
    })
  );

  @Effect()
  init$ = defer((): Observable<Login | Logout> => {
    const userData = localStorage.getItem('CustomerHEalthcareUser');
    if (userData) {
      return of(new Login(JSON.parse(userData)));
    } else {
      return of(new Logout());
    }
  });

  constructor(private actions$: Actions, private router: Router) { }

}
