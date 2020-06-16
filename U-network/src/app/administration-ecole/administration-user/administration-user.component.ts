import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { PromotionService } from 'src/app/promotion.service';
import { UserService } from 'src/app/user.service';
import Promotion from 'src/app/models/promotion';
import User from 'src/app/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormationService } from 'src/app/formation.service';
import Formation from 'src/app/models/Formation';
import Filiere from 'src/app/models/filiere';
import { filiereService } from 'src/app/filiere.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { AuthService } from 'src/app/auth.service';
import { MatSnackBar } from '@angular/material';
import { promotionCreationComponent } from '../administration-promotion/promotion-creation/promotion-creation.component';
import { SelectionModel } from '@angular/cdk/collections';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { SnackBarComponent } from 'src/app/snackbar/snackbar.component';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-administration-user',
  templateUrl: './administration-user.component.html',
  styleUrls: ['./administration-user.component.css']
})
export class AdministrationUserComponent implements OnInit {
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['name', 'firstName', 'email', 'deleteFromFormation', 'update', 'delete'];


  constructor(private authService:AuthService,private _snackBar: MatSnackBar, public dialog: MatDialog, private router: Router, private cdr: ChangeDetectorRef, private formationService: FormationService, private filiereService: filiereService, private promotionService: PromotionService, private userService: UserService) { }
  options = {
    fieldSeparator: ';',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    headers: ["Nom", "Prenom", "Email", "Telephone", "Libelle poste", "Entreprise", "Salaire"],
    showTitle: false,
    title: 'ExportEtudiant',
    useBom: false,
    removeNewLines: true,
    keys: ['name', 'FirstName', 'email']
  };
  users: User[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  monUser: User;
  erreur = "";
  exportToCsv = [];
  user:User;
  affichageAllUsers: boolean;
  maPromotion: Promotion = {
    lb_promotion: "",
    _id: ""
  };
  maFormation: Formation = {
    lb_formation: "",
    _id: ""
  };
  formations: Formation[];
  promotions: Promotion[];
  filieres: Filiere[];

  exportCsv() {
    var nameFile = this.maFormation.lb_formation + " - " + this.maPromotion.lb_promotion;
    for (let data of this.dataSource.data) {
      if (data.experience.length > 0) {
        this.exportToCsv.push({
          "name": data.name,
          "firstName": data.firstName,
          "email": data.email,
          "telephone": data.telephone,
          "lb_poste": data.experience[data.experience.length - 1].libelle_poste,
          "lastEntreprise": data.experience[data.experience.length - 1].entreprise,
          "lastSalaire": data.experience[data.experience.length - 1].salaire

        })


      } else {
        this.exportToCsv.push({
          "name": data.name,
          "firstName": data.firstName,
          "email": data.email,
          "telephone": data.telephone,
          "lb_poste": "",
          "lastEntreprise": "",
          "lastSalaire": ""
        })
      }
    }
    console.log(this.exportToCsv);
    new Angular5Csv(this.exportToCsv, nameFile, this.options);
  }



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
        this.maPromotion._id = this.promotions[0]._id;
        this.maPromotion.lb_promotion = this.promotions[0].lb_promotion;

        this.formationService.getFormation()
          .subscribe(data => {
            this.formations = data;
            this.maFormation._id = this.formations[0]._id;
            this.maFormation.lb_formation = this.formations[0].lb_formation;
            this.userService.getUsersFiltre(this.maFormation._id, this.maPromotion._id)
              .subscribe(data => {
                this.users = data;
                this.dataSource.data = this.users;
              });
          });;

      });;

    this.filiereService.getFiliere()
      .subscribe(data => {
        this.filieres = data;
      });;


    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  afficherAllUsers() {
    this.displayedColumns = ['name', 'firstName', 'email', 'update', 'delete'];
    this.affichageAllUsers = false;
    this.userService.getAllUsersForAnnuaire()
      .subscribe(data => {
        this.users = data;
        this.dataSource.data = this.users;
        console.log(this.dataSource.data);
        this.cdr.detectChanges();
      });

  }

  openDialogUpdate() {
    this.dialog.open(modalUpdate, {
      data: {
        user: this.monUser
      }
    });
  }

  openDialogAddUserFormation() {
    this.dialog.open(modalInsertUserFormation, {
      height: '700px',
      width: '600px',
      data: {
        formation: this.maFormation,
        promotion: this.maPromotion
      }
    });
  }

  openDialogInsert() {
    this.dialog.open(modalInsert, {
      width: '600px',
      data: {

      }
    });
  }

  updateUser(user: User) {
    this.monUser = user;
    console.log(this.monUser);
    this.openDialogUpdate();
  }

  createUser() {
    this.openDialogInsert();
  }

  addUserFormation() {
    this.openDialogAddUserFormation();
  }

  checkFormation(filiere: Filiere, formation: Formation) {
    var found = filiere.formation.find(function (element) {
      return element == formation._id;
    });
    if (found) {
      return true;
    } else {
      return false;
    }
  }

  filter() {
    this.displayedColumns = ['name', 'firstName', 'email', 'deleteFromFormation', 'update', 'delete'];
    this.affichageAllUsers = true;
    console.log(this.maFormation._id + " " + this.maPromotion._id);
    this.userService.getUsersFiltre(this.maFormation._id, this.maPromotion._id)
      .subscribe(data => {
        this.users = data;
        this.dataSource.data = this.users;
        this.cdr.detectChanges();
        console.log(this.dataSource.data);
      });
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
        case 'email': return compare(a.email, b.email, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'firstName': return compare(a.firstName, b.firstName, isAsc);
        default: return 0;
      }
    });
  }

  changeListener(files: FileList): void {
    if (files && files.length > 0) {
      let file: File = files.item(0);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv: string = reader.result as string;
        console.log(reader.result[0]);
      }
    }
  }



  redirectToDeleteFormation(id: string) {
    this.userService.getUserById(id).subscribe(data => {
      this.monUser = data;
      var idFiliere;
      this.filiereService.getFiliereByIdFormation(this.maFormation._id).subscribe(data => {
        idFiliere = data[0]._id;
      })
      var i = this.monUser.etude.indexOf({
        promotion: this.maPromotion._id,
        formation: this.maFormation._id,
        filiere: idFiliere
      });
      if (i != -1) {
        this.monUser.etude.splice(i, 1);
        this.userService.updateUser(this.monUser, this.monUser._id).subscribe(data => {
          this._snackBar.openFromComponent(SnackBarComponent, {
            duration: 3000,
            verticalPosition: 'top',
            data: { msg: "Profil mis à jour" }
          });
        });
      }
      console.log(i);
    })
  }




  public redirectToDelete = (id: string) => {
    this.userService.deleteUser(id).subscribe(res => {
      this.updateData();
    },
      err => {

        this.erreur = "Impossible de supprimer cet utilisateur.";
        console.error("erreur", err.message);

      });

  }

  retour() {
    this.router.navigate(['/administrationEcole'])
  }
  public updateData() {
    this.userService.getUsersFiltre(this.maFormation._id,this.maPromotion._id)
      .subscribe(data => {
        this.users = data;
        this.dataSource.data = this.users;
      });;
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}






















