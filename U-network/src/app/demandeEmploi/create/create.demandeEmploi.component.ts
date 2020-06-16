import { Component, OnInit, NgModule } from '@angular/core';
import demandeEmploi from "../../models/demandeEmploi";
import { demandeEmploiService } from "../../demande-emploi.service";
import Filiere from 'src/app/models/filiere';
import { filiereService } from 'src/app/filiere.service';
import { AuthService} from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-demandeEmploi',
    templateUrl: './create.demandeEmploi.component.html',
    styleUrls: ['./create.demandeEmploi.component.css']
})
export class CreateDemandeEmploiComponent implements OnInit {
    filieres: Filiere[];
    newDemande: demandeEmploi = {
        lb_demande: "",
        filiere: "",
        typeContrat: "",
        longDescription: "",
        lieu: "",
    };
    constructor(private router:Router,private demandeEmploiService: demandeEmploiService, private filiereService: filiereService, private userService: AuthService) { }

    ngOnInit() {
        let myuser = this.userService.getUserLogged()
        this.newDemande.user = myuser._id
        this.filiereService.getFiliere()
            .subscribe(data => {
                this.filieres = data;
                console.log(this.filieres);
            });
    }

    public addRecrutement() {
        console.log(this.newDemande)
        this.demandeEmploiService.add(this.newDemande)
            .subscribe(data => {
                
                this.router.navigate(['/demandeEmploi']);
            });
            
    }

}
