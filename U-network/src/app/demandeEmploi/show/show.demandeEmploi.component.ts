import { Component, OnInit } from '@angular/core';
import Recrutement from "../../models/recrutement";
import { ActivatedRoute } from '@angular/router';
import {RecrutementService} from "../../recrutement.service";
import { DemandeEmploiComponent } from '../liste/demandeEmploi.component';
import { demandeEmploiService } from 'src/app/demande-emploi.service';
import demandeEmploi from 'src/app/models/demandeEmploi';
import { filiereService } from 'src/app/filiere.service';
import Filiere from 'src/app/models/filiere';

@Component({
  selector: 'app-show-demandeEmploi',
  templateUrl: './show.demandeEmploi.component.html',
  styleUrls: ['./show.demandeEmploi.component.css']
})
export class ShowDemandeEmploiComponent implements OnInit {
  offre:demandeEmploi;
  id : string;
  filieres:Filiere[];
  constructor(private route:ActivatedRoute, private demandeEmploiService: demandeEmploiService,private filiereService:filiereService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.demandeEmploiService.getDemande(this.id)
    .subscribe(data=>{
      this.offre=data;
    });

    this.filiereService.getFiliere().subscribe(data=>{
      this.filieres=data;
    });
  }

  public showModal: boolean = false;
  public item: demandeEmploi = {
      lb_demande: "Test",
      filiere: "CSIA",
      typeContrat: "CDI",
      smallDescription: "Ceci est un test",
      longDescription: "Description Test",
      lieu: "Lyon",
      emailContact: "test.test@test.de",
      createdOn: new Date(),
  }
}
