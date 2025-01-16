import { Injectable } from "@angular/core";
import { ICredential, IUserCredential } from "../_interfaces/credentials";
import { Observable } from "rxjs";
import { IToken } from "../_interfaces/token";
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
  
    // url = "http://64.226.75.174:6868/api/auth";
    url = "http://localhost:3002/api/auth";
  
    constructor(private http: HttpClient) { }
  
    login(credentials:ICredential): Observable<any>{
      return this.http.post<any>(this.url+'/login', credentials)
    }
  
    signUp(formGroup:any): Observable<any>{
      return this.http.post<any>(this.url+'/signup', formGroup)
    }
  }