import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { AuthService } from 'src/app/auth.service';
import User from 'src/app/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  monUser : User;

  constructor(private router:Router,private userService : UserService,private authService:AuthService) { }
  token : Boolean;
  
  ngOnInit() {
    this.token=this.authService.isLoggedIn();

  }

  ngAfterContentChecked(){
    this.token=this.authService.isLoggedIn();
    this.monUser = this.authService.getUserLogged();

  }


  goToConnexion(){
    this.router.navigate(['/login']);
    
  }

  goToInscription(){
    this.router.navigate(['/inscription']);
  }

  goToAnnuaire(){
    this.router.navigate(['/annuaire']);
  }

  goToAccueil(){
    this.router.navigate(['/']);
  }

  goToActualite(){
    this.router.navigate(['/actualite']);
  }
  goToRecrutement(){
    this.router.navigate(['/recrutement']);
  }

  goToContact(){
    this.router.navigate(['/contact']);
  }

  goToAdministrationEcole(){
    this.router.navigate(['/administrationEcole']);
  }

  logout(){
    this.authService.deleteSession();
    this.router.navigate(['/login']);
  }

  goToProfile(){
    const user = this.authService.getUserLogged();
    const id = user._id;
    this.router.navigate(['/profile/'+id]);
  }



}
