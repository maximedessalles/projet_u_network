import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  goToContact(){
    this.router.navigate(['/contact']);
  }

  goToMentions(){
    this.router.navigate(['/mentionsLegales']);
  }
  goToConditions(){
    this.router.navigate(['/conditionsUtilisations']);
  }

  goToFAQ(){
    this.router.navigate(['/FAQ']);
  }
}
