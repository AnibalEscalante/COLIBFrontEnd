import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { EditContactsComponent } from '../../components/dialogs/edit-contacts/edit-contacts.component';

@Component({
  selector: 'app-contacts-screen',
  templateUrl: './contacts-screen.component.html',
  styleUrls: ['./contacts-screen.component.less']
})
export class ContactsScreenComponent implements OnInit {

  constructor(
    private contactsDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  editContacts() {
    const editContactsDialog = this.contactsDialog.open(EditContactsComponent);
  }

}
