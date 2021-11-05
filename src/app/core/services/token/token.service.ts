import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {

   }

  saveToken(token: string){
    sessionStorage.setItem('token', token);
  }
  
  getToken(): string |null {
    const token: string | null = sessionStorage.getItem('token');
    return token;
  }

  removeToken(){
    sessionStorage.removeItem('token');
  }
  
}