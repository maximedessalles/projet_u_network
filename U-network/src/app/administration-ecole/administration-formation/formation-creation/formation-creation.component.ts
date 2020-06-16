import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { filiereService } from 'src/app/filiere.service';
import Filiere from 'src/app/models/filiere';
import Formation from 'src/app/models/Formation';
import { FormationService } from 'src/app/formation.service';


@Component({
  selector: 'app-formation-creation',
  templateUrl: './formation-creation.component.html',
  styleUrls: ['./formation-creation.component.css']
})
export class FormationCreationComponent implements OnInit {
  erreur="";
  filieres:Filiere[];
  filiereId:string;
  filiereSelectionnee:Filiere;
  maFormation: Formation = {
    lb_formation: ""
  };

  constructor(private router:Router,private filiereService:filiereService,private formationService:FormationService) { }



ngOnInit() {
  this.filiereService.getFiliere()
    .subscribe(data=>{
      this.filieres=data;
    });  
  }

  retour(){
    this.router.navigate[('/administrationFormation')];
  }

  creerFormation(){
    if(this.maFormation.lb_formation==""||this.maFormation.lb_formation==null){
      this.erreur="Le libellé ne peut pas être vide.";
    }else{
      this.formationService
      .creerFormation(this.maFormation)
      .subscribe(data=>{
        this.maFormation= data;
      this.filiereService.getFiliereById(this.filiereId).subscribe(data=>{
        this.filiereSelectionnee=data;
        this.filiereSelectionnee.formation.push(this.maFormation._id);
        this.filiereService.updateFiliere(this.filiereSelectionnee,this.filiereSelectionnee._id).subscribe(res => {
        },
        err => {
            this.erreur="Impossible de supprimer cette formation.";
            console.error("erreur",err.message);
          
        });
      });


     
      
      this.router.navigate(['/administrationFormation']);
      },error=>this.handleError(error));
    }
    }

    
    handleError(error){
      console.error('Erreur',error);
    }
  
}
