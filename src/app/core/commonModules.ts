import {
    InputTextModule, CalendarModule, DropdownModule, TooltipModule,
    SliderModule, ButtonModule, DialogModule, ProgressBarModule, ConfirmDialogModule,
    CardModule, AccordionModule, FileUploadModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

export const COMMON_MODULES: any = [BrowserAnimationsModule, NoopAnimationsModule,
    InputTextModule, ReactiveFormsModule, FormsModule,
    CalendarModule,
    TooltipModule,
    SliderModule, ProgressBarModule,
    TableModule, ConfirmDialogModule, HttpClientTestingModule,
    ButtonModule, CardModule, DialogModule, DropdownModule,
    AccordionModule, FileUploadModule];