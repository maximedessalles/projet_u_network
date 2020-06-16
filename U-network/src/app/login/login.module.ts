import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthComponent} from './auth/auth.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { InscriptionComponent } from './inscription/inscription.component';
import { AccueilComponent } from './accueil/accueil.component';

const routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'prefix'},
  { path: '', component: AuthComponent}
];

@NgModule({
  declarations: [AuthComponent, InscriptionComponent, AccueilComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],

})
export class LoginModule { }