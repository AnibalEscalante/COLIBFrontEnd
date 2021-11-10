import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../../../core/models/contact.model';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less']
})
export class MessageComponent implements OnInit {

  @Input()
  public contact!: Contact | null;
  private socket = io("http://localhost:5200", {
    reconnectionDelayMax: 10000,
    query: {
      "hola": "message"
  }});

  constructor() { }

  ngOnInit(): void {
    this.socket.on("hola", (message) => {
      console.log(message);
    })
  }

}
