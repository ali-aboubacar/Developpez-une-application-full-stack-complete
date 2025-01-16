import { Injectable } from "@angular/core";
import { RoleEnum } from "../_enums/roles.enum";

@Injectable({
    providedIn: 'root'
  })
  export class TokenService {
    constructor() { 
    }
    
    saveToken(token: string) {
      localStorage.setItem('token',token);
    }
  
    saveRole(role: RoleEnum){
      localStorage.setItem('userRole',role)
    }
  
    saveUserId(userId: string){
      localStorage.setItem('userId',userId)
    }
  
    isLogged():boolean {
      const isLoggedIn = localStorage.getItem('isLoggedIn')
      return !! isLoggedIn
    }
  
    clearToken():void {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
      localStorage.removeItem('isLoggedIn');
    }
  
    getToken(): string|null{
      return localStorage.getItem('token')
    }
    
    getRole(): string|null{
      return localStorage.getItem('userRole')
    }
  
    getUserId(): number{
      return JSON.parse(localStorage.getItem('userId') || '')
    }
  }