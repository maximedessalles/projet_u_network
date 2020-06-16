import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { filiereService } from 'src/app/filiere.service';
import Filiere from 'src/app/models/filiere';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormationService } from 'src/app/formation.service';
import Formation from 'src/app/models/Formation';

@Component({
  selector: 'app-administration-formation',
  templateUrl: './administration-formation.component.html',
  styleUrls: ['./administration-formation.component.css']
})
export class AdministrationFormationComponent implements OnInit {
  dataSource: MatTableDataSource<Formation>;
  displayedColumns: string[] = [ 'lb_formation','update','delete'];
  mesFilieresByFormation:Filiere[];

  constructor(private router:Router,private filiereService:filiereService,private formationService:FormationService) { }

formation:Formation[];
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
erreur="";

ngOnInit() {
  this.dataSource = new MatTableDataSource();
    this.formationService.getFormation()
    .subscribe(data=>{
      this.formation=data;
      this.dataSource.data=this.formation;
    });;
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }
  goToFiliereTab(){
    this.router.navigate(['/formation']);
  }

  gotoCreation(){
    this.router.navigate(['/creationFormation']);
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
        case 'id': return compare(a._id, b._id, isAsc);
        case 'name': return compare(a.lb_formation, b.lb_formation, isAsc);
        default: return 0;
      }
    });
  }

  public redirectToUpdate = (id: string) => {
   this.router.navigate(['/updateFormation/'+id]);
  }
 
  // public redirectToDelete = (id: string) => {
  //   this.formationService.deleteFormation(id).subscribe(res => {
  //     this.updateData();
  //    },
  //    err => {
  //        this.erreur="Impossible de supprimer cette formation.";
  //        console.error("erreur",err.message);
  //    });

  //    this.filiereService.getFiliereByIdFormation(id).subscribe(data=>{
  //       this.mesFilieresByFormation=data;
  //       for(var filiere of this.mesFilieresByFormation){
  //         var index = filiere.formation.indexOf(id);
  //         filiere.formation.splice(index,1);
  //         console.log("filiere",filiere);
  //         this.filiereService.updateFiliere(filiere,filiere._id).subscribe(res => {
  //          },
  //          err => {
  //              this.erreur="Impossible de supprimer cette formation de la filière.";
  //              console.error("erreur",err.message);
             
  //          });
  //       }
  //    },err=>{
  //       this.erreur="Impossible de récupérer la filiere pour la formation"
  //    });   

     

  //   }

    retour(){
      this.router.navigate(['/administrationEcole'])
    }
   
    

  public updateData(){
    this.formationService.getFormation()
    .subscribe(data=>{
      this.formation=data;
      this.dataSource.data=this.formation;
    });;
  }




  
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}