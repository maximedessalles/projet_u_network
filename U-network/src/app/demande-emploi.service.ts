import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import demandeEmploi from './models/demandeEmploi';

@Injectable({
  providedIn: 'root'
})
export class demandeEmploiService {
  baseUrl="http://localhost:3000/api";
  constructor(private http:HttpClient) { }


  add(demandeEmploi:demandeEmploi){
    return this.http.post<demandeEmploi>(this.baseUrl+"/demandeEmploi",demandeEmploi);
  }

  getAllDemandeForList(){
    return this.http.get<demandeEmploi[]>(this.baseUrl+"/demandeEmploi");
  }
  getDemande(id:string){
    return this.http.get<demandeEmploi>(this.baseUrl+`/demandeEmploi/${id}`);
  }

  getDemandeByFiliere(id:string){
    return this.http.get<demandeEmploi[]>(this.baseUrl+`/demandeEmploiByFiliere/${id}`);
  }

}
