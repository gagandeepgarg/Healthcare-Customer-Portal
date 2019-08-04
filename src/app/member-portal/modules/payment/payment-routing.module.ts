import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './components/payment/payment.component';
import { SharedModule } from '@app/shared-module/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentReceiptComponent } from './components/payment-receipt/payment-receipt.component';
import { RoutesConstants } from '@app/core/constants/route-constants';
const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: PaymentComponent
},
{
  path: RoutesConstants.Payment_Recipt,
  component: PaymentReceiptComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes),
    SharedModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
