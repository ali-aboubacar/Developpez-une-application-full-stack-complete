import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../_services/user.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<any>{
    constructor(private userService: UserService){}
    
    resolve():Observable<any> {
        return this.userService.getCurrentUser();
    }
}