@Component({
  selector: 'modalUpdate',
  templateUrl: 'modalUpdate.html',
  styleUrls: ['./administration-user.component.css']
})
export class modalUpdate {
  erreur: string = "";
  user: User;
  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialog, private userService: UserService, private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }
  ngOnInit() {
    this.user = this.data["user"];

  }

  closeModal() {

    this.userService.updateUser(this.user,this.user._id).subscribe(data=>{
      this._snackBar.openFromComponent(SnackBarComponent, {
        duration: 3000,
        verticalPosition: 'top',
        data: { msg: "Profil mis à jour" }
      });
    });


  }
}






@Component({
  selector: 'modalInsert',
  templateUrl: 'modalInsert.html',
})
export class modalInsert {
  formations: Formation[];
  erreurMail = "";
  userMail: string[];
  promotions: Promotion[];
  filieres: Filiere[];
  maFiliere: Filiere = {
    lb_filiere: ""
  }
  maFormation: string;
  maPromotion: string;
  erreur: string = "";
  user: User = {
    email: "",
    name: "",
    firstName: "",
    civilite: "Madame",
    isMailValid: false,
    isRGPDAcceptedLogin: false,
    isRGPDAcceptedRegister: false,
    etude: [{
      promotion: "",
      formation: "",
      filiere: "",
    }],
    forcePasswordChange: true
  }

