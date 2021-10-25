import { Injectable } from '@angular/core';
/* import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js'; */

@Injectable({
  providedIn: 'root'
})
export class TokenService {
/*   private privateKey: string;
 */
  constructor() {
    /* this.privateKey = environment.privateKey; */
   }

  saveToken(token: string){
    sessionStorage.setItem('token', token);
  }
  
  getToken(): string |null {
    const token: string | null = sessionStorage.getItem('token');
    console.log(token);
    return null;
  }

  /* getToken(): string | null{
    const token = sessionStorage.getItem('token');
    console.log(token);
    
    return token
  } */

  removeToken(){
    sessionStorage.removeItem('token');
  }
  
}