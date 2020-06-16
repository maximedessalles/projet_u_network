import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import User from '../models/User';
import { SnackBarComponent } from '../snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-administration-ecole',
  templateUrl: './administration-ecole.component.html',
  styleUrls: ['./administration-ecole.component.css']
})
export class AdministrationEcoleComponent implements OnInit {

  constructor(private _snackBar:MatSnackBar,private router: Router, private authService: AuthService) { }
  user: User;
  ngOnInit() {
    this.user = this.authService.getUserLogged();
    if (this.user.role[0]!="AdministrationEcole"){
      this._snackBar.openFromComponent(SnackBarComponent, {
        duration: 3000,
        verticalPosition: 'top',
        data: { msg: "Vous n'avez pas les droits nécessaire pour accéder à cette partie" }
      });
      this.router.navigate(['/']);
     
    }
  }

  goToFiliereTab() {
    this.router.navigate(['/administrationFiliere']);
  }
  goToFormationTab() {
    this.router.navigate(['/administrationFormation']);
  }

  goToPromotionTab() {
    this.router.navigate(['/administrationPromotion']);
  }

  goToUserTab() {
    this.router.navigate(['/administrationUser']);
  }

}
