import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { EditContactsComponent } from '../../components/dialogs/edit-contacts/edit-contacts.component';
import { User } from 'src/app/core/models/user.model';
import { TokenService } from '../../../core/services/token/token.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Contact } from 'src/app/core/models/contact.model';
import { Token } from 'src/app/core/models/token.model';
import { Message } from '../../../core/models/message.model';

@Component({
  selector: 'app-contacts-screen',
  templateUrl: './contacts-screen.component.html',
  styleUrls: ['./contacts-screen.component.less']
})
export class ContactsScreenComponent implements OnInit {
  
  public user: User | null;
  public contacts: Contact[];
  public contact: Contact | null;
  public messages: Message[];
  private token: Token | null;

  constructor(
    private contactsDialog: MatDialog,
    private tokenService: TokenService,
    private userService: UserService
  ) {
    this.user = null;
    this.contacts = [];
    this.token = this.tokenService.getToken();
    this.contact = null;
    this.messages = [];
  }

  async ngOnInit(): Promise<void> {
    this.user = await this.getUser();
    this.contacts = await this.fetchMyContacts();
  }

  private async getUser(): Promise<User | null> {
    try {
      if (this.token) {
        const response: any = await this.userService.getUser(this.token?.authenticated).toPromise();
        if (response) return response.message;
        else return null;
      }
      else return null;
    } catch (error) {
      console.log('algo salió mal');
      return null;
    }
  }

  private async fetchMyContacts(): Promise<Contact[] | []> {
    try {
      if (this.token) {
        const response: any = await this.userService.getMyContacts(this.token?.authenticated).toPromise();
        if (response) return response.message.idContacts;
        else return [];
      }
      else return [];
    } catch (error) {
      console.log('algo salió mal');
      return [];
    }
  }

  public receive(event :any) {
    this.contact = event;
  }

  editContacts() {
    let dialogRef = this.contactsDialog.open(EditContactsComponent, {
      height: '510px',
      width: '1000px',
    });
  }

}
