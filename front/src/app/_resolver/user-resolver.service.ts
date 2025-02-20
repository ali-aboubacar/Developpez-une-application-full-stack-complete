import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../_services/user.service";
import { Observable } from "rxjs";
import { IUser } from "../_interfaces/user";

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<IUser>{
    constructor(private userService: UserService){}
    
    resolve():Observable<IUser> {
        return this.userService.getCurrentUser();
    }
}