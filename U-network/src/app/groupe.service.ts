import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Groupe from './models/groupe';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  constructor(private httpclient:HttpClient) { }
  baseUrl="http://localhost:3000/api";
  getGroupeByIdUser(id:String){
    return this.httpclient.get<Groupe[]>(this.baseUrl+"/groupeByUser/"+id);
  }

  creerGroupe(Groupe:Groupe){
    return this.httpclient.post<Groupe>(this.baseUrl+"/groupe",Groupe);
  }

  updateGroupe(Groupe:Groupe,id:string){
    return this.httpclient.put(this.baseUrl+"/groupe/"+id,Groupe);
  }

  deleteGroupe(id:string){
    return this.httpclient.delete<Groupe>(this.baseUrl+"/groupe/"+id);
  }
}
