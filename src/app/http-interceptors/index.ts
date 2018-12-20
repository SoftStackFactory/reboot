import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './authInterceptor';
import { DemoInterceptor } from './demoInterceptor';
import { OfflineInterceptor } from './offlineInterceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: DemoInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: OfflineInterceptor, multi: true },
]