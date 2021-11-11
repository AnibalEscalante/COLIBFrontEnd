import { Component, Input, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { Message } from '../../../core/models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less']
})
export class MessageComponent implements OnInit {

  @Input()
  public message!: Message | null;
  private socket = io("http://localhost:5200", {
    reconnectionDelayMax: 10000,
    query: {
      message: "reciever"
  }});

  constructor() {
    this.socket.on("message", (reciever: any) => {
      console.log(reciever);
    })
   }

  ngOnInit(): void {
  }

}
