import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;

  constructor( 

    private httpClient: HttpClient
    
    ) { 
   
  }

  login(email: string, password: string): Observable<any>{

    return this.httpClient.post( this.baseUrl + '/auth/login',
    {
      email,
      password
    })
  }

  register(
      name: string,
      lastnameP: string,
      lastnameM: string,
      email: string,
      phone: Number,
      password: string,
      entity: string,
    ): Observable<any> {
      return this.httpClient.post( this.baseUrl + '/auth/register',
    {
      name,
      lastnameP,
      lastnameM,
      email,
      phone,
      password,
      entity
    })
  }



}
