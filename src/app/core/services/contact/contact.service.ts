import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }

  deleteContact(id: string, idUser: string): Observable<Contact> {
    return this.http.delete<Contact>(environment.baseUrl + '/contact/'+ id + '/' + idUser);
  }

  addContact(myId: string, idUser: string, nickName: string, profileImg: string): Observable<Contact> {
    return this.http.post<Contact>(environment.baseUrl + '/contact/', {
      myId,
      idUser,
      nickName,
      profileImg
    });
  }
}
