
import {
  InputTextModule, TooltipModule, ButtonModule, StepsModule, DropdownModule,
  CheckboxModule, ProgressBarModule, RadioButtonModule, PasswordModule, CalendarModule,
  ScrollPanelModule, ConfirmDialogModule
} from 'primeng/primeng';
import { ConfirmationService } from 'primeng/api';
import { MemberCreateAccountComponent } from './components/member-create-account/member-create-account.component';
import { MemberPersonalInfoComponent } from './components/member-personalinfo/Member-PersonalInfo';
import { MemberRegistrationComponent } from './components/member-registration/member-registration.component';
import { RegistrationService } from './services/registration.service';

// Component declarations
export const COMPONENT_DECLARATIONS: any = [
  MemberPersonalInfoComponent, MemberCreateAccountComponent, MemberRegistrationComponent
];
// services declarations
export const SERVICE_DECLARATIONS: any = [
  RegistrationService, ConfirmationService
];

// PrimeNg imports
export const PRIMENG_IMPORTS: any = [
  InputTextModule,
  TooltipModule,
  ButtonModule,
  CalendarModule, ScrollPanelModule, StepsModule, DropdownModule, CheckboxModule,
  ProgressBarModule, RadioButtonModule, PasswordModule, ConfirmDialogModule];
