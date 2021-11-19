import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Contact } from '../../models/contact.model';
import { UserService } from '../user/user.service';
import { Message } from '../../models/message.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  private socket = io("http://localhost:5200", {
    reconnectionDelayMax: 10000
  });

  private contacts: Contact[];

  constructor(
    private userService: UserService,
    private http: HttpClient
  ) {
    this.socket.emit('connection', 'client');
    this.contacts = [];
  }

  listen(idSocket: string) {
    this.socket.on(idSocket, (reciever: any) => {
      console.log(reciever);
    });
  }

  public async fetchMyContacts(id: string): Promise<Contact[] | null> {
    try {
      const response: any = await this.userService.getMyContacts(id).toPromise();
      if (response) this.contacts = response.message.idContacts;
      else this.contacts = [];
      return this.contacts;
    } catch (error) {
      console.log('algo salió mal');
      return null;
    }
  }

  public getContacts(): Contact[] {
    return this.contacts;
  }

  public sendMessage(content: string, idReceiver: string, idSender: string): Observable<Message> {
    return this.http.post<Message>(environment.baseUrl + '/message/', { content, idReceiver, idSender });
  }
}
