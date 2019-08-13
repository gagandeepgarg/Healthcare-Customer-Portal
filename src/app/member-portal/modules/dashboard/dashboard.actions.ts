import { Action } from '@ngrx/Store';

export enum DashboardActionTypes {
    ClaimsRequested = '[Dashboard] Claims Requested',
    ClaimsLoaded = '[Claims API] Claims Loaded'
}


export class ClaimsRequested implements Action {
    readonly type = DashboardActionTypes.ClaimsRequested;
    constructor(public payload) { }
}


export class ClaimsLoaded implements Action {
    readonly type = DashboardActionTypes.ClaimsLoaded;
    constructor(public payload) { }
}

export type DashboardActions = ClaimsRequested | ClaimsLoaded;
