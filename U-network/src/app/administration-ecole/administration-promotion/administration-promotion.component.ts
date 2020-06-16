import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PromotionService } from 'src/app/promotion.service';
import Promotion from 'src/app/models/promotion';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/auth.service';
import { SnackBarComponent } from 'src/app/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-administration-promotion',
  templateUrl: './administration-promotion.component.html',
  styleUrls: ['./administration-promotion.component.css']
})
export class AdministrationPromotionComponent implements OnInit {
  dataSource: MatTableDataSource<Promotion>;
  displayedColumns: string[] = [ 'lb_promotion', 'update', 'delete'];


  constructor(private _snackBar:MatSnackBar,private authService:AuthService,private router: Router, private promotionService: PromotionService) { }

  promotions: Promotion[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  erreur = "";
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
    this.promotionService.getPromotion()
      .subscribe(data => {
        this.promotions = data;
        this.dataSource.data = this.promotions;
      });;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  goTopromotionTab() {
    this.router.navigate(['/promotion']);
  }

  gotoCreation() {
    this.router.navigate(['/creationPromotion']);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: MatSort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a._id, b._id, isAsc);
        case 'name': return compare(a.lb_promotion, b.lb_promotion, isAsc);
        default: return 0;
      }
    });
  }

  public redirectToUpdate = (id: string) => {
    this.router.navigate(['/updatePromotion/' + id]);
  }

  public redirectToDelete = (id: string) => {
    console.log("id", id);
    this.promotionService.deletePromotion(id).subscribe(res => {
      this.updateData();
    },
      err => {

        this.erreur = "Impossible de supprimer cette filière.";
        console.error("erreur", err.message);

      });

  }

  retour() {
    this.router.navigate(['/administrationEcole'])
  }
  public updateData() {
    this.promotionService.getPromotion()
      .subscribe(data => {
        this.promotions = data;
        this.dataSource.data = this.promotions;
      });;
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}