import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

/** class AuthGuard is used for route protection. Use is app-routing.module.ts. */
/** In order to inject others services, annotation @Injectable() is needed.  */
@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  /** Return whether the route can be activated.
   *  This method is used in the route that need to be authenticated to load.
   *  @param route: ActivatedRouteSnapshot - the route we are trying to activate.
   *  @param state: RouterStateSnapshot - the current activate state.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuth()) {
      return true;
    } else {
      /** If the user is not logged in, navigate to log in page. */
      this.router.navigate(['/login']);
    }
  }

  /** Return whether the route can be loaded. Used in lazy loading.
   *  This method is used in the route that need to be authenticated to load.
   *  @param route: Route - the route we are trying to load.
   */
  canLoad(route: Route) {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
