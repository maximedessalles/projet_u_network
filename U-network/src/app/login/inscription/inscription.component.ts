import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import User from 'src/app/models/User';
import { Router } from '@angular/router';
import Formation from 'src/app/models/Formation';
import { FormationService } from 'src/app/formation.service';
import Promotion from 'src/app/models/promotion';
import { PromotionService } from 'src/app/promotion.service';
import Filiere from 'src/app/models/filiere';
import { filiereService } from 'src/app/filiere.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  erreur = "";
  formations: Formation[];
  promotions: Promotion[];
  erreurMail="";
  userMail:string[];
  filieres: Filiere[];
  maFiliere: Filiere = {
    lb_filiere: ""
  }
  constructor(private userService: UserService, private router: Router, private formationService: FormationService, private promotionService: PromotionService, private filiereService: filiereService) { }

  ngOnInit() {

    this.formationService.getFormation()
    .subscribe(data=>{
      this.formations=data;
    });

    this.promotionService.getPromotion()
    .subscribe(data=>{
      this.promotions=data;
    });

    this.filiereService.getFiliere()
    .subscribe(data=>{
      this.filieres=data;
    });

    this.userService.getAllMails().subscribe(data=>{
      this.userMail=data;
    });
    
  }

  checkEmail(){
    for(let i=0;i<this.userMail.length;i++){
      if(this.userMail[i]["email"]==this.user.email){
        this.erreurMail="Ce mail est déjà utilisé"
        
      }else{
        this.erreurMail="";
      }
    }
  }

  user: User = {
    email: "",
    password: "",
    name:"",
    firstName:"",
    civilite:"Madame",
    isRGPDAcceptedRegister:false,
    isRGPDAcceptedLogin:false,
    isMailValid:false,
    forcePasswordChange:false,
    etude:[{
      promotion:"",
      formation:"",
      filiere:""
    }]
    
  };
  maFormation: string;
  maPromotion: string;
  passwordConf: "";

  inscription() {
    this.erreur = "";
    var result = true;
    if (!this.user.email.match(/[\w.-]+@[\w.-]+\.[a-z]{2,6}/)) {
      this.erreur = "<li>L'adresse mail n'est pas valide</li>";
      result = false;
    }
    if (!(this.user.password == this.passwordConf)) {
      this.erreur += "<li>Les mots de passe ne sont pas identique</li>";
      result = false;
    }
    if (!this.user.password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)/)) {
      this.erreur += "<li> Le mot de passe doit contenir 8 caractères , 1 chiffre et 1 caractère spécial</li>";
      result = false;
    }

  if(result){
    this.filiereService.getFiliereByIdFormation(this.maFormation)
    .subscribe(data=>{
      this.maFiliere._id=data[0]._id;
      this.maFiliere.formation=data[0].formation;
      this.maFiliere.lb_filiere=data[0].lb_filiere;
      this.user.etude[0].filiere=this.maFiliere._id;
      this.user.etude[0].formation=this.maFormation;
      this.user.etude[0].promotion=this.maPromotion;
      console.log('Username',this.user);
        this.userService
        .register(this.user)
        .subscribe(data=>this.handleSuccess(data),error=>this.handleError(error));
    });


    
  }
  }


  checkFormation(filiere: Filiere, formation: Formation) {
    var found = filiere.formation.find(function (element) {
      return element == formation._id;
    });
    if (found) {
      return true;
    } else {
      return false;
    }
  }


  handleSuccess(data) {
    this.router.navigate(['/']);
  }

  handleError(error) {
    console.error('Erreur', error);
  }

}
