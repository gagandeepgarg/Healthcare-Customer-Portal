import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');


export const FetchClaimsByExternalId = (externalId: string) => createSelector(
    selectDashboardState,
    dashboardState => dashboardState.entities[externalId]
);
