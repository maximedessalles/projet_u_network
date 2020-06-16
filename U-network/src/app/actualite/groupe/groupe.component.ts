import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { AuthService } from 'src/app/auth.service';
import Groupe from 'src/app/models/groupe';
import { GroupeService } from 'src/app/groupe.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import User from 'src/app/models/User';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Actualite from 'src/app/models/actualite';
import { ActualiteService } from 'src/app/actualite.service';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css']
})
export class GroupeComponent implements OnInit {
  groupes: Groupe[];
  erreur = "";
  publications: Actualite[];
  public formatDate: string = "dd/MM/yyyy";
  id: string;
  public showForm: boolean = false;
  newPublication: Actualite = {
    corps: "",
    creator: "",
    createdOn: new Date(),
  };
  monGroupe: Groupe = {
    lb_groupe: "",
    creator: "",
    user: [""]
  };
  users: User[];
  leGroupe: Groupe = {
    lb_groupe: "",
    creator: "",
  };
  monUser: User;
  usersGroupe: User[];
  userActualiteCreator: User;
  constructor(private userService: UserService, private actualiteService: ActualiteService, private authService: AuthService, private modalService: NgbModal, private groupeService: GroupeService, private route: ActivatedRoute, private cdr: ChangeDetectorRef, private router: Router, ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.monUser = this.authService.getUserLogged();
    this.groupeService.getGroupeByIdUser(this.id)
      .subscribe(data => {
        this.groupes = data;
        if (this.groupes.length > 0) {
          this.leGroupe = this.groupes[0];

        }

        this.userService.getAllUsersForAnnuaire()
          .subscribe(data => {
            this.users = data;
            this.updateData();
          });
      });



  }
  isActiv(groupe: Groupe) {
    if (groupe = this.leGroupe) {
      return true;
    }
  }

  getUserCreator(idUser: string): any {
    this.userService.getUserById(idUser)
      .subscribe(data => {

        this.userActualiteCreator = data;
        return this.userActualiteCreator.name + " " + this.userActualiteCreator.firstName;
      });

  }

  addPublication() {
    this.newPublication.groupeId = this.leGroupe._id;
    this.newPublication.creator = this.authService.getIdUserLogged();
    this.actualiteService.creerActualite(this.newPublication).subscribe();
    this.showForm = false;
    this.newPublication.corps = "";
    this.updateData();
  }
  isCreator(id: string) {
    if (id == this.leGroupe.creator) {
      return true;
    } else {
      return false;
    }
  }

  likeActu(publication: Actualite) {
    let id = publication["_id"]
    if (publication.like.indexOf(this.monUser._id) != -1) {
      var index = publication.like.indexOf(this.monUser._id);
      publication.like.splice(index, 1)
    } else {
      publication.like.push(this.monUser._id)
    }
    this.actualiteService.updateActualite(id, publication)
      .subscribe(res => {
        this.updateData()
        this.erreur = ""
      },
        err => {
          this.erreur = "Impossible de liker cette actualité.";
          console.error("erreur", err.message);
        })
  }

  commentActu(publication: Actualite, message: any) {
    let id = publication["_id"]
    let comment = {
      content: message.value,
      creator: this.monUser._id,
      date: new Date()
    }
    publication.comments.push(comment)
    this.actualiteService.updateActualite(id, publication)
      .subscribe(res => {
        this.erreur = ""
        this.updateData();
      },
        err => {
          this.erreur = "Impossible de liker cette actualité.";
          console.error("erreur", err.message);
        })
  }
  isUserLoggedGroupCreator(groupe: Groupe) {
    var id = this.authService.getIdUserLogged();
    if (id == groupe.creator) {
      return true;
    } else {
      return false;
    }
  }
  isUserLoggedCreator() {
    var id = this.authService.getIdUserLogged();
    if (id == this.leGroupe.creator) {
      return true;
    } else {
      return false;
    }
  }
  creerGroupe() {
    this.monGroupe.creator = this.id;
    this.monGroupe.user[0] = (this.id);
    this.groupeService
      .creerGroupe(this.monGroupe)
      .subscribe(data => {
        this.leGroupe = data;
        this.updateData();
      });
  }

  afficher(groupe: Groupe) {
    this.leGroupe = groupe;
    this.usersGroupe = [];
    for (var user of groupe.user) {
      this.userService.getUserById(user)
        .subscribe(data => {
          this.usersGroupe.unshift(data);

        });
    }

  }



  deleteUserFromGroupe(user: User) {
    var index = this.leGroupe.user.indexOf(user._id);
    this.leGroupe.user.splice(index, 1);
    this.groupeService.updateGroupe(this.leGroupe, this.leGroupe._id).subscribe(res => {
      this.updateData();
    },
      err => {
        this.erreur = "Impossible de supprimer ce groupe.";

      });
  }

  deleteGroupe(groupe: Groupe) {
    this.groupeService.deleteGroupe(groupe._id).subscribe(res => {
      this.leGroupe.lb_groupe = "";
      this.usersGroupe = [];
      this.updateData();
    },
      err => {
        this.erreur = "Impossible de supprimer cette formation.";

      });
  }
  updateData() {
    this.usersGroupe = [];
    this.groupes = [];
    this.groupeService.getGroupeByIdUser(this.id)
      .subscribe(data => {
        this.groupes = data;
        this.actualiteService.getActualiteForGroupe(this.leGroupe._id).subscribe(data => {
          this.publications = data;
        });
        console.log(this.leGroupe.user);
        for (var user of this.leGroupe.user) {

          this.userService.getUserById(user)
            .subscribe(data => {
              this.usersGroupe.unshift(data);
              this.cdr.detectChanges();
            });
        }

      });
  }

  goToProfile(user: User) {
    const id = user._id;
    this.router.navigate(['/profile/' + id]);
  }
















  //MODAL
  displayedColumns2: string[] = ['select', 'name', 'firstName'];
  closeResult: string;
  dataSource2: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<User>(true, []);
  userToAdd: User[];
  open(content) {
    this.userToAdd = [];
    for (var user of this.users) {
      var index = this.leGroupe.user.indexOf(user._id);
      if (index == -1) {
        this.userToAdd.push(user);
      }
    }
    this.dataSource2 = new MatTableDataSource();
    this.dataSource2.data = this.userToAdd;

    this.selection.clear();



    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
      return `with: ${reason}`;
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
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row._id + 1}`;
  }
  closeModal(selectedOptions) {

    for (var maSelection of selectedOptions) {
      this.leGroupe.user.push(maSelection._id);
    }

    this.groupeService.updateGroupe(this.leGroupe, this.leGroupe._id).subscribe(res => {
      this.updateData();
    },
      err => {
        this.erreur = "Impossible de supprimer cette formation.";
        console.error("erreur", err.message);
      });
  }




}
