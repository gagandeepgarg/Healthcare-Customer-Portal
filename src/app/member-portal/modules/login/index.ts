import { LoginComponent } from './components/user-login/login.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { InputTextModule, TooltipModule, ButtonModule, ProgressBarModule, DialogModule } from 'primeng/primeng';
import { LoginService } from './services/login.service';
import { ResetPasswordLinkResolver } from './resolvers/reset-password-link.resolver';
import {MessageModule} from 'primeng/message';

// Component declarations
export const COMPONENT_DECLARATIONS: any = [
    LoginComponent,
    PasswordResetComponent,
    ForgetPasswordComponent
];
export const SERVICE_DECLARATIONS: any = [
    LoginService,
    ResetPasswordLinkResolver
];
// PrimeNg imports
export const PRIMENG_IMPORTS: any = [
    InputTextModule,
    TooltipModule,
    ButtonModule, ProgressBarModule, MessageModule,
    DialogModule
];
