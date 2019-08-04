import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RoutesConstants } from 'src/app/core/constants/route-constants';
import { LoginComponent } from './components/user-login/login.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordLinkResolver } from './resolvers/reset-password-link.resolver';

const LoginRoutes: Routes = [
    { path: '', pathMatch: 'full', component: LoginComponent },
    {
        path: RoutesConstants.PasswordReset, component: PasswordResetComponent, resolve: { data: ResetPasswordLinkResolver }
    },
    {
        path: RoutesConstants.ForgetPassword, component: ForgetPasswordComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(LoginRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class LoginRouterModule { }
