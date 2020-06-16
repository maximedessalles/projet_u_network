import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { filiereService } from 'src/app/filiere.service';
import Filiere from 'src/app/models/filiere';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/auth.service';
import User from 'src/app/models/User';
import { SnackBarComponent } from 'src/app/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-administration-filiere',
  templateUrl: './administration-filiere.component.html',
  styleUrls: ['./administration-filiere.component.css']
})
export class AdministrationFiliereComponent implements OnInit {
  dataSource: MatTableDataSource<Filiere>;
  displayedColumns: string[] = ['lb_filiere','update','delete'];


  constructor(private _snackBar:MatSnackBar,private authService:AuthService,private router:Router,private filiereService:filiereService) { }

filieres:Filiere[];
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
erreur="";
user:User;
ngOnInit() {
  this.user = this.authService.getUserLogged();
    if (this.user.role[0]!="AdministrationEcole"){
      this._snackBar.openFromComponent(SnackBarComponent, {
        duration: 3000,
        verticalPosition: 'top',
        data: { msg: "Vous n'avez pas les droits nécessaire pour accéder à cette partie" }
      });
      this.router.navigate(['/']);
     
    }
  this.dataSource = new MatTableDataSource();
    this.filiereService.getFiliere()
    .subscribe(data=>{
      this.filieres=data;
      this.dataSource.data=this.filieres;
    });;
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }
  goToFiliereTab(){
    this.router.navigate(['/filiere']);
  }

  gotoCreation(){
    this.router.navigate(['/creationFiliere']);
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
        case 'name': return compare(a.lb_filiere, b.lb_filiere, isAsc);
        default: return 0;
      }
    });
  }

  public redirectToUpdate = (id: string) => {
   this.router.navigate(['/updateFiliere/'+id]);
  }
 
  public redirectToDelete = (id: string) => {
    console.log("id",id);
    this.filiereService.deleteFiliere(id).subscribe(res => {
      this.updateData();
     },
     err => {
      
         this.erreur="Impossible de supprimer cette filière.";
         console.error("erreur",err.message);
       
     });
    
    }
   
    retour(){
      this.router.navigate(['/administrationEcole'])
    }

  public updateData(){
    this.filiereService.getFiliere()
    .subscribe(data=>{
      this.filieres=data;
      this.dataSource.data=this.filieres;
    });;
  }




  
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}