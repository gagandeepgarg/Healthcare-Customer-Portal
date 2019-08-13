import Claim from './Modals/claim.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { DashboardActions, DashboardActionTypes } from './dashboard.actions';

export interface DashboardState extends EntityState<Claim> {
    ClaimsEntities: { [key: number]: Claim };
}

export const adaptor: EntityAdapter<Claim> = createEntityAdapter<Claim>();

export const initialDashboardState = adaptor.getInitialState();

export function DasboardReducer(state , action: DashboardActions): DashboardState {
    switch (action.type) {
        case DashboardActionTypes.ClaimsLoaded:
            return adaptor.addAll(action.payload.claims, state);
        default:
            return state;
    }
}