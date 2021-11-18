import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Discipline } from '../../models/discipline.model';
import { Skill } from '../../models/skill.model';
import { MessageService } from '../message/message.service';
import { RoutesService } from '../routes/routes.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;

  constructor( 
    private tokenService: TokenService,
    private messageService: MessageService,
    private httpClient: HttpClient,
    private router: Router,
    private routes: RoutesService
  ) { }
  
  login(email: string, password: string): Observable<any>{

    return this.httpClient.post( this.baseUrl + '/auth/login',
    {
      email,
      password
    }).pipe(
      tap(
        (data: any) => {
          this.tokenService.addToken(data.message);
          this.messageService.listen(this.getId());
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
      profileImg: string,
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
      profileImg,
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

  redirect() {
    this.routes.redirect(this.entity());
  }

  getToken(){
    return this.tokenService.getToken()!;
  }

  entity(): string | null{
    const token = this.getToken();
    return token.entity;
  }

  getId(): string{
    const token = this.getToken();
    return token.authenticated;
  }
}
