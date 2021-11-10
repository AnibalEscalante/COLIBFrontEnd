import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {

  @Input()
  public user!: User;

  constructor() {
  }

  ngOnInit(): void {
  }

}
