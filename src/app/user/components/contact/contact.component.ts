import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../../../core/models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent implements OnInit {
  
  @Input()
  public contact!: Contact | null;

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

}
