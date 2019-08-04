import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RoutesConstants } from 'src/app/core/constants/route-constants';
import { MemberRegistrationComponent } from './components/member-registration/member-registration.component';

const registrationRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: MemberRegistrationComponent
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(registrationRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class MemberRegistrationRouterModule { }
