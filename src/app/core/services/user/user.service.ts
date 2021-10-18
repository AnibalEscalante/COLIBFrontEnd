import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getallUser(): Observable<User[]> {
    let users: User[] = [];
    const response = this.http.get<User[]>(environment.baseUrl + '/user/all').pipe(map((data: any) => data.message));
    response.subscribe(
      res => (users = res)
    );
    return response;
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(environment.baseUrl + '/user'+ id);
  }

  registNewUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(environment.baseUrl + '/user', user);
  }

  modifyUser(user: Partial<User>, id: string): Observable<User> {
    return this.http.patch<User>(environment.baseUrl + '/user'+ id, user);
  }
}
