import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Contact } from '../_models/contact';
import { map } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Content } from '@angular/compiler/src/render3/r3_ast';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://test-api.unieconomy.no:443/api/biz/contacts';

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    let expandedUrl = this.apiUrl +'?expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress'
    return this.http.get(expandedUrl).pipe(map(result => result as Contact[]));
  }
  getContact(id: number): Observable<Contact> {
    let expandedUrl = this.apiUrl+'/'+id +'?expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress'
    return this.http.get(expandedUrl).pipe(map(result => result as Contact));
  }
  create(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, JSON.stringify(contact)).pipe(map(result => result as Contact));;
  }
  delete(id: number): Observable<Contact> {
    let expandedUrl = this.apiUrl+'/'+id;
    return this.http.delete(expandedUrl).pipe(map(result => result as Contact));;
  }
  update(id: number, contact: Contact): Observable<Contact> {
    let expandedUrl = this.apiUrl+'/'+id;
    return this.http.put<Contact>(expandedUrl, JSON.stringify(contact)).pipe(map(result => result as Contact));
  }
/*
  getTopCars(contacts: number): Observable<Contact[]> {
    const url = `${this.contactUrl}/${contacts}`;
    return this.http.get(url).pipe(map(result => result.json() as Contact[] , error => this.handleError));
  }

  search(searchTerm: string): Observable<Contact[]> {
    const url = `${this.contactUrl}/${searchTerm}`;
    return this.http.get(url).pipe(map(result => result.json() as Contact[], error => this.handleError));
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Observable.reject(error.message || error);
  }*/
}
