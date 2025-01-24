import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ThemeService{
    url = "http://localhost:3002/api";

    constructor(private http: HttpClient){}

    getAllTheme():Observable<any>{
    return this.http.get<any>(`${this.url}/themes`)
    }
}