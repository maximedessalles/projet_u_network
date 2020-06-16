import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from 'selenium-webdriver/http';

@Injectable()
export class AddCookieInterceptor implements HttpInterceptor{
    intercept(req:HttpRequest<any>,next : HttpHandler):Observable<HttpEvent<any>>{
        const token = localStorage.getItem('token');
        if (token) {
            var reqWithCookie: HttpRequest<any> = req.clone({
                withCredentials: true,
                headers: req.headers.set('authorization', token)
            });
        } else {
            var reqWithCookie: HttpRequest<any> = req.clone({
                withCredentials: false
            });
        }
        
        return next.handle(reqWithCookie);
    }
}