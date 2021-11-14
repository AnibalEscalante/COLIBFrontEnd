import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { EditContactsComponent } from '../../components/dialogs/edit-contacts/edit-contacts.component';
import { User } from 'src/app/core/models/user.model';
import { TokenService } from '../../../core/services/token/token.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Contact } from 'src/app/core/models/contact.model';
import { Token } from 'src/app/core/models/token.model';
import { Message } from '../../../core/models/message.model';
import { MessageService } from '../../../core/services/message/message.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-contacts-screen',
  templateUrl: './contacts-screen.component.html',
  styleUrls: ['./contacts-screen.component.less']
})
export class ContactsScreenComponent implements OnInit {
  
  public contacts: Contact[];
  public contact: Contact | null;
  public messages: Message[];

  constructor(
    private contactsDialog: MatDialog,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.contacts = [];
    this.contact = null;
    this.messages = [];
  }

  async ngOnInit(): Promise<void> {
    this.contacts = await this.fetchMyContacts();
  }

  private async fetchMyContacts(): Promise<Contact[] | []> {
    try {
      const response: Contact[] | null = await this.messageService.fetchMyContacts(this.authService.getId());
      if (response) return response;
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
