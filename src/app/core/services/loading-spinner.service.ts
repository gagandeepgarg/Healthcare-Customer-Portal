import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingSpinnerService {

    private _loading: any = false;

    loadingStatus: BehaviorSubject<any> = new BehaviorSubject(false);

    get loading(): boolean {
        return this._loading;
    }

    set loading(value) {
        this._loading = value;
        this.loadingStatus.next(value);
    }

    startLoading() {
        this.loading = true;
    }

    stopLoading() {
        this.loading = false;
    }
}
