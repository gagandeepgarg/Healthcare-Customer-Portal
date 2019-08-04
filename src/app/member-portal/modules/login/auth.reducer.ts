import { Action } from '@ngrx/store';
import { AuthActionTypes, AuthActions } from '@app/member-portal/modules/login/auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  loggedIn: boolean;
  user: any;
}

export const initialAuthState: AuthState = {
  loggedIn: false,
  user: undefined
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginAction:
        return {
          loggedIn: true,
          user: action.payload.user
        };

    default:
      return state;
  }
}
