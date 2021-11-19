import { Component, Input, OnInit } from '@angular/core';
import { MessageChat } from '../../../core/models/messageChat.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less']
})
export class MessageComponent implements OnInit {

  @Input()
  public message!: MessageChat | null;

  constructor(
  ) {
  }

  ngOnInit(): void {
    
  }

}
