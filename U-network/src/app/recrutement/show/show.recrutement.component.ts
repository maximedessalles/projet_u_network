import { Component, OnInit } from '@angular/core';
import Recrutement from "../../models/recrutement";
import { ActivatedRoute } from '@angular/router';
import {RecrutementService} from "../../recrutement.service";
import Filiere from 'src/app/models/filiere';
import { filiereService } from 'src/app/filiere.service';

@Component({
  selector: 'app-show-recrutement',
  templateUrl: './show.recrutement.component.html',
  styleUrls: ['./show.recrutement.component.css']
})
export class ShowRecrutementComponent implements OnInit {
  offre:Recrutement;
  id : string;
  filieres:Filiere[]
  constructor(private route:ActivatedRoute, private recrutementService: RecrutementService,private filiereService:filiereService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.recrutementService.getRecrutement(this.id)
    .subscribe(data=>{
      this.offre=data;
    });
    this.filiereService.getFiliere().subscribe(data=>{
      this.filieres=data;
    });
  }

  public showModal: boolean = false;
  public item: Recrutement = {
      lb_recrutement: "Test",
      filiere: "CSIA",
      typeContrat: "CDI",
      smallDescription: "Ceci est un test",
      longDescription: "Description Test",
      lieu: "Lyon",
      emailContact: "test.test@test.de",
      createdOn: new Date(),
  }
}
