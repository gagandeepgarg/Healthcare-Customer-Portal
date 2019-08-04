import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { RoutesConstants } from './core/constants/route-constants';
import { AuthGuardService } from '@core/services/auth-guard.service';
import { PageNotFoundComponent } from '@shared-module/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: '@modules/login/login.module#LoginModule',
  },
  {
    path: RoutesConstants.Login,
    loadChildren: '@modules/login/login.module#LoginModule',
  },
  {
    path: RoutesConstants.Registration,
    loadChildren: '@modules/member-registration/member-registration.module#MemberRegistrationModule',
  },
  {
    path: RoutesConstants.Dashboard,
    loadChildren: '@modules/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuardService]
  },
  {
    path: RoutesConstants.myProfile,
    loadChildren: '@modules/my-profile/my-profile.module#MyProfileModule',
    canActivate: [AuthGuardService]
  },
  {
    path: RoutesConstants.DocumentForms,
    loadChildren: '@modules/document-forms/document-forms.module#DocumentFormsModule',
    canActivate: [AuthGuardService]
  },
  {
    path: RoutesConstants.FAQ,
    loadChildren: '@modules/faq/faq.module#FaqModule',
    canActivate: [AuthGuardService]
  },
  {
    path: RoutesConstants.Contact,
    loadChildren: '@modules/contact/contact.module#ContactModule',
    canActivate: [AuthGuardService]
  },
  {
    path: RoutesConstants.messages,
    loadChildren: '@modules/messages/messages.module#MessagesModule',
    canActivate: [AuthGuardService]
  },
  {
    path: RoutesConstants.Dependents_Coverage,
    loadChildren: '@modules/dependents-coverge/dependents-coverge.module#DependentsCovergeModule',
    canActivate: [AuthGuardService]
  },
  {
    path: RoutesConstants.Plans,
    loadChildren: '@modules/plans/plans.module#PlansModule',
    canActivate: [AuthGuardService]
  },
  {
    path: RoutesConstants.Shared,
    loadChildren: '@shared-module/shared.module#SharedModule',
  },
  {
    path: RoutesConstants.changePayment,
    loadChildren: '@modules/payment/payment.module#PaymentModule',
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
  },
  {
    path: RoutesConstants.PageNotFound,
    component: PageNotFoundComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
