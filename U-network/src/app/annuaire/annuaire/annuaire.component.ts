import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import User from 'src/app/models/User';
import Filiere from 'src/app/models/filiere';
import Formation from 'src/app/models/Formation';
import { FormationService } from 'src/app/formation.service';
import { filiereService } from 'src/app/filiere.service';
import Promotion from 'src/app/models/promotion';
import { PromotionService } from 'src/app/promotion.service';


@Component({
    selector: 'app-annuaire',
    templateUrl: './annuaire.component.html',
    styleUrls: ['./annuaire.component.css']
})
export class AnnuaireComponent implements OnInit {
    users: User[];
    filieres: Filiere[];
    formations: Formation[];
    promotions: Promotion[];
    filter: {
        name: string;
    }
    formatedFilter: {
        $and: any
    };


    constructor(private userService: UserService, private router: Router, private formationService: FormationService, private filiereService: filiereService, private promotionService: PromotionService) { }

    ngOnInit() {
        this.filter = {
            name: "",
        }
        this.formatedFilter = {
            $and: []
        }
        this.userService.getAllUsersForAnnuaire()
            .subscribe(data => {
                this.users = data;
            });

        this.formationService.getFormation()
            .subscribe(data => {
                this.formations = data;
            });

        this.filiereService.getFiliere()
            .subscribe(data => {
                this.filieres = data;
            });

        this.promotionService.getPromotion()
            .subscribe(data => {
                this.promotions = data;
            });
    }

    find() {
        this.userService.getUsersWithFilter(this.filter)
            .subscribe(data => {
                this.users = data;
            });
        this.formatedFilter = {
            $and: []
        }
    }
    goToProfile(id:string){
        this.router.navigate(['/profile/'+id]);
    }
}

