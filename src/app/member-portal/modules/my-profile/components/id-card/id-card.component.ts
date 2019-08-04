import { Component, OnInit } from '@angular/core';
import { MyProfileService } from '../../services/my-profile.service';
import * as FileSaver from 'file-saver';
import { SharedService } from '../../../../../shared-module/services/shared.service';
import * as constants from '@core/constants/app-constants';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-id-card',
  templateUrl: './id-card.component.html',
  styleUrls: ['./id-card.component.scss']
})
export class IdCardComponent implements OnInit {

  constructor(private myProfileService: MyProfileService, private sharedService: SharedService,
    private domSanitizer: DomSanitizer) { }
  iconName = constants.ICON_IDCARD;
  constants = constants;
  headerHtml = 'Digital ID Card';
  cardsData = [];
  display = false;
  digitalCardId: any = 0;
  idCardURL: any;
  url: any;
  physicalIdRequestFlag = false;
  cols = [
    { field: '', header: '', width: '8%' },
    { field: 'firstName', header: 'First Name', width: '17%' },
    { field: 'lastName', header: 'Last Name', width: '17%' },
    { field: 'memberType', header: 'Member Type', width: '21%' },
    { field: 'ViewId', header: 'View / Download', width: '23%' },
    { field: '', header: '', width: '14%' },
  ];
  ngOnInit() {
    this.myProfileService.
      GetDemographicsInformation(sessionStorage.getItem('userId')).subscribe((res: any) => {
        if (res) {
          const details = res;
          this.cardsData = details['CoverageInformation'];
          this.cardsData = this.cardsData.filter(cd => cd.DependentStatus.toLowerCase().trim() === 'active' || cd.DependentStatus.toLowerCase().trim()  === 'pendinginactivation');
          /* this.cardsData.forEach(element => {
            if (element.avatarImageId) {
              this.sharedService.getMemberProfilePicture(element.avatarImageId).subscribe((res1: any) => {
                if (res1) {
                  element.url = `data:image/jpeg;base64,` + res1;
                }
              });
            }
          }); */
        }
      });
  }
  getImageURL(imageId) {
    this.sharedService.getMemberProfilePicture('59219').subscribe((res) => {
      if (res) {
        const url = `data:image/jpeg;base64,` + res;
        return url;
      }
    });
  }
  ViewIDCard(digitalCardId) {
    this.digitalCardId = digitalCardId ? +digitalCardId : 0;
    this.myProfileService.DownloadIdCard(digitalCardId).subscribe(file => {
      const idCardFile = new Blob([file], { type: 'application/pdf' });
      this.idCardURL = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(idCardFile));
      this.display = true;
    });
    this.display = true;
  }
  cancel() {
    this.display = false;
    this.digitalCardId = 0;
    this.idCardURL = null;
  }
  DownloadIDCard() {
    this.display = false;
    this.myProfileService.DownloadIdCard(this.digitalCardId).subscribe(file => {
      FileSaver.saveAs(file, 'Digital Id Card' + '.pdf');
      this.digitalCardId = 0;
    });
  }
  RequestPhysicalIDCard(detailId) {
    this.physicalIdRequestFlag = true;
    setTimeout(() => {
      this.physicalIdRequestFlag = false;
    }, 5000);
  }
  cancelRequest() {
    this.physicalIdRequestFlag = false;
  }
}
