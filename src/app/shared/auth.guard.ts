/**
 * Title: auth.guard.ts
 * Author: Professor Krasso
 * Date: 28 March 2021
 * Modified By: Juvenal Gonzalez
 * Description: routes authoirzed user to the home component upon activation
 */

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) {

  }

  //guard is used to route to authorized content
  canActivate( route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {

    const sessionUser = this.cookieService.get("session_user");

    if (sessionUser)
    {
      return true;
    }
    else
    {
      this.router.navigate(["/session/login"]);
      return false;
    }


  }

}
