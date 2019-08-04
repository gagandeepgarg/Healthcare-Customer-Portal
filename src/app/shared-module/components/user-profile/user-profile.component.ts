import { Component, OnInit } from '@angular/core';
import { UtilService } from '@app/core/services/util.service';
import { SharedService } from '@app/shared-module/services/shared.service';
import { RoutesConstants } from '@app/core/constants/route-constants';
import { Router } from '@angular/router';
import * as constants from '@core/constants/app-constants';
import { UploadDocument } from '@app/shared-module/models/UploadDocument';
import { DependentStatuses } from '@app/core/enums/enum';
import { LocalStoreService } from '@app/core/services/local-storage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-user-profile',
    templateUrl: 'user-profile.component.html',
    styleUrls: ['user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
    userId: string;
    constants = constants;
    memberDashboardDetails: any;
    dependents: any = [];
    dependentCount = 0;
    editProfile: boolean;
    url: any;
    errorText: string;
    uploadDoc: UploadDocument[];
    scuccessTest: string;
    errorTextImg: string;
    base64 = '';
    constructor(private sharedService: SharedService,
        private router: Router,
        private utilService: UtilService,
        private localStorageService: LocalStoreService) { }
    ngOnInit() {
        this.userId = sessionStorage.getItem('userId');
        this.sharedService.getMemberDetailsForDashBoard(this.userId).subscribe((resp) => {
            if (resp) {
                this.memberDashboardDetails = resp;
                this.dependents = this.memberDashboardDetails.DepandentDetails;
                this.dependents = this.dependents.filter(d =>
                    d.Status === DependentStatuses.Active || d.Status === DependentStatuses.PendingInactivation);
                this.dependentCount = this.dependents.length;
                if (this.dependentCount > 3) {
                    this.dependents = this.dependents.splice(0, 3);
                }
                sessionStorage.setItem('lastLogin', this.memberDashboardDetails.LastLogin);
                sessionStorage.setItem('firstName', this.memberDashboardDetails.FirstName);
                this.utilService.settopNavFirstName(this.memberDashboardDetails.FirstName);
                this.utilService.settopNavLastLogin(this.memberDashboardDetails.LastLogin);
                /* if (this.memberDashboardDetails.avatarImageId) {
                    this.sharedService.getMemberProfilePicture(this.memberDashboardDetails.avatarImageId).subscribe((res) => {
                        if (res) {
                            this.localStorageService.saveSessionData(res, 'image_' + this.memberDashboardDetails.avatarImageId);
                            this.url = `data:image/jpeg;base64,` + res;
                        }
                    });
                }
                this.dependents.forEach(element => {
                    if (element.avatarImageId) {
                        this.sharedService.getMemberProfilePicture(element.avatarImageId).subscribe((res) => {
                            if (res) {
                                this.localStorageService.saveSessionData(res, 'image_' + element.avatarImageId);
                                element.url = `data:image/jpeg;base64,` + res;
                            }
                        });
                    }
                }); */
            }
        },
            (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                } else if (err.status === 500) {
                }
            });
        /* this.utilService.picUploadNotifier.subscribe((r) => {
            if (r) {
                this.sharedService.getMemberDetailsForDashBoard(this.userId).subscribe((resp) => {
                    if (resp) {
                        this.memberDashboardDetails = resp;
                        this.dependents = this.memberDashboardDetails.depandentDetails;
                        this.dependentCount = this.dependents.length;
                        this.dependents = this.dependents.splice(0, 3);
                        sessionStorage.setItem('lastLogin', this.memberDashboardDetails.lastLogin);
                        sessionStorage.setItem('firstName', this.memberDashboardDetails.firstName);
                        this.utilService.settopNavFirstName(this.memberDashboardDetails.firstName);
                        this.utilService.settopNavLastLogin(this.memberDashboardDetails.lastLogin);
                        if (this.memberDashboardDetails.avatarImageId) {
                            this.sharedService.getMemberProfilePicture(this.memberDashboardDetails.avatarImageId).subscribe((res) => {
                                if (res) {
                                    this.localStorageService.saveSessionData(res, 'image_' + this.memberDashboardDetails.avatarImageId);
                                    this.url = `data:image/jpeg;base64,` + res;
                                }
                            });
                        }
                        this.dependents.forEach(element => {
                            if (element.avatarImageId) {
                                this.sharedService.getMemberProfilePicture(element.avatarImageId).subscribe((res) => {
                                    if (res) {
                                        this.localStorageService.saveSessionData(res, 'image_' + element.avatarImageId);
                                        element.url = `data:image/jpeg;base64,` + res;
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }); */
    }
    redirectToDependent() {
        this.router.navigate(['/' + RoutesConstants.Dependents_Coverage]);
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
                this.uploadTOServer(event.target.files[0].name, this.base64);
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
        //     if (res) {
        //         this.scuccessTest = constants.IMAGE_SUCCESS;
        //         setTimeout((e) => { this.scuccessTest = ''; }, 5000);
        //         const upateAvatharToPM = {
        //             documentType: 'avatarimage',
        //             documentId: res[0].documentId,
        //             identifier: this.userId,
        //             memberType: 'self'
        //         };
        //         this.sharedService.uploadUserPictureForMP(upateAvatharToPM).subscribe((res1) => {
        //             if (res1) {
        //                 this.localStorageService.saveSessionData(this.base64, 'image_' + upateAvatharToPM.documentId);
        //                 this.utilService.picUploadNotifier.next(true);
        //             }
        //         });
        //     }
        // });
    }
}