  checkFormation(filiere: Filiere, formation: Formation) {
    var found = filiere.formation.find(function (element) {
      return element == formation._id;
    });
    if (found) {
      return true;
    } else {
      return false;
    }
  }

  constructor(private formationService: FormationService, private promotionService: PromotionService, private filiereService: filiereService, @Inject(MAT_DIALOG_DATA) public data: MatDialog, private userService: UserService, private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }
  ngOnInit() {
    this.formationService.getFormation()
      .subscribe(data => {
        this.formations = data;
      });
    this.userService.getAllMails().subscribe(data => {
      this.userMail = data;
    });
    this.promotionService.getPromotion()
      .subscribe(data => {
        this.promotions = data;
      });

    this.filiereService.getFiliere()
      .subscribe(data => {
        this.filieres = data;
      });
  }


  checkEmail() {
    for (let i = 0; i < this.userMail.length; i++) {
      if (this.userMail[i]["email"] == this.user.email) {
        this.erreurMail = "Ce mail est déjà utilisé";
      } else {
        this.erreurMail = "";
      }
    }
  }
  creerUser() {
    this.erreur = "";
    var result = true;
    if (!this.user.email.match(/[\w.-]+@[\w.-]+\.[a-z]{2,6}/)) {
      this.erreur = "<li>L'adresse mail n'est pas valide</li>";
      result = false;
    }

    let r = Math.random().toString(36).substring(1) + "13579&";
    console.log("r", r);
    if (result) {
      this.user.password = r;

      if (this.maFormation == undefined) {
        this.user.etude.splice(0, 1);
        this.userService
          .register(this.user)
          .subscribe(data => console.log(data), error => console.log(error));
      } else {
        this.filiereService.getFiliereByIdFormation(this.maFormation)
          .subscribe(data => {
            this.maFiliere._id = data[0]._id;
            this.maFiliere.formation = data[0].formation;
            this.maFiliere.lb_filiere = data[0].lb_filiere;
            this.user.etude[0].filiere = this.maFiliere._id;
            this.user.etude[0].formation = this.maFormation;
            this.user.etude[0].promotion = this.maPromotion;
            this.userService
              .register(this.user)
              .subscribe(data => console.log(data), error => console.log(error));
          });
      }




    }
  }
}







@Component({
  selector: 'modalInsertUserFormation',
  templateUrl: 'modalInsertUserFormation.html',
  styleUrls: ['./administration-user.component.css']
})
export class modalInsertUserFormation {
  users: User[];
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['select', 'name', 'firstName'];
  selection = new SelectionModel<User>(true, []);
  maPromotion: Promotion;
  maFormation: Formation;
  maFiliere: Filiere = {
    lb_filiere: "",
    _id: ""
  }
  user: User;
  constructor(private formationService: FormationService, private promotionService: PromotionService, private filiereService: filiereService, @Inject(MAT_DIALOG_DATA) public data: MatDialog, private userService: UserService, private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }
  ngOnInit() {
    this.maFormation = this.data["formation"];
    this.maPromotion = this.data["promotion"];
    this.dataSource = new MatTableDataSource();
    this.userService.getUsersWithoutEtude(this.maPromotion._id, this.maFormation._id)
      .subscribe(data => {
        this.users = data;
        this.dataSource.data = this.users;
      });

    this.filiereService.getFiliereByIdFormation(this.maFormation._id).subscribe(data => {
      this.maFiliere._id = data[0]._id;
      this.maFiliere.formation = data[0].formation;
      this.maFiliere.lb_filiere = data[0].lb_filiere;
    });
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
        case 'name': return compare(a.name, b.name, isAsc);
        case 'firstName': return compare(a.firstName, b.firstName, isAsc);
        default: return 0;
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row._id + 1}`;
  }


  closeModal(selectedOptions) {

    for (var maSelection of selectedOptions) {
      this.userService.getUserById(maSelection._id).subscribe(data => {
        this.user = data;
        this.user.etude.push({
          formation: this.maFormation._id,
          promotion: this.maPromotion._id,
          filiere: this.maFiliere._id
        });
        this.userService.updateUser(this.user, this.user._id).subscribe();
      });
    }


  }




}
