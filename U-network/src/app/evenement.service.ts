import { Injectable } from '@angular/core';
import Evenement from './models/evenement';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  constructor(private httpclient:HttpClient) { }
  baseUrl="http://localhost:3000/api";

  creerEvenement(evenement:Evenement){
    return this.httpclient.post<Evenement>(this.baseUrl+"/evenement",evenement);
  }

 

  getEvenement(){
    return this.httpclient.get<Evenement[]>(this.baseUrl+"/getEvenement");
    
  }

  updateEvenement(evenement:Evenement){
    return this.httpclient.put(this.baseUrl+"/updateEvenement/"+evenement._id,evenement);
  }

}