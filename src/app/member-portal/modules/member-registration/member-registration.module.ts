import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { COMPONENT_DECLARATIONS, PRIMENG_IMPORTS, SERVICE_DECLARATIONS } from '.';
import { MemberRegistrationRouterModule } from './member-registration-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared-module/shared.module';
// import { NgCircleProgressModule } from 'ng-circle-progress';
// import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
// import { reduce } from 'rxjs/operators';
// import {RoundProgressModule} from 'angular-svg-round-progressbar';

@NgModule({
  declarations: [
    ...COMPONENT_DECLARATIONS
  ],
  providers: [
    ...SERVICE_DECLARATIONS
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ...PRIMENG_IMPORTS,
    MemberRegistrationRouterModule,
    SharedModule,
    /* InternationalPhoneNumberModule,
      NgCircleProgressModule.forRoot({
      "backgroundColor": "#828485",
       "radius": 10,
       "unitsColor": "#483500",
       "outerStrokeWidth": 0,
      "outerStrokeColor": "#FFFFFF",
      "innerStrokeColor": "#FFFFFF",
      "titleColor": "#212121",//"#483500",
      "titleFontSize": "14",
       "subtitleColor": "#483500",
      "animationDuration" : 0,
      "showSubtitle": false,
      "showUnits": false,
      "showInnerStroke": false,
       "startFromZero": false,
     }) */
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class MemberRegistrationModule { }
