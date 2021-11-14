import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../../core/models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less']
})
export class MessageComponent implements OnInit {

  @Input()
  public message!: Message | null;

  constructor(
  ) {
  }

  ngOnInit(): void {
    console.log("Message.component");
    
  }

}
