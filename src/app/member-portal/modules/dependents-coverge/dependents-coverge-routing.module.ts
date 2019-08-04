import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesConstants } from '@app/core/constants/route-constants';
import { DependentsCoverageComponent } from './dependents-coverage.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DependentsCoverageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DependentsCovergeRoutingModule { }
