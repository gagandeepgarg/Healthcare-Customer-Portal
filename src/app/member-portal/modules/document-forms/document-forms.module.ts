import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentFormsService } from './services/document-forms.service';
import { DocumentFormsContainerComponent } from './components/document-forms-container/document-forms-container.component';
import { DocumentFormsRoutingModule } from './document-forms-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ListDocumentsComponent } from './components/list-documents/list-documents.component';
import { DocumentSearchHeaderComponent } from './components/document-search-header/document-search-header.component';
import { SearchedDocumentsComponent } from './components/searched-documents/searched-documents.component';
import { InputTextModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared-module/shared.module';
@NgModule({
  declarations: [DocumentFormsContainerComponent, ListDocumentsComponent, DocumentSearchHeaderComponent,
    SearchedDocumentsComponent],
  imports: [
    FormsModule,
    CommonModule,
    DocumentFormsRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
    SharedModule
  ],
  providers: [DocumentFormsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class DocumentFormsModule { }
