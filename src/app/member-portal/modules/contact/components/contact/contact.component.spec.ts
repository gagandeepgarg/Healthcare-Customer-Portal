import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import * as constants  from '@core/constants/app-constants';
import { ContactComponent } from './contact.component';
import { SharedModule, InputTextModule, ButtonModule, DialogModule, InputTextareaModule } from 'primeng/primeng';
describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  beforeEach(() => {
    const abstractControlStub = { value: { trim: () => ({}) } };
    const contactServiceStub = {
      saveUserFeeback: contactUs1 => ({ subscribe: () => ({}) })
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ContactComponent],
      imports:[ FormsModule,
        ReactiveFormsModule,SharedModule,InputTextModule, ButtonModule, DialogModule, InputTextareaModule],
      providers: [
        { provide: AbstractControl, useValue: abstractControlStub },
        { provide: ContactService, useValue: contactServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('constants defaults to: constants', () => {
    expect(component.constants).toEqual(constants);
  });
  it('iconName defaults to: constants.ICON_CONTACTUS', () => {
    expect(component.iconName).toEqual(constants.ICON_CONTACTUS);
  });
  it('headerHtml defaults to: Contact Information', () => {
    expect(component.headerHtml).toEqual('Contact Information');
  });
  it('display defaults to: false', () => {
    expect(component.display).toEqual(false);
  });
  // describe('contactSubmit', () => {
  //   it('makes expected calls', () => {
  //     const contactServiceStub: ContactService = fixture.debugElement.injector.get(
  //       ContactService
  //     );
  //     spyOn(contactServiceStub, 'saveUserFeeback').and.callThrough();
  //     component.contactSubmit();
  //     expect(contactServiceStub.saveUserFeeback).toHaveBeenCalled();
  //   });
  // });
  // describe('storySubmit', () => {
  //   it('makes expected calls', () => {
  //     const contactServiceStub: ContactService = fixture.debugElement.injector.get(
  //       ContactService
  //     );
  //     spyOn(contactServiceStub, 'saveUserFeeback').and.stub();
  //     component.storySubmit();
  //     expect(contactServiceStub.saveUserFeeback).toHaveBeenCalled();
  //   });
  // });
});
