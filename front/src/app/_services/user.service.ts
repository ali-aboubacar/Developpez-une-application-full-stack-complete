import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IMessage } from "../_interfaces/article";
import { Observable } from "rxjs";
import { ThemeEnum } from "../_enums/themes.enum";
import { IUser } from "../_interfaces/user";

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

    getCurrentUser(): Observable<IUser>{
        return this.http.get<IUser>(`${this.url}/currentuser`)
    }

    edit(email: string, userName: string, profil: File, oldPassword: string, newPassword: string): Observable<IMessage>{
        const formData = new FormData();
        formData.append('email', email);
        formData.append('userName', userName);
        formData.append('profil', profil);
        formData.append('oldPassword',oldPassword);
        formData.append('newPassword',newPassword)
        return this.http.post<IMessage>(`${this.url}/edit`, formData)
    }
}