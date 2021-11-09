import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { EditContactsComponent } from '../../components/dialogs/edit-contacts/edit-contacts.component';
import { User } from 'src/app/core/models/user.model';
import { TokenService } from '../../../core/services/token/token.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Contact } from 'src/app/core/models/contact.model';
import { Token } from 'src/app/core/models/token.model';

@Component({
  selector: 'app-contacts-screen',
  templateUrl: './contacts-screen.component.html',
  styleUrls: ['./contacts-screen.component.less']
})
export class ContactsScreenComponent implements OnInit {
  
  public user: User | null;
  public contacts: Contact[];
  private token: Token | null;

  constructor(
    private contactsDialog: MatDialog,
    private tokenService: TokenService,
    private userService: UserService
  ) {
    this.user = null;
    this.contacts = [];
    this.token = this.tokenService.getToken();
  }

  async ngOnInit(): Promise<void> {
    this.user = await this.getUser();
    this.contacts = await this.fetchMyContacts();
    console.log(this.contacts);
    
  }

  async getUser(): Promise<User | null> {
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

  async fetchMyContacts(): Promise<Contact[] | []> {
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
  showContacts() {
    console.log(this.user);
    console.log(this.contacts);
  }

  editContacts() {
    let dialogRef = this.contactsDialog.open(EditContactsComponent, {
      height: '510px',
      width: '1000px',
    });
  }

}
