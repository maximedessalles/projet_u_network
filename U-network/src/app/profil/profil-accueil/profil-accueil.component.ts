import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import User from 'src/app/models/User';
import { UserService } from 'src/app/user.service';
import { RouterLinkActive, ActivatedRoute, Router } from '@angular/router';
import { FormationService } from 'src/app/formation.service';
import { PromotionService } from 'src/app/promotion.service';
import { filiereService } from 'src/app/filiere.service';
import Formation from 'src/app/models/Formation';
import Filiere from 'src/app/models/filiere';
import Promotion from 'src/app/models/promotion';
import { log } from 'util';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AuthService } from 'src/app/auth.service';
import { ActualiteService } from 'src/app/actualite.service';
import Actualite from 'src/app/models/actualite';

@Component({
  selector: 'app-profil-accueil',
  templateUrl: './profil-accueil.component.html',
  styleUrls: ['./profil-accueil.component.css']
})
export class ProfilAccueilComponent implements OnInit {
  erreur: string;
  userProfile: User;
  userLogged: User;
  promotions: Promotion[];
  formations: Formation[];
  id: string;
  closeResult: string;
  publications: Actualite[];
  constructor(private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router:Router,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formationService: FormationService,
    private promotionService: PromotionService,
    private filiereService: filiereService,
    private _adapter: DateAdapter<any>,
    private actualiteService: ActualiteService) { }


  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.userLogged = this.authService.getUserLogged();
    console.log("id ", this.id)
    this.userService.getUserById(this.id)
      .subscribe(data => {

        this.userProfile = data;
        console.log("data", this.userProfile);
        this.cdr.detectChanges();
      });
    this.formationService.getFormation()
      .subscribe(data => {
        this.formations = data;
      });;

    this.promotionService.getPromotion()
      .subscribe(data => {
        this.promotions = data;
      });;

    this.actualiteService.getActualiteForUser(this.id)
      .subscribe(data => {
        this.publications = data;
        console.log(this.publications);
        this.cdr.detectChanges();
      });

  }

  goUpdate(){
    this.router.navigate(['editProfile/'+this.id]);
  }
  isMyProfile(user: User, id: string): boolean {
    if (user._id == id) {
      return true;
    } else {
      return false;
    }
  }

  addFriend() {
    var idUserLogged = this.authService.getUserLogged()._id;
    console.log(idUserLogged);
    this.userService.getUserById(idUserLogged)
      .subscribe(data => {
        this.userLogged = data;
        this.cdr.detectChanges();
        this.userLogged.user_add.unshift(this.id);
        this.userProfile.user_wait.unshift(this.userLogged._id);
        console.log("userProfile", this.userProfile);

        this.userService.updateUser(this.userLogged, this.userLogged._id).subscribe(res => {
          this.erreur = "";
          this.userService.updateUser(this.userProfile, this.userProfile._id).subscribe(res => {
            this.erreur = "";
          },
            err => {
              this.erreur = "Impossible d'ajouter cette utilisateur en ami.";
              console.error("erreur", err.message);

            });
        },
          err => {
            this.erreur = "Impossible d'ajouter cette utilisateur en ami.";
            console.error("erreur", err.message);

          });

      });

  }



  //MODAL FORMATION
  lesFormations: Formation[];
  lesPromotions: Promotion[];
  idPromotionAjout: string;
  idFormationAjout: string;
  idFiliereAjout: string;
  open(content) {
    this.promotionService.getPromotion()
      .subscribe(data => {
        this.lesPromotions = data;
        console.log("lesPromotions", this.lesPromotions);
      });
    this.formationService.getFormation()
      .subscribe(data => {
        this.lesFormations = data;
      });
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

  closeModal(selectedOptions) {
    this.filiereService.getFiliereByIdFormation(this.idFormationAjout).subscribe(data => {
      console.log("data0", data[0]._id);
      this.idFiliereAjout = data[0]._id;
      this.userProfile.etude.push({
        promotion: this.idPromotionAjout,
        formation: this.idFormationAjout,
        filiere: this.idFiliereAjout
      });
      console.log("filiere", this.idFiliereAjout);
      console.log("userProfile", this.userProfile.etude);
      this.userService.updateUser(this.userProfile, this.userProfile._id).subscribe(res => {
        this.erreur = "";
      },
        err => {
          this.erreur = "Impossible de supprimer cette formation.";
          console.error("erreur", err.message);

        });
    });
  }

  //MODAL EXPERIENCE
  dateDebutExperience: Date;
  dateFinExperience: Date;
  description: string;
  lb_poste: string;
  nomEntreprise: string;
  salaire: string;
  openExperience(contentExperience) {


    this.modalService.open(contentExperience, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {


      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReasonExperience(reason)}`;
    });
  }

  private getDismissReasonExperience(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  closeModalExperience(selectedOptions) {
    this._adapter.setLocale('fr');
    const objet = {
      entreprise: this.nomEntreprise,
      dateDebut: this.dateDebutExperience,
      dateFin: this.dateFinExperience,
      libelle_poste: this.lb_poste,
      salaire: this.salaire,
      description: this.description
    };
    this.userProfile.experience.push(objet);

    console.log(this.userProfile.experience);
    this.userService.updateUser(this.userProfile, this.userProfile._id).subscribe(res => {
      this.erreur = "";
    },
      err => {
        this.erreur = "Impossible de supprimer cette formation.";
        console.error("erreur", err.message);

      });

  }


}
