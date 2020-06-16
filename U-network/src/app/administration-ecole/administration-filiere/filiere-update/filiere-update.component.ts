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
  selector: 'app-filiere-update',
  templateUrl: './filiere-update.component.html',
  styleUrls: ['./filiere-update.component.css']
})
export class FiliereUpdateComponent implements OnInit {
  dataSource: MatTableDataSource<Formation>;
  dataSource2: MatTableDataSource<Formation>;
  displayedColumns: string[] = ['lb_formation','update','delete'];
  erreur="";
  id : string;
  formations:Formation[];
  maFiliere: Filiere = {
    lb_filiere: ""
  };
  closeResult: string;
  formationsFiliere:Formation[]=[];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router:Router,private route:ActivatedRoute,private filiereService:filiereService,private formationService : FormationService,private modalService: NgbModal,private cdr:ChangeDetectorRef) {
   }



ngOnInit() {
  this.id = this.route.snapshot.params['id'];
  this.filiereService.getFiliereById(this.id)
    .subscribe(data=>{
      this.maFiliere=data;
    });
    this.dataSource = new MatTableDataSource();
    this.formationService.getFormation()
    .subscribe(data=>{
      this.formations=data;
      this.updateData();
      this.dataSource.data=this.formationsFiliere;
    });;
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }

  updateData(){
    this.filiereService.getFiliereById(this.id)
    .subscribe(data=>{
      this.maFiliere=data;
    });
    this.formationsFiliere=[];
    this.dataSource.data=[];
    for(var filiere of this.maFiliere.formation){
      for(var formation of this.formations){
        if(filiere==formation._id){
          this.formationsFiliere.push(formation);
          this.dataSource.data=this.formationsFiliere;
          this.cdr.detectChanges();
          console.log("dataSource",this.dataSource.data);
        }
      }
    }
  }



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData (sort: MatSort) {
    const data = this .dataSource.data.slice ();
    if (! sort.active || sort.direction === '' ) {
       this.dataSource.data = data;
      return ;
    }
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'lb_formation': return compare(a.lb_formation, b.lb_formation, isAsc);
        default: return 0;
      }
    });
  }

  redirectToDelete(idFormation:string,idFiliere:string){
    var index = this.maFiliere.formation.indexOf(idFormation);

    this.maFiliere.formation.splice(index,1);
    this.filiereService.updateFiliere(this.maFiliere,this.maFiliere._id).subscribe(res => {
      this.updateData();
     },
     err => {
         this.erreur="Impossible de supprimer cette formation.";
         console.error("erreur",err.message);
       
     });
     
  }


  updateFiliere(){
        this.filiereService
    .updateFiliere(this.maFiliere,this.id)
    .subscribe(data=>this.handleSuccess(data),err=>this.handleError(err));
  }
  handleSuccess(data){

  }

  handleError(err){
    this.erreur="Mise à jour impossible";
  }

  redirectToUpdate(id:string){
    this.router.navigate(['/updateFormation/'+id]);
  }

  //MODAL
  displayedColumns2: string[] = ['select','lb_formationModal'];
  selection = new SelectionModel<Formation>(true, []);
  @ViewChild(MatPaginator) paginatorModal: MatPaginator;
  formationNonPresenteDansFiliere:Formation[];
  open(content) {
    this.selection.clear();
    this.formationNonPresenteDansFiliere=[];
    this.dataSource2 = new MatTableDataSource();
      for(var formation of this.formations){
              if(this.dataSource.data.indexOf(formation)==-1){
                this.formationNonPresenteDansFiliere.push(formation);
              }
      }

    this.dataSource2.data=this.formationNonPresenteDansFiliere;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  applyFilterModal(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource2.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource2.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Formation): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row._id + 1}`;
  }
closeModal(selectedOptions){
  
  for(var maSelection of selectedOptions){
    this.maFiliere.formation.push(maSelection._id);
  }

  this.filiereService.updateFiliere(this.maFiliere,this.maFiliere._id).subscribe(res => {
    this.updateData();
    console.log("this",this.maFiliere);
   },
   err => {
       this.erreur="Impossible de supprimer cette formation.";
       console.error("erreur",err.message);
   });
}


}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
