import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Route, Router } from '@angular/router';
import demandeEmploi from "../../models/demandeEmploi";
import {demandeEmploiService} from "../../demande-emploi.service";
import { filiereService } from 'src/app/filiere.service';
import Filiere from 'src/app/models/filiere';

@Component({
  selector: 'app-demandeEmploi',
  templateUrl: './demandeEmploi.component.html',
  styleUrls: ['./demandeEmploi.component.css']
})
export class DemandeEmploiComponent implements OnInit {

  constructor(private filiereService:filiereService,private router:Router, private demandeEmploiService:demandeEmploiService,private cdr:ChangeDetectorRef) { }
  offres: demandeEmploi[] = [];
  filieres:Filiere[];
  idFiliere:string;
  ngOnInit() {
    this.demandeEmploiService.getAllDemandeForList()
    .subscribe(data=>{
      this.offres=data;
    });
    this.filiereService.getFiliere()
            .subscribe(data => {
                this.filieres = data;
            });
  }
  

  goToCreate() {
    this.router.navigate(['/createDemande']);
  }
  goToShow(filiere: number) {
    this.router.navigate(['/showDemande/'+filiere]);
  }
  changeFiliere(){
    console.log(this.idFiliere);
    if(this.idFiliere=="None"){
      this.demandeEmploiService.getAllDemandeForList()
      .subscribe(data=>{
        this.offres=data;
        this.cdr.detectChanges();
      });
    }else{
      this.demandeEmploiService.getDemandeByFiliere(this.idFiliere)
      .subscribe(data=>{
        this.offres=data;
        this.cdr.detectChanges();
      });
    }
  }
  redirect() {
    this.router.navigate(['/recrutement/']);
  }
  
}
