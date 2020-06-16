import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { filiereService } from 'src/app/filiere.service';
import Filiere from 'src/app/models/filiere';


@Component({
  selector: 'app-filiere-creation',
  templateUrl: './filiere-creation.component.html',
  styleUrls: ['./filiere-creation.component.css']
})
export class FiliereCreationComponent implements OnInit {
  erreur="";
  maFiliere: Filiere = {
    lb_filiere: ""
  };

  constructor(private router:Router,private filiereService:filiereService) { }



ngOnInit() {
  
  }

  retour(){
    this.router.navigate[('/administrationFiliere')];
  }

  creerFiliere(){
    if(this.maFiliere.lb_filiere==""||this.maFiliere.lb_filiere==null){
      this.erreur="Le libellé ne peut pas être vide.";
      console.log("test",this.erreur);
    }else{
      this.filiereService
      .creerFiliere(this.maFiliere)
      .subscribe(data=>this.handleSuccess(data),error=>this.handleError(error));
    }
    }

    handleSuccess(data){
      console.log('CreateFiliere',data);
      this.router.navigate(['/administrationFiliere']);
    }
    
    handleError(error){
      console.error('Erreur',error);
    }
  
}
