import { Component, OnInit } from '@angular/core';
import * as constants from '@core/constants/app-constants';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { ContactUs } from '../../modals/contactUs';
import { ContactService } from '../../services/contact.service';
import { RegexConstants } from '@app/core/constants/regex-constants';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  constants = constants;
  errorText = '';
  storyErrorText = '';
  storySuccessText: string;
  isContactSubmitted: boolean;
  contactSuccessText = '';
  userId: string;
  isStorySubmitted: boolean;
  iconName = constants.ICON_CONTACTUS;
  headerHtml = 'Contact Information';
  constructor(private contactService: ContactService) { }
  contactForm: FormGroup;
  storyForm: FormGroup;
  display = false;
  ngOnInit() {
    this.userId = sessionStorage.getItem('userId');

    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required, this.validateSpaces]),
      email: new FormControl('', [Validators.required, this.validateEmail, this.validateSpaces]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}'), this.validateSpaces]),
      message: new FormControl('', [Validators.required, this.validateSpaces]),
    });
    this.storyForm = new FormGroup({
      name: new FormControl('', [Validators.required, this.validateSpaces]),
      email: new FormControl('', [Validators.required, this.validateEmail, this.validateSpaces]),
      story: new FormControl('', [Validators.required, this.validateSpaces]),
    });
  }
  contactSubmit() {
    this.isContactSubmitted = true;
    const missingRequiredFields: any = [];
    Object.keys(this.contactForm.controls).forEach(key => {
      if (this.contactForm.get(key).errors && (this.contactForm.get(key).errors.required || this.contactForm.get(key).errors.Blank_Field)) {
        missingRequiredFields.push(key);
        return;
      }
    });
    if (missingRequiredFields.length > 0) {
      this.errorText = constants.MANDATORY_FIELDS;
      return;
    } else if (this.contactForm.controls['email'].errors && this.contactForm.controls['email'].errors.Invalid_Email) {
      this.errorText = constants.INVALID_EMAILID;
      return;
    } else if (this.contactForm.controls['phoneNumber'].errors) {
      this.errorText = constants.INVALID_PHONE;
      return;
    }
    this.errorText = '';
    if (this.contactForm.valid) {
      const contactUs: ContactUs = {
        userId: this.userId,
        email: this.contactForm.get('email').value,
        name: this.contactForm.get('name').value,
        phoneNumber: this.contactForm.get('phoneNumber').value,
        message: this.contactForm.get('message').value,
        sourceId: 2
      };
      this.contactService.saveUserFeeback(contactUs).subscribe((res) => {
        if (res) {
          this.isContactSubmitted = false;
          this.contactSuccessText = constants.THANK_YOU_CONTACT;
          this.contactForm.patchValue({ name: '' });
          this.contactForm.patchValue({ phoneNumber: '' });
          this.contactForm.patchValue({ email: '' });
          this.contactForm.patchValue({ message: '' });
          const that = this;
          setTimeout(function () {
            that.contactSuccessText = '';
          }, 10000);
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
    });
    }
  }
  validateSpaces(control: AbstractControl) {
    if (!control.value.trim()) {
      return { Blank_Field: true };
    }
    return null;
  }
  openFbLink() {
    window.open(constants.fbLink, '_blank');
  }
  openLinkdinLink() {
    window.open(constants.linkdenLink, '_blank');
  }
  validateNumber(event: any): number {
    event.target.value = event.target.value.trim();
    if (isNaN(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, '');
      return event.target.value;
    }
  }

  storySubmit() {
    this.isStorySubmitted = true;
    const missingRequiredFields: any = [];
    Object.keys(this.storyForm.controls).forEach(key => {
      if (this.storyForm.get(key).errors && (this.storyForm.get(key).errors.required || this.storyForm.get(key).errors.Blank_Field)) {
        missingRequiredFields.push(key);
        return;
      }
    });
    if (missingRequiredFields.length > 0) {
      this.storyErrorText = constants.MANDATORY_FIELDS;
      return;
    } else if (this.storyForm.controls['email'].errors && this.storyForm.controls['email'].errors.Invalid_Email) {
      this.storyErrorText = constants.INVALID_EMAILID;
      return;
    }
    this.storyErrorText = '';
    if (this.storyForm.valid) {
      const story: ContactUs = {
        userId: this.userId,
        email: this.storyForm.get('email').value,
        name: this.storyForm.get('name').value,
        message: this.storyForm.get('story').value,
        sourceId: 1
      };
      this.contactService.saveUserFeeback(story).subscribe((res) => {
        if (res) {
          if (res) {
            this.display = false;
            this.isStorySubmitted = false;
            this.storySuccessText = constants.THANK_YOU;
            this.storyForm.patchValue({ name: '' });
            this.storyForm.patchValue({ story: '' });
            this.storyForm.patchValue({ email: '' });
            const that = this;
            setTimeout(function () {
              that.storySuccessText = '';
            }, 10000);
          }
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
    });
    }

  }
  validateEmail(control: AbstractControl) {
    const re = RegexConstants.EmailId;
    let valid = true;
    valid = re.test(String(control.value).toLowerCase());
    if (!valid) {
      return { Invalid_Email: true };
    }
    return null;
  }
  showStoryPopUP() {
    this.display = true;
  }
  closeStoryPopUP() {
    this.storyErrorText = '';
    this.storyForm.patchValue({ name: '' });
    this.storyForm.patchValue({ story: '' });
    this.storyForm.patchValue({ email: '' });
    this.display = false;
  }
}
