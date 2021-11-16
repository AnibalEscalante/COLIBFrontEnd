import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { EditContactsComponent } from '../../components/dialogs/edit-contacts/edit-contacts.component';
import { Contact } from 'src/app/core/models/contact.model';
import { MessageService } from '../../../core/services/message/message.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MessageChat } from 'src/app/core/models/messageChat.model';
import { User } from '../../../core/models/user.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contacts-screen',
  templateUrl: './contacts-screen.component.html',
  styleUrls: ['./contacts-screen.component.less']
})
export class ContactsScreenComponent implements OnInit {
  
  public contacts: Contact[];
  public contact: Contact | null;
  public messages: MessageChat[];
  public user: User | null;
  public sendMessage: FormGroup;
  public term: string;
  public isShowInfo: boolean;
  public loadingContacts: boolean;
  public noContacts: boolean;

  constructor(
    private contactsDialog: MatDialog,
    private messageService: MessageService,
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.contacts = [];
    this.contact = null;
    this.messages = [];
    this.user = null;
    this.term = '';
    this.isShowInfo = false;
    this.loadingContacts = true;
    this.noContacts = false;

    this.sendMessage = this.formBuilder.group({
      content: ['', [Validators.required]]
    })
  }

  async ngOnInit(): Promise<void> {
    this.user = await this.fetchUser();
    this.contacts = await this.fetchMyContacts();
  }

  private async fetchMyContacts(): Promise<Contact[] | []> {
    try {
      const response: Contact[] | null = await this.messageService.fetchMyContacts(this.authService.getId());
      if (response) {
        this.loadingContacts = false;
        return response;
      }
      else {
        this.noContacts = true;
        return [];
      }
    } catch (error) {
      console.log('algo salió mal');
      return [];
    }
  }

  private async fetchUser(): Promise<User | null> {
    try {
      const response: any = await this.userService.getUser(this.authService.getId()).toPromise();
      if (response) return response.message;
      else return null;
    } catch (error) {
      console.log('algo salió mal');
      return null;
    }
  }
  
  public getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
  }

  public receive(event :any) {
    this.contact = event;
    if (this.contact?.idSentMessages && this.contact?.idRecievedMessages) {
      let sentMessages: MessageChat[] = [];
      for (let message of this.contact.idSentMessages) {
        let current: MessageChat = {
          nickName: this.contact.nickName,
          content: message.content
        }
        sentMessages.push(current);
      }

      let recievedMessages: MessageChat[] = [];
      for (let message of this.contact.idRecievedMessages) {
        let current: MessageChat = {
          nickName: this.user?.nickName!,
          content: message.content
        }
        recievedMessages.push(current);
      }
      
      this.messages = sentMessages.concat(recievedMessages);
      this.messages = this.messages.slice().sort((messageA, messageB) => {
        if (messageA.createdAt && messageB.createdAt)
          return this.getTime(messageA.createdAt) - this.getTime(messageB.createdAt);
        return 0;
      })
    }
  }

  get content() {return this.sendMessage?.get('content');}

  async onSubmit() {
    try {
      let message = this.content?.value;
      if (message && this.contact?.idUser && this.user?._id){
        let data = await this.messageService.sendMessage(message, this.contact?.idUser, this.user?._id).toPromise();
        console.log(data);
        
      }
    } catch (error) {
      this.toastr.error('Mensaje no enviado.');
    }
  }

  editContacts() {
    let dialogRef = this.contactsDialog.open(EditContactsComponent, {
      height: '510px',
      width: '1000px',
      data: {contacts: this.contacts}
    });
    dialogRef.afterClosed().subscribe(async result => {
      this.loadingContacts = true;
      this.noContacts = false;
      this.contacts = await this.fetchMyContacts();
    });
  }
}
