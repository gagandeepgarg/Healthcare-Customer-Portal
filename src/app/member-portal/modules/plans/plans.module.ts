// Angular Imports
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

// This Module's Components
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlanDetailsComponent } from './components/plan-details/plan-details.component';
import { PlansService } from './services/plans.service';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared-module/shared.module';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: PlanDetailsComponent },
  ];

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule],
    declarations: [
        PlanDetailsComponent],
    providers: [PlansService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    exports: [RouterModule],
})
export class PlansModule {

}
