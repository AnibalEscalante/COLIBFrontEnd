import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-contacts',
  templateUrl: './edit-contacts.component.html',
  styleUrls: ['./edit-contacts.component.less']
})
export class EditContactsComponent implements OnInit {

  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  saveNotification() {
      this.toastr.success('Los cambios se guardaron exitosamente.');
  }

  cancelNotification() {
    this.toastr.warning('Los cambios no se guardaron.');
  }
}
