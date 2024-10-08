import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot } from "@angular/router";
import { QW } from "./qw.helper";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private router:Router){
        
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        if(localStorage.getItem('jwt_token')==null){
            this.router.navigateByUrl("/login")
            return false;
        }
        return true;
    }
}