import { Injectable } from "@angular/core";
import  {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import { observable, Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Injectable()/**puisque on peut injecter un service dans un service */
export class AuthGuard implements CanActivate{

constructor(private authService : AuthService
    ,private router:Router){}

    canActivate( route :ActivatedRouteSnapshot,
        state:RouterStateSnapshot
        ): Observable<boolean> |Promise<boolean>|boolean{
            if(this.authService.isAuth){
                return true;
            }else {
                return this.router.navigate(['/auth']);
            }
        }
}