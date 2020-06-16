import { Component, OnInit, ViewChild, Inject ,ChangeDetectorRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { filiereService } from 'src/app/filiere.service';
import Filiere from '../../../models/filiere';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormationService } from 'src/app/formation.service';
import { PromotionService } from 'src/app/promotion.service';
import Formation from 'src/app/models/Formation';
import Promotion from 'src/app/models/Promotion';
import { NgModel } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-promotion-update',
  templateUrl: './promotion-update.component.html',
  styleUrls: ['./promotion-update.component.css']
})
export class PromotionUpdateComponent implements OnInit {

nb:number;
  erreur="";
  id : string;



  maPromotion:Promotion ={
    lb_promotion:"",
    _id:""
  };


  


  constructor(private router:Router,private route:ActivatedRoute,private filiereService:filiereService,private formationService : FormationService,private modalService: NgbModal,private cdr:ChangeDetectorRef,private promotionService:PromotionService) {
   }



ngOnInit() {
  this.id = this.route.snapshot.params['id'];
  this.promotionService.getPromotionById(this.id)
    .subscribe(data=>{
      this.maPromotion=data;
    });
    
  }

 



  updatePromotion(){

    this.promotionService
    .updatePromotion(this.maPromotion,this.maPromotion._id)
    .subscribe(data=>this.handleSuccess(data),err=>this.handleError(err));
  }
  handleSuccess(data){
    this.erreur="";
    this.router.navigate(['/administrationPromotion']);
  }

  handleError(err){
    this.erreur="Mise à jour impossible";
  }
}
