// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { TopnavComponent } from './topnav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/primeng';
import { MessagesOverlayComponent } from './messages-overlay/messages-overlay.component';
import { SharedModule } from '@app/shared-module/shared.module';
import { MessagesService } from '@app/shared-module/services/messages.service';
import { ClickOutsideModule } from 'ng-click-outside';
@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        TooltipModule,
        SharedModule,
        ClickOutsideModule
    ],
    declarations: [
        TopnavComponent,
        MessagesOverlayComponent,
    ],
    providers: [
        MessagesService
    ],
    exports: [
        TopnavComponent,
    ]
})
export class TopnavModule {

}
