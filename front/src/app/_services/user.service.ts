import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IMessage } from "../_interfaces/article";
import { Observable } from "rxjs";
import { ThemeEnum } from "../_enums/themes.enum";

@Injectable({
    providedIn: 'root'
})
export class UserService{
    url = "http://localhost:3002/api";

    constructor(private http: HttpClient){}
    subscribe(themeId: number):Observable<IMessage>{
        return this.http.post<IMessage>(`${this.url}/subscribe/${themeId}`,{})
    }
    unSubscribe(themeId: number):Observable<IMessage>{
        return this.http.delete<IMessage>(`${this.url}/unsubscribe/${themeId}`)
    }
}