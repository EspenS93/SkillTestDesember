import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Contact } from '../_models/contact';
import { map } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from '../_models/company';



@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private apiUrl = 'https://test-api.unieconomy.no/api/init/companies';

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get(this.apiUrl).pipe(map(result => result as Company[]));
  }
}
