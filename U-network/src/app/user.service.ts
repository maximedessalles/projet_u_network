import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from './models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl="http://localhost:3000/api";
  constructor(private http:HttpClient) { }


  register(user:User){
    return this.http.post<User>(this.baseUrl+"/user",user);
  }

  getAllUsersForAnnuaire(){
    return this.http.get<User[]>(this.baseUrl+"/user");
  }

  getAllMails(){
    return this.http.get<string[]>(this.baseUrl+"/userEmail");
  }

  getUsersWithoutEtude(promotion:string,formation:string){
    return this.http.get<User[]>(this.baseUrl+"/userWithoutEtude/"+formation+"/"+promotion);
  }


  getUsersWithFilter(filter:object){
    return this.http.post<User[]>(this.baseUrl+"/userWithFilter",filter);
  }

  getUserById(id : String){
    return this.http.get<User>(this.baseUrl+"/user/"+id);
  }

  deleteUser(id:string){
    return this.http.delete<User>(this.baseUrl+"/user/"+id);
  }

  getUsersFiltre(formation:string,promotion:string){
    return this.http.get<User[]>(this.baseUrl+"/user/"+formation+"/"+promotion);
  }

  checkRole(user:User,role:string):boolean{
    var found = user.role.find(function(element) {
      return element == role;
    });

    if(found){
      return true;
    }else{
      return false;
    }
  }

  updateUser(user:User,id:string){
    return this.http.put(this.baseUrl+"/user/"+id,user);
  }

}
