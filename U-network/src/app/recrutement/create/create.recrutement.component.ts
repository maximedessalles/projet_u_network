import { Component, OnInit, NgModule } from '@angular/core';
import Recrutement from "../../models/recrutement";
import { RecrutementService } from "../../recrutement.service";
import Filiere from 'src/app/models/filiere';
import { filiereService } from 'src/app/filiere.service';
import { AuthService} from 'src/app/auth.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-recrutement',
    templateUrl: './create.recrutement.component.html',
    styleUrls: ['./create.recrutement.component.css']
})
export class CreateRecrutementComponent implements OnInit {
    filieres: Filiere[];
    newRecrutement: Recrutement = {
        lb_recrutement: "",
        filiere: "",
        typeContrat: "",
        longDescription: "",
        lieu: "",
    };
    constructor(private router:Router,private recrutementService: RecrutementService, private filiereService: filiereService, private userService: AuthService) { }

    ngOnInit() {
        let myuser = this.userService.getUserLogged()
        this.newRecrutement.user = myuser._id
        this.filiereService.getFiliere()
            .subscribe(data => {
                this.filieres = data;
            });;
    }

    public addRecrutement() {
        console.log(this.newRecrutement)
        this.recrutementService.add(this.newRecrutement)
            .subscribe(data => {
                this.router.navigate(['/recrutement']);
            });
           
    }

}
