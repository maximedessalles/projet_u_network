import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Route, Router } from '@angular/router';
import Recrutement from "../../models/recrutement";
import {RecrutementService} from "../../recrutement.service";
import { filiereService } from 'src/app/filiere.service';
import Filiere from 'src/app/models/filiere';

@Component({
  selector: 'app-recrutement',
  templateUrl: './recrutement.component.html',
  styleUrls: ['./recrutement.component.css']
})
export class RecrutementComponent implements OnInit {

  constructor(private cdr:ChangeDetectorRef,private filiereService:filiereService,private router:Router, private recrutementService:RecrutementService) { }
  offres: Recrutement[] = [];
  filieres:Filiere[];
  idFiliere:string;
  ngOnInit() {
    this.recrutementService.getAllRecrutementsForList()
    .subscribe(data=>{
      this.offres=data;
    });
    this.filiereService.getFiliere()
            .subscribe(data => {
                this.filieres = data;
            });
  }
  

  goToCreate() {
    this.router.navigate(['/createRecrutement']);
  }
  goToShow(filiere: number) {
    this.router.navigate(['/showRecrutement/'+filiere]);
  }
  changeFiliere(){
    console.log(this.idFiliere);
    if(this.idFiliere=="None"){
      this.recrutementService.getAllRecrutementsForList()
      .subscribe(data=>{
        this.offres=data;
        this.cdr.detectChanges();
      });
    }else{
      this.recrutementService.getRecrutementByFiliere(this.idFiliere)
      .subscribe(data=>{
        this.offres=data;
        this.cdr.detectChanges();
      });
    }
  }
  
  redirect() {
    this.router.navigate(['/demandeEmploi/']);
  }
}
