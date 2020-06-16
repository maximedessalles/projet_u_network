import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import User from 'src/app/models/User';
import { UserService } from 'src/app/user.service';
import { RouterLinkActive, ActivatedRoute, Router } from '@angular/router';
import { FormationService } from 'src/app/formation.service';
import { PromotionService } from 'src/app/promotion.service';
import { filiereService } from 'src/app/filiere.service';
import Formation from 'src/app/models/Formation';
import Filiere from 'src/app/models/filiere';
import Promotion from 'src/app/models/promotion';
import { log } from 'util';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AuthService } from 'src/app/auth.service';
import { ActualiteService } from 'src/app/actualite.service';
import Actualite from 'src/app/models/actualite';
import { Route } from '@angular/compiler/src/core';
import { SnackBarComponent } from 'src/app/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profil-update',
  templateUrl: './profil-update.component.html',
  styleUrls: ['./profil-update.component.css']
})
export class ProfilUpdateComponent implements OnInit {
  erreur: string = "";
  userProfile: User = {
    email: "",
    password: "",
    name: "",
    firstName: "",
    civilite: "Madame",
    telephone:""

  };
  users: User[];
  promotions: Promotion[];
  formations: Formation[];
  userLogged: User;
  id: string;
  passwordConf: string = "";
  result = false;
  constructor(private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formationService: FormationService,
    private promotionService: PromotionService,
    private filiereService: filiereService,
    private _adapter: DateAdapter<any>,
    private actualiteService: ActualiteService,
    private _snackBar: MatSnackBar,
    private router: Router) { }


  ngOnInit() {
    this.userLogged = this.authService.getUserLogged();
    this.id = this.route.snapshot.params['id'];
    if (this.id == this.userLogged._id) {
      this.formationService.getFormation()
        .subscribe(data => {
          this.formations = data;
        });
      this.userService.getAllUsersForAnnuaire()
        .subscribe(data => {
          this.users = data;
        });

      this.promotionService.getPromotion()
        .subscribe(data => {
          this.promotions = data;
        });;

      this.userLogged = this.authService.getUserLogged();
      console.log("id ", this.id)
      this.userService.getUserById(this.id)
        .subscribe(data => {

          this.userProfile = data;
          console.log("data", this.userProfile);
          console.log(this.userProfile.user_wait)
          this.cdr.detectChanges();
        });

    } else {
      this.router.navigate(['profile/' + this.id]);
    }

  }
  cancelAdd(user:User){
    this.userProfile.password=undefined;
    user.password=undefined;
    let i=this.userProfile.user_wait.indexOf(user._id);
    this.userProfile.user_wait.splice(i,1);
    let j=user.user_add.indexOf(this.userProfile._id);
    user.user_add.splice(i,1);
    console.log(this.userProfile);
    this.userService.updateUser(this.userProfile, this.userProfile._id).subscribe(data => {
    });
    this.userService.updateUser(user, user._id).subscribe(data => {
    });
  }

  addUser(user:User){
    this.userProfile.password=undefined;
    user.password=undefined;
    let i=this.userProfile.user_wait.indexOf(user._id);
    this.userProfile.user_wait.splice(i,1);
    let j=user.user_add.indexOf(this.userProfile._id);
    user.user_add.splice(i,1);
    user.user_friend.push(this.userProfile._id);
    this.userProfile.user_friend.push(user._id);
    this.userService.updateUser(this.userProfile, this.userProfile._id).subscribe(data => {
    });
    this.userService.updateUser(user, user._id).subscribe(data => {
    });
  }
  goUpdate() {
    this.userProfile.password = undefined;
    this.passwordConf = "";
    this.userService.updateUser(this.userProfile, this.userProfile._id).subscribe(data => {
      this._snackBar.openFromComponent(SnackBarComponent, {
        duration: 3000,
        verticalPosition: 'top',
        data: { msg: "Profil mis à jour" }
      });
    });
  }

  isPasswordOk() {
    this.result = true;
    if (!(this.userProfile.password == this.passwordConf)) {
      this.result = false;
    }
    if (!this.userProfile.password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)/)) {
      this.result = false;
    }
    console.log(this.result);
  }

  majPassword() {
    this.erreur = "";
    this.result = true;
    if (!(this.userProfile.password == this.passwordConf)) {
      this.erreur += "<li>Les mots de passe ne sont pas identique</li>";
      this.result = false;
    }
    if (!this.userProfile.password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)/)) {
      this.erreur += "<li> Le mot de passe doit contenir 8 caractères , 1 chiffre et 1 caractère spécial</li>";
      this.result = false;
    }
    if (this.result) {
      this.userService.updateUser(this.userProfile, this.userProfile._id).subscribe(data => {
        this._snackBar.openFromComponent(SnackBarComponent, {
          duration: 3000,
          verticalPosition: 'top',
          data: { msg: "Mot de passe mis à jour" }
        });
      });

    }



  }

  deleteFriend(user:User){
    let i = this.userProfile.user_friend.indexOf(user._id);
    this.userProfile.user_friend.splice(i,1);
    this.userService.updateUser(this.userProfile,this.userProfile._id).subscribe();
  }


  deleteEtude(etude: any) {
    let i = this.userProfile.etude.indexOf(etude);
    this.userProfile.etude.splice(i, 1);
    this.userService.updateUser(this.userProfile, this.userProfile._id).subscribe(data => {

    });
  }

  deleteExperience(experience: any) {
    let i = this.userProfile.experience.indexOf(experience);
    this.userProfile.experience.splice(i, 1);
    this.userService.updateUser(this.userProfile, this.userProfile._id).subscribe(data => {

    });
  }




  //Modal
  closeResult: string;
  monExperience: any;
  openExperience(contentExperience, experience) {
    this.monExperience = experience;

    this.modalService.open(contentExperience, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {


      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReasonExperience(reason)}`;
    });
  }

  private getDismissReasonExperience(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  closeModalExperience(selectedOptions) {
    this._adapter.setLocale('fr');
    var i = this.userProfile.experience.indexOf(this.monExperience);
    this.userProfile.experience.splice(i, 1);
    this.userProfile.experience.push(this.monExperience);
    this.userService.updateUser(this.userProfile, this.userProfile._id).subscribe(res => {
      this.erreur = "";
      this._snackBar.openFromComponent(SnackBarComponent, {
        duration: 3000,
        verticalPosition: 'top',
        data: { msg: "Experience mise à jour" }
      });
    },
      err => {
        this.erreur = "Impossible de supprimer cette formation.";
        console.error("erreur", err.message);

      });

  }

}
