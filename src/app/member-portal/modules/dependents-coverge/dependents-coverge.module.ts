import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared-module/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AccordionModule } from 'primeng/accordion';
import { FileUploadModule } from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';
import {StepsModule} from 'primeng/steps';
import {CheckboxModule} from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import {InputTextareaModule} from 'primeng/inputtextarea';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

import { DependentsCovergeRoutingModule } from './dependents-coverge-routing.module';
import { SubscriberInformationComponent } from './components/subscriber-information/subscriber-information.component';
import { DependentInformationComponent } from './components/dependent-information/dependent-information.component';
import { CoverageInformationComponent } from './components/coverage-information/coverage-information.component';
import { DependentsCoverageComponent } from './dependents-coverage.component';
import { AddDependentComponent } from './components/dependent-information/add-dependent/add-dependent.component';
import { EditSubscriberComponent } from './components/subscriber-information/edit-subscriber/edit-subscriber.component';
import { UploadImageComponent } from './components/dependent-information/upload-image/upload-image.component';
import { DependentDetailsComponent } from './components/dependent-information/add-dependent/dependent-details/dependent-details.component';
import { HealthAssesment1Component } from './components/dependent-information/add-dependent/health-assesment1/health-assesment1.component';
import { HealthAssesment2Component } from './components/dependent-information/add-dependent/health-assesment2/health-assesment2.component';




@NgModule({
  declarations: [SubscriberInformationComponent, DependentInformationComponent,
    CoverageInformationComponent, DependentsCoverageComponent, AddDependentComponent,
    EditSubscriberComponent, UploadImageComponent, DependentDetailsComponent, 
    HealthAssesment1Component, HealthAssesment2Component],
  imports: [
    CommonModule, TableModule, ButtonModule, CardModule, InputTextModule, TooltipModule,
    DialogModule, DropdownModule, CalendarModule, ConfirmDialogModule, StepsModule,
    CheckboxModule, AccordionModule, FileUploadModule, MessagesModule,RadioButtonModule,InputTextareaModule,
    DependentsCovergeRoutingModule, SharedModule, FormsModule, ReactiveFormsModule,
  ],
  providers: [ConfirmationService, MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class DependentsCovergeModule { }
