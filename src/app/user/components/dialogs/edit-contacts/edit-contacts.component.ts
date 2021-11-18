import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Contact } from 'src/app/core/models/contact.model';
import { User } from 'src/app/core/models/user.model';
import { UserService } from '../../../../core/services/user/user.service';

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

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: {contacts: Contact[]}
  ) {
    this.contacts = this.data.contacts;
    this.users = [];
    this.contactsFilter = '';
    this.usersFilter = '';
    this.loadingUsers = true;
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

  public myContact(user: User): boolean{
    for (let contact of this.contacts) {
      if (contact.idUser === user._id) return true;
    }
    return false;
  }

  saveNotification() {
    this.toastr.success('Los cambios se guardaron exitosamente.');
  }

  cancelNotification() {
    this.toastr.warning('Los cambios no se guardaron.');
  }
}
