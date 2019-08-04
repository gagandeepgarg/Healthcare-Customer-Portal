import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { DependentsCoverageService } from '../../services/dependents-coverage.service';
import { SelectItem } from 'primeng/api';
import { RegexConstants } from '@app/core/constants/regex-constants';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-subscriber-information',
  templateUrl: './subscriber-information.component.html',
  styleUrls: ['./subscriber-information.component.scss']
})
export class SubscriberInformationComponent implements OnInit, OnChanges {

  @Output() callServiceEvent = new EventEmitter<any>();
  @Input() memberInfo: any;
  editSubscriber: boolean;
  stateName: string;

  paidThroughDate: any;
  address1: string;
  address2: string;
  zipCode: number;
  selectedStateProvince: any;
  stateProvince: string;
  city: string;
  phone: number;
  email: string;


  errorText = '';
  states: SelectItem[] = [];
  isSubmitted: boolean;

  constructor(private dependentService: DependentsCoverageService) { }

  ngOnInit() {
    this.dependentService.getStates().subscribe(res => {
      const usStates: any = res;
      if (usStates && usStates.length > 0) {

        this.states = usStates.map(function (elm) {
          return {
            value: { StateCode: elm['StateCode'], TimeZone: elm['TimeZone'] },
            label: elm['StateName']
          };
        });
      }
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
      } else if (err.status === 500) {
      }
  });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.memberInfo && changes['memberInfo'].previousValue !== changes['memberInfo'].currentValue && this.states.length > 0) {
      this.stateName = this.states.find(s =>
        s.value.StateCode.trim().toLowerCase() === this.memberInfo.StateProvince.trim().toLowerCase()).label;
    }
  }



  editSubscriberInfo() {
    this.editSubscriber = true;
  }

  onClose(event) {
    if (event.MemberAddress && event.MemberAddress.length > 0) {
      this.callServiceEvent.emit();
    } else {
      this.stateName = this.states.find(s =>
        s.value.StateCode.trim().toLowerCase() === this.memberInfo.StateProvince.trim().toLowerCase()).label;
    }
    this.editSubscriber = false;
  }
  validateNumber(event: any) {
    if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)
      && (event.keyCode !== 8) && (event.keyCode !== 46) && (event.keyCode !== 39) && (event.keyCode !== 37)
      && (event.keyCode !== 9)) {
      event.preventDefault();
    }
  }


  validateEmail(email: string): boolean {
    const re = RegexConstants.EmailId;
    let valid = true;
    valid = re.test(String(email).toLowerCase());
    if (!valid) {
      return false;
    }
    return true;
  }

  validateZip(zipCode: number): boolean {
    const re = RegexConstants.Zipcode;
    let valid = true;
    if (!(zipCode.toString().length > 9)) {
      valid = re.test(String(zipCode).toLowerCase());
      if (!valid) {
        return false;
      } else {
        return true;
      }
    }
  }

  LimitZipCode(event: any) {
    event.target.value = event.target.value;
    if (event.target.value.toString().length > 9) {
      event.target.value = parseInt(
        event.target.value.toString().substring(0, 9),
        10
      );
    }
  }

}
