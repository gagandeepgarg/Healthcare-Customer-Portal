
import { InputTextModule, CalendarModule, DropdownModule, ButtonModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { SuccessTimerComponent } from './components/success-timer/success-timer.component';
import { SharedService } from './services/shared.service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

// PrimeNG module imports
export const PRIMENG_IMPORTS: any = [
  InputTextModule,
  CalendarModule,
  TableModule,
  DropdownModule,
  SliderModule,
  ButtonModule];

// Component declarations
export const COMPONENT_DECLARATIONS: any = [
  SuccessTimerComponent, UserProfileComponent, PageHeaderComponent
];

// Core Services
export const SERVICES_DECLARATIONS: any = [
  SharedService,
];
