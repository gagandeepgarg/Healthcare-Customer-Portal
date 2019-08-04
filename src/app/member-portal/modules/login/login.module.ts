// Angular Imports
import { NgModule,CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA } from '@angular/core';

import { LoginRouterModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { COMPONENT_DECLARATIONS, SERVICE_DECLARATIONS, PRIMENG_IMPORTS } from '.';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared-module/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        LoginRouterModule,
        CommonModule,
        ...PRIMENG_IMPORTS,
        SharedModule,
        StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer)
    ],
    declarations: [
        ...COMPONENT_DECLARATIONS
    ],
    providers: [
        ...SERVICE_DECLARATIONS
    ],
    exports: [
        ...COMPONENT_DECLARATIONS
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class LoginModule {

}
