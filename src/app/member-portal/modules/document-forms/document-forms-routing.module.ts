import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentFormsContainerComponent } from './components/document-forms-container/document-forms-container.component';
import { SharedModule } from '@app/shared-module/shared.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: DocumentFormsContainerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    SharedModule],
  exports: [RouterModule]
})
export class DocumentFormsRoutingModule { }
