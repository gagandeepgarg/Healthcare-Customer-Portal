
import { BroadcastAppService } from './services/app-broadcast.service';
import { AuthRouteService } from './services/auth.service';
import { CoreDataService } from './services/core-data.service';
import { PortalHttpInterceptor } from './services/http-interceptor.service';
import { LocalStoreService } from './services/local-storage.service';
import { UtilService } from './services/util.service';
import { Utilities } from './services/utilities';
import { AuthGuardService } from './services/auth-guard.service';

// Core Services
export const SERVICES_DECLARATIONS: any = [
  BroadcastAppService,
  AuthRouteService, CoreDataService, PortalHttpInterceptor, LocalStoreService, UtilService, Utilities, AuthGuardService
];
