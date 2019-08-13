import { Injectable } from '@angular/core'
import { Effect, ofType, Actions } from '@ngrx/effects';
import { DashboardActionTypes, ClaimsRequested, ClaimsLoaded } from './dashboard.actions';
import { mergeMap, map } from 'rxjs/operators';
import { DashboardService } from './services/dashboard.service';

@Injectable()
export class DashboardEffects {

    @Effect()
    loadClaims$ = this.actions$.pipe(
        ofType<ClaimsRequested>(DashboardActionTypes.ClaimsLoaded),
        mergeMap(action => this.dashboardService.getClaimDetails(action.payload.claimsFilter)),
        map(claims => new ClaimsLoaded({ claims }))
    );

    constructor(private actions$: Actions, private dashboardService: DashboardService) { }
}
