import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as constants from '@core/constants/app-constants';
import { SharedService } from '@app/shared-module/services/shared.service';
import { UploadDocument } from '@app/shared-module/models/UploadDocument';
import { UtilService } from '@app/core/services/util.service';
import { LocalStoreService } from '@app/core/services/local-storage.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  @Input() display: boolean;

  errorText = '';
  constants = constants;
  uploadImageForm: any;
  url: any;
  scuccessTest: string;
  errorTextImg: string;
  fileNme: any;
  base64: any;
  uploadDoc: UploadDocument[];

  @Input() dependent: any;
  @Output() closePopUpEvent = new EventEmitter<any>();

  constructor(private sharedService: SharedService, private utilService: UtilService,
    private localStorageService: LocalStoreService) { }

  ngOnInit() {
    this.url = this.dependent.url;
  }

  processFile(event) {
    this.errorTextImg = '';
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.errorTextImg = constants.INVALID_FORMAT;
      return;
    }

    if (event.target.files[0].size > 2000000) {
      this.errorTextImg = constants.BIGGER_IMAGE;
      return;
    }
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        this.url = reader.result;
        this.base64 = this.url.replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '');
        this.fileNme = event.target.files[0].name;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  uploadTOServer(filename, base64) {
    this.uploadDoc = [{
      fileContent: base64,
      fileName: filename,
      documentId: 0,
      fileType: 'Image',
      description: 'Image',
      notes: 'Image',
      documentTypeId: 0,
      documentStatusId: 0,
      ownerTypeId: 2,
      ownerId: 2,
      createdBy: 2,
      createdOn: new Date(),
      isSecuredDocument: true,
      documentCreatedDate: new Date(),
      documentId123: '',
      url123: '',
      isUploadedS3123: true

    }];
    // this.sharedService.uploadUserPictureForDMS(this.uploadDoc).subscribe((res) => {
    //   if (res) {
    //     this.scuccessTest = constants.IMAGE_SUCCESS;
    //     setTimeout((e) => { this.scuccessTest = ''; }, 2000);
    //     const upateAvatharToPM = {
    //       documentType: 'avatarimage',
    //       documentId: res[0].documentId,
    //       identifier: this.dependent.dependentDetailId,
    //       memberType: 'dependent'
    //     };
    //     this.sharedService.uploadUserPictureForMP(upateAvatharToPM).subscribe((resinner: any) => {
    //       if (resinner) {
    //         this.localStorageService.saveSessionData(this.base64, 'image_' + upateAvatharToPM.documentId);
    //         this.display = false;
    //         this.closePopUpEvent.emit(resinner);
    //         this.utilService.picUploadNotifier.next(true);
    //       }
    //     });
    //   }
    // });
  }

  onSubmit() {
    this.uploadTOServer(this.fileNme, this.base64);
  }

  onCancel() {
    this.closePopUpEvent.emit(false);
  }
}
