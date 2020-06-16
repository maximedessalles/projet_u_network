import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Formation from './models/Formation';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  baseUrl="http://localhost:3000/api";
  constructor(private httpclient:HttpClient) { }

  getFormation(){
    console.log("getformation")
    return this.httpclient.get<Formation[]>(this.baseUrl+"/formation");
  }

  deleteFormationForFiliere(idFormation:string,idFiliere:string){
    return this.httpclient.get<Formation[]>(this.baseUrl+"/formation");
  }

  deleteFormation(id:string){
    return this.httpclient.delete<Formation>(this.baseUrl+"/formation/"+id);
  }

  creerFormation(formation:Formation){
    return this.httpclient.post<Formation>(this.baseUrl+"/formation",formation);
  }

  getFormationById(id:string){
    return this.httpclient.get<Formation>(this.baseUrl+"/formation/"+id);
  }

  updateFormation(formation:Formation,id:string){
    return this.httpclient.put(this.baseUrl+"/formation/"+id,formation);
  }
}
