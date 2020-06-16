import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddCookieInterceptor } from './add-cookie.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './generic/header/header.component';
import { FooterComponent } from './generic/footer/footer.component';
import {InscriptionComponent} from './login/inscription/inscription.component';
import {MaterialModule} from './material.module';
import {AuthComponent,ModalRGPD,passwordChangeModal} from'./login/auth/auth.component';
import {AnnuaireComponent} from './annuaire/annuaire/annuaire.component';
import {AccueilAnnuaireComponent} from './annuaire/accueil-annuaire/accueil-annuaire.component';
import { AccueilComponent } from './login/accueil/accueil.component';
import { RecrutementComponent } from './recrutement/liste/recrutement.component';
import { ShowRecrutementComponent } from './recrutement/show/show.recrutement.component';
import { CreateRecrutementComponent } from './recrutement/create/create.recrutement.component';
import { AdministrationEcoleComponent } from './administration-ecole/administration-ecole.component';
import { AdministrationPromotionComponent } from './administration-ecole/administration-promotion/administration-promotion.component';
import { AdministrationFiliereComponent } from './administration-ecole/administration-filiere/administration-filiere.component';
import { AdministrationFormationComponent } from './administration-ecole/administration-formation/administration-formation.component';
import { FiliereCreationComponent } from './administration-ecole/administration-filiere/filiere-creation/filiere-creation.component';
import { FormationCreationComponent } from './administration-ecole/administration-formation/formation-creation/formation-creation.component';
import { FiliereUpdateComponent } from './administration-ecole/administration-filiere/filiere-update/filiere-update.component';
import { FormationUpdateComponent } from './administration-ecole/administration-formation/formation-update/formation-update.component';
import { ProfilAccueilComponent } from './profil/profil-accueil/profil-accueil.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ActualiteComponent } from './actualite/fil-actualite/actualite.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { promotionCreationComponent } from './administration-ecole/administration-promotion/promotion-creation/promotion-creation.component';
import {PromotionUpdateComponent} from './administration-ecole/administration-promotion/promotion-update/promotion-update.component';
import {GroupeComponent} from './actualite/groupe/groupe.component';
import {AdministrationUserComponent,modalUpdate, modalInsert,modalInsertUserFormation} from './administration-ecole/administration-user/administration-user.component';
import { ContactComponent } from './generic/contact/contact.component';
import { DemandeEmploiComponent } from './demandeEmploi/liste/demandeEmploi.component';
import { CreateDemandeEmploiComponent } from './demandeEmploi/create/create.demandeEmploi.component';
import { ShowDemandeEmploiComponent } from './demandeEmploi/show/show.demandeEmploi.component';
import { ProfilUpdateComponent } from './profil/profil-update/profil-update.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
import { FAQComponent } from './faq/faq.component';
import { ConditionalExpr } from '@angular/compiler';
import { ConditionsUitlisationsComponent } from './conditions-uitlisations/conditions-uitlisations.component';
import { CharteRGPDComponent } from './charte-rgpd/charte-rgpd.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InscriptionComponent,
    AuthComponent,
    AnnuaireComponent,
    AccueilComponent,
    RecrutementComponent,
    ShowRecrutementComponent,
    CreateRecrutementComponent,
    AdministrationEcoleComponent,
    AdministrationFiliereComponent,
    FiliereCreationComponent,
    FiliereUpdateComponent,
    ProfilAccueilComponent,
    AccueilAnnuaireComponent,
    AdministrationFormationComponent,
    FormationCreationComponent,
    FormationUpdateComponent,
    AdministrationPromotionComponent,
    promotionCreationComponent,
    ActualiteComponent,
    PromotionUpdateComponent,
    AdministrationUserComponent,
    GroupeComponent,
    ModalRGPD,
    modalUpdate,
    modalInsert,
    passwordChangeModal,
    modalInsertUserFormation,
    ContactComponent,
    DemandeEmploiComponent,
    CreateDemandeEmploiComponent,
    ShowDemandeEmploiComponent,
    ProfilUpdateComponent,
    MentionsLegalesComponent,
    ConditionsUitlisationsComponent,
    FAQComponent,
   CharteRGPDComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    InfiniteScrollModule,
    NgbModule

  ],
  entryComponents: [AuthComponent, ModalRGPD,modalUpdate,modalInsert,passwordChangeModal,modalInsertUserFormation],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddCookieInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
