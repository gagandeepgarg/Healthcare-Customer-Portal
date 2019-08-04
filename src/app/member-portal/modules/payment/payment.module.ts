import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './components/payment/payment.component';
import { RadioButtonModule, DropdownModule, DialogModule, CheckboxModule, ButtonModule } from 'primeng/primeng';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaymentService } from './service/payment.service';
import { DashboardService } from '../dashboard/services/dashboard.service';
import { SharedModule } from '@app/shared-module/shared.module';
import { PaymentReceiptComponent } from './components/payment-receipt/payment-receipt.component';
import { TableModule } from 'primeng/table';
import {CalendarModule} from 'primeng/calendar'


@NgModule({
  declarations: [PaymentComponent, PaymentReceiptComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,FormsModule,TableModule,CalendarModule,
    DialogModule, RadioButtonModule,DropdownModule,ButtonModule, CheckboxModule,ReactiveFormsModule,SharedModule
  ],
  providers: [PaymentService, DashboardService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class PaymentModule { }
