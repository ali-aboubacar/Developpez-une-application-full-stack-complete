import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ITheme, IThemes } from "../_interfaces/theme";

@Injectable({
    providedIn: 'root'
})
export class ThemeService{
    url = "http://localhost:3002/api";

    constructor(private http: HttpClient){}

    getAllTheme(): Observable<ITheme[]>{
    return this.http.get<ITheme[]>(`${this.url}/themes`)
    }
}