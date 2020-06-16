import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-accueil-annuaire',
  templateUrl: './accueil-annuaire.component.html',
  styleUrls: ['./accueil-annuaire.component.css']
})
export class AccueilAnnuaireComponent implements OnInit {
  users : User[];
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  constructor(private userService : UserService,private router:Router) { }

  ngOnInit() {
    this.userService.getAllUsersForAnnuaire()
    .subscribe(data=>{
      this.users=data;
    });
  }

  goToAnnuaire(){
    this.router.navigate(['/annuaire']);
  }

  goToProfile(id:string){
    this.router.navigate(['/profile/'+id]);
}

}
