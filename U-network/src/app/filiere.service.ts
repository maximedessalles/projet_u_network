import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Promotion from './models/promotion';
import Filiere from './models/filiere';

@Injectable({
  providedIn: 'root'
})
export class filiereService {

  baseUrl="http://localhost:3000/api";
  constructor(private httpclient:HttpClient) { }

  getFiliere(){
    return this.httpclient.get<Filiere[]>(this.baseUrl+"/filiere");
  }

  creerFiliere(filiere:Filiere){
    return this.httpclient.post<Filiere>(this.baseUrl+"/filiere",filiere);
  }

  deleteFiliere(id:string){
    return this.httpclient.delete<Filiere>(this.baseUrl+"/filiere/"+id);
  }
  getFiliereById(id:string){
    return this.httpclient.get<Filiere>(this.baseUrl+"/filiere/"+id);
  }

  updateFiliere(filiere:Filiere,id:string){
    return this.httpclient.put(this.baseUrl+"/filiere/"+id,filiere);
  }

  getFiliereByIdFormation(id:String){
    return this.httpclient.get<Filiere[]>(this.baseUrl+"/filiereByFormation/"+id);
  }
}
