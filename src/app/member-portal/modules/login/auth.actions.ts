import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LoginAction = '[Auth] LoginAction',
  LogoutAction = '[Auth] LogoutAction',
}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAction;
  constructor(public payload: { user: any }) { }
}


export type AuthActions = Login;
