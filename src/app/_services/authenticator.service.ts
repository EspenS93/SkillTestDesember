import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticatorService {
  constructor(
    private http: HttpClient ) {
  }
  authenticated():boolean{
    if (localStorage.getItem('accesstoken')) {
      return true;
    }else{
      return false;
    }
  }

  login(username: string,password: string) {
    return this.http.post<any>('https://test-api.unieconomy.no/api/init/sign-in', { username: username, password: password })
              .pipe(map(accesstoken => {
                console.log(JSON.stringify(accesstoken));
                if(accesstoken){
                  localStorage.setItem('accesstoken', JSON.stringify(accesstoken));
                  console.log(JSON.stringify(accesstoken));
                }
                return accesstoken;
              }));
  }
  logout(): void {
    localStorage.removeItem('accesstoken');
  }
}
