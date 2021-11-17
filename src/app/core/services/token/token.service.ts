import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import jwt_decode from 'jwt-decode';
import { Token } from '../../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private privateKey: string;

  constructor() {
    this.privateKey = environment.privateKey;
  }

  addToken(token: string): void {
    const encyptedToken = this.encrypt(token);
    sessionStorage.setItem('credentials', encyptedToken);
  }

  getToken(): Token | null {
    const token: string | null = sessionStorage.getItem('credentials');
    if (token) {
      let tokenAuth = this.decrypt(token);
      return jwt_decode(tokenAuth);
    }
    return null;
  }

  removeToken(){
    sessionStorage.removeItem('credentials');    
  }

  encrypt(token: string): string{
    const key = CryptoJS.enc.Utf8.parse(this.privateKey);
    const iv = CryptoJS.enc.Utf8.parse(this.privateKey);
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(token.toString()), key,
    {
        keySize: 128 / 8,
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  decrypt(token: string): string {
    const key = CryptoJS.enc.Utf8.parse(this.privateKey);
    const iv = CryptoJS.enc.Utf8.parse(this.privateKey);
    const decrypted = CryptoJS.AES.decrypt(token, key, {
        keySize: 128 / 8,
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
  
