import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqRoutingModule } from './faq-routing.module';
import { FormsModule } from '@angular/forms';
import { COMPONENT_DECLARATIONS, SERVICE_DECLARATIONS, PRIMENG_IMPORTS } from '.';
import { SharedModule } from '@app/shared-module/shared.module';
@NgModule({
  declarations: [
    ...COMPONENT_DECLARATIONS
  ],
  imports: [
    CommonModule,
    FormsModule,
    FaqRoutingModule,
    ...PRIMENG_IMPORTS,
    SharedModule
  ],
  providers: [
    ...SERVICE_DECLARATIONS
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class FaqModule { }
