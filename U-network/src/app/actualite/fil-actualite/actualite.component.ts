import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import Publication from '../../models/actualite';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { ActualiteService } from 'src/app/actualite.service';
import { UserService } from 'src/app/user.service';
import Evenement from 'src/app/models/evenement';
import { EvenementService } from 'src/app/evenement.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css']
})
export class ActualiteComponent {
  constructor(private modalService:NgbModal,private evenementService:EvenementService,private userService: UserService, private cdr: ChangeDetectorRef, private authService: AuthService, private actualiteService: ActualiteService, private router: Router) { }
  public monUser: User;
  public newPublication: Publication;
  publications: Publication[];
  public typePj: string = "";
  evenements : Evenement[];
  public showForm: boolean = false;
  public formatDate: string = "dd/MM/yyyy";
  public erreur: string;
  closeResult: string;
  users: User[];
  ngOnInit() {
    this.monUser = this.authService.getUserLogged();
    console.log(this.monUser);
    this.newPublication = {
      corps: "",
      creator: "",
      createdOn: new Date(),
    };
    this.userService.getAllUsersForAnnuaire().subscribe(data => {
      this.users = data;
    })
    this.evenementService.getEvenement().subscribe(data=>{
      this.evenements=data;
    });
    this.updateData();
  }

  updateData() {
    this.actualiteService.getActualite().subscribe(data => {
      this.publications = data;
    });
    this.evenementService.getEvenement().subscribe(data=>{
      this.evenements=data;
    });
  }


  goToGroup() {
    var id = this.authService.getIdUserLogged();
    this.router.navigate(['/groupe/' + id])
  }

  addPublication() {
    this.newPublication.creator = this.monUser._id;
    this.actualiteService.creerActualite(this.newPublication).subscribe(data => {
      this.publications.unshift(this.newPublication);
      this.cdr.detectChanges();
      this.showForm = false;
    });

  }

  likeActu(publication: Publication) {
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

  commentActu(publication: Publication, message: any) {
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

  

  participer(event:Evenement){
    event.participants.push(this.authService.getIdUserLogged());
    this.evenementService.updateEvenement(event).subscribe(data=>{

    });
  }

  regarderParticipant(event:Evenement){
    if(event.participants.indexOf(this.authService.getIdUserLogged())!=-1){
      return false;
    }else{
      return true;
    }
  }























  //MODAL Evenement

  evenement:Evenement={
    corps:"",
    createdOn:new Date(),
    titre:"",
    creator:this.authService.getIdUserLogged(),
    participants:[this.authService.getIdUserLogged()],
    date:new Date(),
    lieu:""
    }
  open(content) {
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
    this.evenementService.creerEvenement(this.evenement).subscribe(data=>{
      this.cdr.detectChanges();
      this.updateData();
    })
  }
}

