import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Actualite from './models/actualite';

@Injectable({
  providedIn: 'root'
})
export class ActualiteService {

  constructor(private httpclient:HttpClient) { }
  baseUrl="http://localhost:3000/api";
  getActualiteForGroupe(id:String){
    console.log(id);
    return this.httpclient.get<Actualite[]>(this.baseUrl+"/getActualiteGroupe/"+id);
  }

  creerActualite(actualite:Actualite){
    return this.httpclient.post<Actualite>(this.baseUrl+"/actualite",actualite);
  }

  getActualiteForUser(id: string) {
    console.log(id)
    return this.httpclient.get<Actualite[]>(this.baseUrl+"/getActualiteUser/"+id);
  }

  updateActualite(id:string, publication: Actualite){
    console.log("ici updateactu")
    return this.httpclient.put(this.baseUrl+"/updateActualite/"+id, publication);
  }

  getActualite(){
    return this.httpclient.get<Actualite[]>(this.baseUrl+"/getActualite");
    
  }

  /*deleteGroupe(id:string){
    return this.httpclient.delete<Groupe>(this.baseUrl+"/groupe/"+id);
  }*/
}
