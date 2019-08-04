// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PRIMENG_IMPORTS, SERVICES_DECLARATIONS, COMPONENT_DECLARATIONS } from '.';
import { Routes, RouterModule } from '@angular/router';
import { SuccessTimerComponent } from './components/success-timer/success-timer.component';
import { RoutesConstants } from '@core/constants/route-constants';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploadModule } from 'primeng/primeng';

const sharedRoutes: Routes = [
    { path: RoutesConstants.successtimer, component: SuccessTimerComponent },
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ...PRIMENG_IMPORTS,
        RouterModule.forChild(sharedRoutes),
        TranslateModule, FileUploadModule
    ],
    declarations: [
        ...COMPONENT_DECLARATIONS,
    ],
    exports: [
        ...COMPONENT_DECLARATIONS,
        TranslateModule
    ]
})
export class SharedModule {
    public static forRoot() {
        return {
            ngModule: SharedModule,
            providers: [...SERVICES_DECLARATIONS]
        };
    }
}
