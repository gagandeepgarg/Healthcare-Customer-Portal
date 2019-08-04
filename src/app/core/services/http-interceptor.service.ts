import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingSpinnerService } from './loading-spinner.service';
import { LocalStoreService } from './local-storage.service';

export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable()
export class PortalHttpInterceptor implements HttpInterceptor {

    activeRequests = 0;

    // URLs for which the loading screen should not be enabled
    skippUrls = [
        '/authrefresh',
    ];

    constructor(private loadingSpinnerService: LoadingSpinnerService,
        private localStorageService: LocalStoreService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let displayLoadingScreen = true;
        let headers: any = null;

        for (const skippUrl of this.skippUrls) {
            if (new RegExp(skippUrl).test(request.url)) {
                displayLoadingScreen = false;
                break;
            }
        }

        if (displayLoadingScreen) {
            if (this.activeRequests === 0) {
                this.loadingSpinnerService.startLoading();
            }
            this.activeRequests++;

            if (request.headers.has(InterceptorSkipHeader)) {
                headers = request.headers.delete(InterceptorSkipHeader);
                request = request.clone({ headers });
            } else {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${this.getToken()}`
                    }
                });
            }

            return next.handle(request).pipe(
                finalize(() => {
                    this.activeRequests--;
                    if (this.activeRequests === 0) {
                        this.loadingSpinnerService.stopLoading();
                    }
                })
            );
        } else {
            return next.handle(request.clone({ headers }));
        }
    }

    private getToken() {
        const token = this.localStorageService.getData('accessToken');
        return token ? token : '';
    }
}
