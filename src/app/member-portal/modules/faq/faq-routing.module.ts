import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqContainerComponent } from './components/faq-container/faq-container.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: FaqContainerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRoutingModule { }
