// Angular Imports
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// This Module's Components
import { DashboardRouterModule } from './dashboard-routing.module';
import { PRIMENG_IMPORTS, COMPONENT_DECLARATIONS, SERVICE_DECLARATIONS } from '.';
import { MemberAllClaimsComponent } from './components/member-all-claims/member-all-claims.component';
import { SharedModule } from '@app/shared-module/shared.module';
import { FamilyDeductablesComponent } from './components/family-deductables/family-deductables.component';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { IndividualDeductablesLimitsComponent } from './components/individual-deductables-limits/individual-deductables-limits.component';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './dashboard.effects';
import { StoreModule } from '@ngrx/store';
import { DasboardReducer } from './dashboard.reducer';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        DashboardRouterModule,
        CommonModule,
        ...PRIMENG_IMPORTS,
        SharedModule,
        NgCircleProgressModule.forRoot({
            'outerStrokeLinecap': 'round',
            'backgroundColor': '#FFFFFF',
            'maxPercent': 100,
            'radius': 60,
            'unitsColor': '#483500',
            'showInnerStroke': true,
            'innerStrokeWidth': 10,
            'unitsFontSize': '20',
            'titleFontSize': '25',
            'subtitleColor': '#483500',
            'showSubtitle': true,
            'showUnits': true,
            'startFromZero': false,
            'clockwise': false,
            'space': -10,
            'subtitle': 'Remaining',
            'subtitleFontSize': '15',
        }),
        StoreModule.forFeature('dashboard', DasboardReducer),
        EffectsModule.forFeature([DashboardEffects])
    ],
    declarations: [
        ...COMPONENT_DECLARATIONS,
        MemberAllClaimsComponent,
        FamilyDeductablesComponent,
        IndividualDeductablesLimitsComponent,
    ],
    providers: [
        ...SERVICE_DECLARATIONS
    ],
    exports: [
        ...COMPONENT_DECLARATIONS
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class DashboardModule {

}
