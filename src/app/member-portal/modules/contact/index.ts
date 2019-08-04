import { ContactComponent } from './components/contact/contact.component';
import { ContactService } from './services/contact.service';
import { InputTextModule, ButtonModule, DialogModule, InputTextareaModule } from 'primeng/primeng';


// Component declarations
export const COMPONENT_DECLARATIONS: any = [
    ContactComponent
];
export const SERVICE_DECLARATIONS: any = [
    ContactService
];
// PrimeNg imports
export const PRIMENG_IMPORTS: any = [
    InputTextModule, ButtonModule, DialogModule, InputTextareaModule
];
