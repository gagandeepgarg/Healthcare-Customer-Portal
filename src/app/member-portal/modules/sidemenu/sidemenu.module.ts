// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// This Module's Components
import { SidemenuComponent } from './sidemenu.component';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ConfirmDialogModule
    ],
    declarations: [
        SidemenuComponent,
    ],
    providers: [ConfirmationService],
    exports: [
        SidemenuComponent,
    ]
})
export class SidemenuModule {

}
