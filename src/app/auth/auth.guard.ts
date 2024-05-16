import { Injectable, inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Router } from "@angular/router";
import { AuthState } from "./reducers";
import { isLoggedIn } from "./auth.selectors";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class PermissionsService {
  constructor(public router: Router, private store: Store<AuthState>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(isLoggedIn),
      tap((loggedIn) => {
        if (!loggedIn) {
          this.router.navigateByUrl("/login");
        }
      })
    );
  }
}

export const AuthGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).canActivate();
};
