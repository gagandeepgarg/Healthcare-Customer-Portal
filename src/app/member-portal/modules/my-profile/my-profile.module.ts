import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileRoutingModule } from './my-profile-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule, DialogModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared-module/shared.module'
import { IdCardComponent } from './components/id-card/id-card.component';
import { SpecialServicesComponent } from './components/special-services/special-services.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
@NgModule({
  declarations: [IdCardComponent, SpecialServicesComponent],
  imports: [
    FormsModule,
    CommonModule,
    MyProfileRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    SharedModule,
    NgxExtendedPdfViewerModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class MyProfileModule { }
