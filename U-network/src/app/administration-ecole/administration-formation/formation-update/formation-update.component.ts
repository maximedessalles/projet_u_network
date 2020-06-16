import { Component, OnInit, ViewChild, Inject ,ChangeDetectorRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { filiereService } from 'src/app/filiere.service';
import Filiere from '../../../models/filiere';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormationService } from 'src/app/formation.service';
import Formation from 'src/app/models/Formation';
import { NgModel } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-formation-update',
  templateUrl: './formation-update.component.html',
  styleUrls: ['./formation-update.component.css']
})
export class FormationUpdateComponent implements OnInit {

nb:number;
  erreur="";
  id : string;
  idFiliere:string;
  mesFilieres:Filiere[];



  maFiliere:Filiere ={
    lb_filiere:"",
    _id:""
  };
  ancienneFiliere:Filiere ={
    lb_filiere:"",
    _id:""
  };
  nouvelleFiliere:Filiere ={
    lb_filiere:"",
    _id:""
  };
  maFil:Filiere={
    lb_filiere:"",
    _id:""
  };
  maFormation: Formation = {
    lb_formation: ""
  };

  


  constructor(private router:Router,private route:ActivatedRoute,private filiereService:filiereService,private formationService : FormationService,private modalService: NgbModal,private cdr:ChangeDetectorRef) {
   }



ngOnInit() {
  this.id = this.route.snapshot.params['id'];
  this.formationService.getFormationById(this.id)
    .subscribe(data=>{
      this.maFormation=data;
    });
    
    this.filiereService.getFiliereByIdFormation(this.id)
    .subscribe(data=>{
      this.maFil=data[0];
      this.maFiliere._id=this.maFil._id;
      this.maFiliere.lb_filiere=this.maFil.lb_filiere;
      this.maFiliere.formation=this.maFil.formation;
      this.idFiliere=this.maFiliere._id;
        });

    this.filiereService.getFiliere()
    .subscribe(data=>{
      var nb=0;
      this.mesFilieres=data;
      

    });;
  }

 


  redirectToDelete(idFormation:string,idFiliere:string){
    var index = this.maFiliere.formation.indexOf(idFormation);

    this.maFiliere.formation.splice(index,1);
    this.filiereService.updateFiliere(this.maFiliere,this.maFiliere._id).subscribe(res => {

     },
     err => {
         this.erreur="Impossible de supprimer cette formation.";
         console.error("erreur",err.message);
       
     });
     
  }
  updateFormation(){

    var index1;
    var index2;
        this.formationService
    .updateFormation(this.maFormation,this.id)
    .subscribe(data=>this.handleSuccess(data),err=>this.handleError(err));
    

    if(this.idFiliere!=this.maFiliere._id){
      this.filiereService.getFiliereById(this.idFiliere)
      .subscribe(data=>{
      this.ancienneFiliere=data;
      index1= this.ancienneFiliere.formation.indexOf(this.idFiliere);
      this.ancienneFiliere.formation.splice(index1,1);
      this.filiereService.updateFiliere(this.ancienneFiliere,this.ancienneFiliere._id).subscribe(res => {
      },
      err => {
          this.erreur="Impossible de supprimer cette formation.";
          console.error("erreur",err.message);
      });
    });
    this.filiereService.getFiliereById(this.maFiliere._id)
      .subscribe(data=>{
        this.nouvelleFiliere=data;
        index2= this.nouvelleFiliere.formation.indexOf(this.idFiliere);
        if(index2==-1){
          this. nouvelleFiliere.formation.push(this.maFormation._id);
          this.filiereService.updateFiliere(this.nouvelleFiliere,this.nouvelleFiliere._id).subscribe(res => {
          },
          err => {
              this.erreur="Impossible de supprimer cette formation.";
              console.error("erreur",err.message);
            
          });
        }
        
    });
      this.router.navigate(['/administrationFormation']);
    }
    
  }
  handleSuccess(data){
    this.erreur="";
  }

  handleError(err){
    this.erreur="Mise à jour impossible";
  }
}
