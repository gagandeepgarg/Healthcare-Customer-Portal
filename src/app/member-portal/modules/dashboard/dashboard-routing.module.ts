import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { RoutesConstants } from '@core/constants/route-constants';
import { MemberAllClaimsComponent } from './components/member-all-claims/member-all-claims.component';
import { ChangeSecurityQuestionsComponent } from './components/change-security-questions/change-security-questions.component';

const DashboardRoutes: Routes = [
    { path: '', pathMatch: 'full', component: DashboardComponent },
    { path: RoutesConstants.ChangePassword, component: ChangePasswordComponent },
    { path: RoutesConstants.ClaimsAll, component: MemberAllClaimsComponent },
    {path : RoutesConstants.ChangeSecurityQuestions, component : ChangeSecurityQuestionsComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(DashboardRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class DashboardRouterModule { }
