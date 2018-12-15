import { Component, OnInit } from '@angular/core';
import { Contact } from '../_models/contact'
import { ContactService } from '../_services/contact.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  contacts: Contact[];

  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts(): void {
  }
}
