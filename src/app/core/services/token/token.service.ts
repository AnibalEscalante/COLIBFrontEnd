import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string){
    
    sessionStorage.setItem('token', token);
  }
  
  getToken(): string | null{
    return sessionStorage.getItem('token');
  }

  removeToken(){
    sessionStorage.removeItem('token');
  }

}