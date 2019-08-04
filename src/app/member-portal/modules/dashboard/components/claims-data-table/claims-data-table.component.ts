import { Component,  Input} from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-claims-data-table',
    templateUrl: 'claims-data-table.component.html',
    styleUrls: ['claims-data-table.component.scss']
})
export class ClaimsDataTableComponent  {

    @Input() items: any[];
    @Input() columns: any[];
    @Input() rows: number;
    selectedRow: any = null;
    cols: any[];
    eobIdentifier = 0;
    constructor(private dashboardService: DashboardService,
        private confirmationService: ConfirmationService) { }

    OpenEOB() {
        if (this.eobIdentifier !== 0) {
          this.dashboardService.downloadEOBpdf(this.eobIdentifier).subscribe((fileData: any) => {
              if (fileData) {
                  const fileURL = URL.createObjectURL(
                    new Blob([fileData], { type: 'application/pdf' }));
                    window.open(fileURL, '_blank');
              }
          });
        }
      }
      downloadEOB(eobIdentifier) {
        this.confirmationService.confirm({
          message: 'You will be directed to new browser window for EOB document',
          header: 'Confirmation',
          key: 'eobConfirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.eobIdentifier = eobIdentifier;
            this.OpenEOB();
          },
          reject: () => {
            this.eobIdentifier = 0;
          }
        });
      }
}
