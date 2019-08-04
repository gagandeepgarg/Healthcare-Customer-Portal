import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { RoutesConstants } from '@app/core/constants/route-constants';
import { UtilService } from '@app/core/services/util.service';
import { CoreDataService } from '@app/core/services/core-data.service';
import * as constants from '@core/constants/app-constants';

@Component({
    selector: 'app-sidemenu',
    templateUrl: 'sidemenu.component.html',
    styleUrls: ['sidemenu.component.scss'],
    animations: [
        trigger('children', [
            state('hiddenAnimated', style({
                height: '0px'
            })),
            state('visibleAnimated', style({
                height: '*'
            })),
            state('visible', style({
                height: '*',
                'z-index': 100
            })),
            state('hidden', style({
                height: '0px',
                'z-index': '*'
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class SidemenuComponent implements OnInit {
    providerSubmenu = [
        { label: 'Medical Provider', icon: 'payment' }
    ];
    @Input() menuLabels: any = [
        { label: 'Home', icon: 'home' },
        {
            label: 'My Profile', icon: 'my-profile',
            submenu: [
                { label: 'Subscriber & Dependent Services', icon: 'payment' },
                { label: 'Service Information', icon: 'payment' },
                { label: 'Digital ID Card', icon: 'payment' },
                { label: 'Special Services', icon: 'payment' },
            ], showSubmenu: false
        },
        {
            label: 'My Plan Details', icon: 'plan-details'
        },
        { label: 'View Messages', icon: 'view-messages' },
        {
            label: 'Manage Share Requests', icon: 'manage-claims',
            submenu: [
                { label: 'View Requests', icon: 'rate_review' },
            ]
        },
        {
            label: 'Find Providers', icon: 'find-provider',
            submenu: this.providerSubmenu, showSubmenu: false
        }
    ];

    @Input() root: boolean;

    @Input() visible: boolean;

    _reset: boolean;

    _parentActive: boolean;

    activeIndex: number;
    constants = constants;
    constructor(public app: AppComponent,
        private router: Router,
        private coreDataService: CoreDataService,
        private utilService: UtilService) { }

    ngOnInit(): void {
        const userId = sessionStorage.getItem('userId');
        this.coreDataService.GetCoveredPlans(userId).subscribe((plans: any) => {
            if (plans && plans.IsDental) {
                this.providerSubmenu.push({ label: 'Dental Provider', icon: 'payment' });
            }
            if (plans && plans.IsVision) {
                this.providerSubmenu.push({ label: 'Vision Provider', icon: 'payment' });
            }
            if (plans && plans.IsDentalVision) {
                this.providerSubmenu.push({ label: 'Dental Provider', icon: 'payment' });
                this.providerSubmenu.push({ label: 'Vision Provider', icon: 'payment' });
            }
        });
        this.coreDataService.IsGroupMember(sessionStorage.getItem('userId')).subscribe((res: any) => {
            if (!res) {
                this.menuLabels.push(
                    {
                        label: 'Payment', icon: 'payment',
                        submenu: [
                            { label: 'View Receipts', icon: 'payment' },
                            { label: 'Change Payment Method', icon: 'payment' },
                        ], showSubmenu: false
                    });
            }
            this.menuLabels.push({ label: 'Documents & Forms', icon: 'document-forms' });
        });
    }
    menuClicked(menuName) {
        switch (menuName) {
            case 'Documents & Forms':
                const curentUrl: any = this.router.url;
                if (curentUrl.includes(RoutesConstants.DocumentForms)) {
                    this.utilService.setdocumentAndFormClick(true);
                    this.collapseOthers(menuName);
                    this.app.onMenuButtonClick(null);
                } else {
                    this.router.navigate(['/' + RoutesConstants.DocumentForms]);
                    this.collapseOthers(menuName);
                    this.app.onMenuButtonClick(null);
                }
                break;
            case 'Home':
                this.router.navigate(['/' + RoutesConstants.Dashboard]);
                this.collapseOthers(menuName);
                this.app.onMenuButtonClick(null);
                break;
            case 'My Plan Details':
                this.router.navigate(['/' + RoutesConstants.Plans]);
                this.collapseOthers(menuName);
                this.app.onMenuButtonClick(null);
                break;
            case 'View Messages':
                this.router.navigate(['/' + RoutesConstants.messages]);
                this.collapseOthers(menuName);
                this.app.onMenuButtonClick(null);
                break;
            case 'Manage Share Requests':
                this.collapseOthers(menuName);
                break;
            case 'Find Providers':
                this.collapseOthers(menuName);
                break;
            case 'Payment':
                this.collapseOthers(menuName);
                break;
            case 'My Profile':
                this.collapseOthers(menuName);
                break;
            default:
                break;
        }
    }

    subMenuClicked(subMenuName) {
        switch (subMenuName) {
            case 'Subscriber & Dependent Services': {
                this.router.navigate(['/' + RoutesConstants.Dependents_Coverage]);
                this.app.onMenuButtonClick(null);
                break;
            }
            case 'Service Information': {
                this.router.navigate(['/' + RoutesConstants.Dependents_Coverage]);
                this.app.onMenuButtonClick(null);
                break;
            }
            case 'View Requests': {
                this.router.navigate(['dashboard/' + RoutesConstants.ClaimsAll]);
                this.app.onMenuButtonClick(null);
                break;
            }
            case 'Special Services': {
                this.router.navigate(['/' + RoutesConstants.myProfile + '/' + RoutesConstants.SpecialServices]);
                this.app.onMenuButtonClick(null);
                break;
            }
            case 'Medical Provider': {
                this.app.FindProvider('Medical');
                break;
            }
            case 'Dental Provider': {
                this.app.FindProvider('Dental');
                break;
            }
            case 'Vision Provider': {
                this.app.FindProvider('Vision');
                break;
            }
            case 'Change Payment Method': {
                this.router.navigate(['/' + RoutesConstants.changePayment]);
                this.app.onMenuButtonClick(null);
                break;
            }
            case 'Digital ID Card': {
                this.router.navigate(['/' + RoutesConstants.myProfile + '/' + RoutesConstants.idCard]);
                this.app.onMenuButtonClick(null);
                break;
            }
            case 'View Receipts': {
                this.router.navigate(['/' + RoutesConstants.changePayment + '/' + RoutesConstants.Payment_Recipt]);
                this.app.onMenuButtonClick(null);
                break;
            }
            default:
                break;
        }
    }
    collapseOthers(label) {
        this.menuLabels.forEach(element => {
            if (element.label !== label) {
                element.showSubmenu = false;
            }
        });
    }
}
