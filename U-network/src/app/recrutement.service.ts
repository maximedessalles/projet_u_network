import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Recrutement from './models/Recrutement';

@Injectable({
  providedIn: 'root'
})
export class RecrutementService {
  baseUrl="http://localhost:3000/api";
  constructor(private http:HttpClient) { }


  add(recrutement:Recrutement){
    return this.http.post<Recrutement>(this.baseUrl+"/recrutement",recrutement);
  }

  getAllRecrutementsForList(){
    return this.http.get<Recrutement[]>(this.baseUrl+"/recrutement");
  }
  getRecrutement(id:string){
    return this.http.get<Recrutement>(this.baseUrl+`/recrutement/${id}`);
  }

  getRecrutementByFiliere(id:string){
    return this.http.get<Recrutement[]>(this.baseUrl+`/recrutementByFiliere/${id}`);
  }

}
