import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})

export class authGuard {

    constructor (
        private authService: AuthenticationService,
        private router: Router,
    ) {}

    canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        |boolean
        |UrlTree {
            if (this.authService.isLoggedIn() !== true) {
                window.alert("Not Authorized");
                this.router.navigateByUrl('');
            }
            return true;
        }
}