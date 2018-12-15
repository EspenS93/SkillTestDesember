import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

        let accesstoken = JSON.parse(localStorage.getItem('accesstoken'));
        let companyKey = "";
        if(localStorage.getItem('CompanyKey')){
            //console.log(localStorage.getItem('CompanyKey'));
            companyKey = JSON.parse(localStorage.getItem('CompanyKey'));
        }
        //console.log(accesstoken.access_token);
        if (accesstoken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${accesstoken.access_token}`,
                    CompanyKey: companyKey
                }
            });
        }

        return next.handle(request);
    }
}
