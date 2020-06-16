import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Promotion from './models/promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  baseUrl="http://localhost:3000/api";
  constructor(private httpclient:HttpClient) { }

  getPromotion(){
    return this.httpclient.get<Promotion[]>(this.baseUrl+"/promotion");
  }

  creerPromotion(Promotion:Promotion){
    return this.httpclient.post<Promotion>(this.baseUrl+"/promotion",Promotion);
  }

  deletePromotion(id:string){
    return this.httpclient.delete<Promotion>(this.baseUrl+"/promotion/"+id);
  }
  getPromotionById(id:string){
    return this.httpclient.get<Promotion>(this.baseUrl+"/promotion/"+id);
  }

  updatePromotion(Promotion:Promotion,id:string){
    return this.httpclient.put(this.baseUrl+"/promotion/"+id,Promotion);
  }

}
