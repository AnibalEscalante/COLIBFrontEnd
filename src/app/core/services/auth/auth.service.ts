import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Auth } from '../../models/auth.model';
import { Discipline } from '../../models/discipline.model';
import { Skill } from '../../models/skill.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  
  private tokenDecoder = new JwtHelperService();

  constructor( 
    private tokenService: TokenService,
    private httpClient: HttpClient,
    private router: Router

    ) {

   
   
  }


  login(email: string, password: string): Observable<any>{

    return this.httpClient.post( this.baseUrl + '/auth/login',
    {
      email,
      password
    }).pipe(
      tap(
        (data: any) => {
            this.tokenService.saveToken(data.message);
            this.router.navigate(['/user/home']);
        }
      )
    )
  }

  register(
      nickName: string,
      name: string,
      lastName: string,
      email: string,
      movilPhone: string,
      password: string,
      idDisciplines: Discipline[],
      idSkills: Skill[]
    ): Observable<any> {
      return this.httpClient.post( this.baseUrl + '/auth/user/signIn',
    {
      nickName,
      name,
      lastName,
      email,
      movilPhone,
      password,
      idDisciplines,
      idSkills
    })
  }

  logout(){
    this.tokenService.removeToken();
    this.router.navigate(['/visitor/landing']);
  }

  isLogged(): boolean{
    const token = this.tokenService.getToken();
    return (token !== null)? true : false;
  }


  getToken(){
    return this.tokenService.getToken()!;
  }

  getId(): string | null{
    const token = this.tokenDecoder.decodeToken(this.getToken());
    return token.authenticated;
    
  }
  
}
