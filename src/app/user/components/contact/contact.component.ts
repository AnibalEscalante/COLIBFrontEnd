import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../../../core/models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent implements OnInit {
  
  @Input()
  public contact!: Contact | null;

  @Output()
  public chatContact = new EventEmitter<Contact>();

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  public sendChat() {
    this.chatContact.emit(this.contact!);
  }

}
