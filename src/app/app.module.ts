import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TopnavModule } from './member-portal/modules/topnav/topnav.module';
import { SidemenuModule } from './member-portal/modules/sidemenu/sidemenu.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from '@core/core.module';
import { TooltipModule, DialogModule, ButtonModule, ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { PageNotFoundComponent } from '@shared-module/components/page-not-found/page-not-found.component';
import { SharedModule } from '@shared-module/shared.module';
import { PortalHttpInterceptor } from '@core/services/http-interceptor.service';

import { UserIdleModule } from 'angular-user-idle';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TopnavModule,
    SidemenuModule,
    HttpClientModule,
    CoreModule,
    SharedModule.forRoot(),
    TooltipModule,
    DialogModule,
    ButtonModule,
    ConfirmDialogModule,
    // UserIdleModule.forRoot({idle: 600, timeout: 180, ping: 120})
    UserIdleModule.forRoot({idle: 180, timeout: 180, ping: 120}),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: PortalHttpInterceptor, multi: true },
    ConfirmationService
  ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

