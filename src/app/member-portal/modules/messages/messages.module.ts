import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './components/message/message.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared-module/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {NgxPaginationModule} from 'ngx-pagination';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { MessagesService } from '@shared-module/services/messages.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MessageComponent },
];
@NgModule({
  declarations: [MessageComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    TableModule,
    DialogModule,
    ButtonModule,
    NgxPaginationModule,
    ConfirmDialogModule
  ],
  providers: [
    MessagesService,
     ConfirmationService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class MessagesModule { }
