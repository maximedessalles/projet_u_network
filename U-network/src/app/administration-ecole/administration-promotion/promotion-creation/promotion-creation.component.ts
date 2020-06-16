import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PromotionService } from 'src/app/promotion.service';
import promotion from 'src/app/models/promotion';


@Component({
  selector: 'app-promotion-creation',
  templateUrl: './promotion-creation.component.html',
  styleUrls: ['./promotion-creation.component.css']
})
export class promotionCreationComponent implements OnInit {
  erreur = "";
  mapromotion: promotion = {
    lb_promotion: ""
  };

  constructor(private router: Router, private promotionService: PromotionService) { }



  ngOnInit() {

  }

  retour() {
    this.router.navigate[('/administrationPromotion')];
  }

  creerPromotion() {
    if (this.mapromotion.lb_promotion == "" || this.mapromotion.lb_promotion == null) {
      this.erreur = "Le libellé ne peut pas être vide.";
      console.log("test", this.erreur);
    } else {
      this.promotionService
        .creerPromotion(this.mapromotion)
        .subscribe(data => this.handleSuccess(data), error => this.handleError(error));
    }
  }

  handleSuccess(data) {
    console.log('Createpromotion', data);
    this.router.navigate(['/administrationPromotion']);
  }

  handleError(error) {
    console.error('Erreur', error);
  }

}
