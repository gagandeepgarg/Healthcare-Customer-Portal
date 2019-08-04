// tslint:disable-next-line:max-line-length
import { InputTextModule, CalendarModule, DropdownModule, ButtonModule, DialogModule, TooltipModule, ProgressBarModule, ConfirmationService, ConfirmDialogModule } from 'primeng/primeng';
import { SliderModule } from 'primeng/slider';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './services/dashboard.service';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ClaimsDataTableComponent } from './components/claims-data-table/claims-data-table.component';
import { TableModule } from 'primeng/table';
import { MemberAllClaimsComponent } from './components/member-all-claims/member-all-claims.component';
import { ChangeSecurityQuestionsComponent } from './components/change-security-questions/change-security-questions.component';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';


// PrimeNG module imports
export const PRIMENG_IMPORTS: any = [
    InputTextModule,
    CalendarModule,
    DropdownModule,
    TooltipModule,
    SliderModule, ButtonModule, DialogModule, ProgressBarModule,
    TableModule, ConfirmDialogModule, CarouselModule, CardModule];

// Component declarations
export const COMPONENT_DECLARATIONS: any = [
    DashboardComponent,
    ChangePasswordComponent,
    ClaimsDataTableComponent, MemberAllClaimsComponent, ChangeSecurityQuestionsComponent
];
// Service declarations
export const SERVICE_DECLARATIONS: any = [
    DashboardService, ConfirmationService];
