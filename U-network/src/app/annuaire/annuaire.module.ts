import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilAnnuaireComponent } from './accueil-annuaire/accueil-annuaire.component';
import { AnnuaireComponent } from './annuaire/annuaire.component';

@NgModule({
  declarations: [AccueilAnnuaireComponent, AnnuaireComponent],
  imports: [
    CommonModule
  ]
})
export class AnnuaireModule { }
