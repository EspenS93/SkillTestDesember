import { Component, OnInit } from '@angular/core';
import { Company } from '../_models/company';
import { CompanyService } from '../_services/company.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Contact } from '../_models/contact';
import { ContactService } from '../_services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public companies: Company[];
  public contacts: Contact[];
  public newContact: Contact;
  public contactModalShow = false;
  public showAddress = false;
  public showPhone = false;
  public showEmail = false;
  constructor(private http: HttpClient, private contactService: ContactService) {
  }

  ngOnInit() {
    this.newContact = new Contact();
    this.getCompanies().subscribe(result => {
      this.companies = result;
      if (this.companies && this.companies[0].Key) {
        localStorage.setItem('CompanyKey', JSON.stringify(this.companies[0].Key));
        this.getContacts();
      }
    });
  }
  ToggleModal(): void {
    if (this.contactModalShow) {
      this.newContact = new Contact();
      this.showAddress = false;
      this.showPhone = false;
      this.showEmail = false;
      this.contactModalShow = false;
    } else {
      this.contactModalShow = true;
    }
  }
  updateSelectedContact(contact: Contact): void {
    this.newContact = contact;
    this.contactModalShow = true;
  }
  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>('https://test-api.unieconomy.no/api/init/companies');
  }
  setCompanyKey(selectedCompany: any): void {
    localStorage.setItem('CompanyKey', JSON.stringify(selectedCompany));
  }
  getContacts(): void {
    this.contactService.getContacts().subscribe(result => {
      this.contacts = result;
    }, error => console.error(error));
  }
  getContact(id: number): void {
    this.contactService.getContact(id).subscribe(result => {
      this.contacts.push(result);
    }, error => console.error(error));
  }
  addOrUpdate(): void {
    if (this.newContact.ID >= 0) {
      this.updateContact();
    } else {
      this.addContact();
    }
  }
  addContact(): void {
    this.contactService.create(this.newContact).subscribe(result => {
      this.newContact = new Contact();
      this.ToggleModal();
      this.getContacts();
    }, error => console.error(error));
  }
  updateContact() {
    this.contactService.update(this.newContact.ID, this.newContact).subscribe(result => {
      this.newContact = new Contact();
      this.ToggleModal();
      this.getContacts();
    }, error => console.error(error));
  }
  deleteContact(contact: Contact): void {
    this.contactService.delete(contact.ID).subscribe(result => {
      this.getContacts();
    }, error => console.error(error));
  }

}