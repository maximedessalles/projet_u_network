import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import User from './models/User';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl='http://localhost:3000/api';

  user:User[];
  noAuthHeader = {headers: new HttpHeaders({NoAuth: 'True'})};
  constructor(private http:HttpClient,private userService: UserService) {
    
   }
  
  login(authCredentials){

    return this.http.post<User>(this.baseUrl+"/login",authCredentials,this.noAuthHeader);
  }

  logout(){

    return this.http.get(this.baseUrl+"/logout");
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('user');
    
  }

  getConfirmation(token) {
    return this.http.get(this.baseUrl + '/confirmation/' + token);
  }
  setCookieAcceptedToken() {
    localStorage.setItem('cookie', 'C\'est cool !');
  }
  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }
  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  getUserLogged():any{
    return JSON.parse(localStorage.getItem('user'));
  }

  getIdUserLogged():string{
    var id:string;
    var user=this.getUserLogged();
    id=user._id;
    return id;
  }
}
