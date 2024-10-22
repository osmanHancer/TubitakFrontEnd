import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot } from "@angular/router";
import { QW } from "./qw.helper";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {

    }
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        if (localStorage.getItem('jwt_token') != null) {
            let user = await QW.json("/auth/verify-token")
            console.log(user);
            if (user.valid == true)
                return true;
            else {
                this.router.navigateByUrl("/login")
                return false;

            }
        }
        else {
            this.router.navigateByUrl("/login")
            return false;
        }
    }
}