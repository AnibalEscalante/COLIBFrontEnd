import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from 'src/app/core/models/contact.model';
import { User } from 'src/app/core/models/user.model';
import { UserService } from '../../../../core/services/user/user.service';
import { ContactService } from '../../../../core/services/contact/contact.service';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-edit-contacts',
  templateUrl: './edit-contacts.component.html',
  styleUrls: ['./edit-contacts.component.less']
})
export class EditContactsComponent implements OnInit {
  
  public contacts: Contact[];
  public users: User[];
  public contactsFilter: string;
  public usersFilter: string;
  public loadingUsers: boolean;
  public myId: string | null;

  constructor(
    private userService: UserService,
    private contactService: ContactService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: {contacts: Contact[]}
  ) {
    this.contacts = this.data.contacts;
    this.users = [];
    this.contactsFilter = '';
    this.usersFilter = '';
    this.loadingUsers = true;
    this.myId = this.authService.getId();
  }

  async ngOnInit(): Promise<void> {
    this.users = await this.fetchUsers();
  }

  private async fetchUsers(): Promise<User[] | []> {
    try {
      let response: any = await this.userService.getallUser().toPromise();
      if (response) {
        this.loadingUsers = false;
        return response;
      } 
      else return [];
    } catch (error) {
      console.log('Algo salió mal');
      return [];
    }
  }

  public async deleteMyContact(contact: Contact) {
    try {
      if (this.myId) 
      await this.contactService.deleteContact(contact._id!, this.myId).toPromise();
    } catch (error) {
      console.log('Algo salió mal');
    }
  }

  public async addContact(user: User) {
    try {      
      if (this.myId) {
        let contact: Partial<Contact> = {
          nickName: user.nickName,
          profileImg: user.profileImg,
          idUser: user._id
        }
        await this.contactService.addContact(this.myId, contact.idUser!, contact.nickName!, contact.profileImg!).toPromise();
      }
    } catch (error) {
      console.log('Algo salió mal');
    }
  }

  public myContact(user: User): boolean{
    for (let contact of this.contacts) {
      if (contact.idUser === user._id) return true;
    }
    return false;
  }
}
