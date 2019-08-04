import { Injectable } from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { AuthRouteService } from './auth.service';
import { RoutesConstants } from '@core/constants/route-constants';
import { interval } from 'rxjs';
import { LocalStoreService } from './local-storage.service';
@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
    constructor(private authService: AuthRouteService , private router: Router,
        private localStorageService: LocalStoreService) {
    }

    canLoad(route: Route) {
        const isLoggedIn = this.authService.isUserLoggedIn();
        if (isLoggedIn) {
            return true;
        }
        const url = `/${route.path}`;
        this.router.navigate(['/' + RoutesConstants.Login], { queryParams: { redirectTo: url } });
        return isLoggedIn;
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if (this.authService.isUserLoggedIn()) {
            // this.updateToken();
            return true;
        }
        if (state.url !== '/' + RoutesConstants.Login) {
            this.router.navigate(['/' + RoutesConstants.Login]);
        }
        return false;
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        return this.canActivate(route, state);
    }
    updateToken() {
        const source = interval(900000);
        source.subscribe(val => this.getUpdatedToken());
    }

    getUpdatedToken() {
        this.authService.updateToken()
            .subscribe((res: any) => {
                if (undefined === res && null === res) {
                    return;
                }
                this.localStorageService.saveSessionData('accessToken', res[0].value);
                this.localStorageService.saveSessionData('refreshToken', res[1].value);
            },
                error => { }
            );
    }
}
