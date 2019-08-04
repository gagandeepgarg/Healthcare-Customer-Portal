import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdCardComponent } from './components/id-card/id-card.component';
import { SpecialServicesComponent } from './components/special-services/special-services.component';
import { RoutesConstants } from '@app/core/constants/route-constants';

const routes: Routes = [
   { path: RoutesConstants.idCard, component: IdCardComponent },
   { path: RoutesConstants.SpecialServices, component: SpecialServicesComponent },
   { path: '', pathMatch: 'full', component: IdCardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProfileRoutingModule { }
