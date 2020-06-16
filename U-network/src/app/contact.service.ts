import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl="http://localhost:3000/api";
  constructor(private httpclient: HttpClient) { }

  send(contact: any){
    return this.httpclient.post(this.baseUrl+"/sendEmail", contact);
  }
}
