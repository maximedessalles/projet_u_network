import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';


import { InscriptionComponent } from './login/inscription/inscription.component';
import { AuthComponent } from './login/auth/auth.component';
import { AnnuaireComponent } from './annuaire/annuaire/annuaire.component';
import { AccueilComponent } from './login/accueil/accueil.component';
import { RecrutementComponent } from './recrutement/liste/recrutement.component';
import { CreateRecrutementComponent } from './recrutement/create/create.recrutement.component';
import { ShowRecrutementComponent } from './recrutement/show/show.recrutement.component';
import { AdministrationEcoleComponent } from './administration-ecole/administration-ecole.component';
import { AdministrationFiliereComponent } from './administration-ecole/administration-filiere/administration-filiere.component';
import { AdministrationFormationComponent } from './administration-ecole/administration-formation/administration-formation.component';
import { AdministrationUserComponent } from './administration-ecole/administration-user/administration-user.component';
import { AdministrationPromotionComponent } from './administration-ecole/administration-promotion/administration-promotion.component';
import { FiliereCreationComponent } from './administration-ecole/administration-filiere/filiere-creation/filiere-creation.component';
import { FormationCreationComponent } from './administration-ecole/administration-formation/formation-creation/formation-creation.component';
import { FiliereUpdateComponent } from './administration-ecole/administration-filiere/filiere-update/filiere-update.component';
import { ProfilAccueilComponent } from './profil/profil-accueil/profil-accueil.component';
import { FormationUpdateComponent } from './administration-ecole/administration-formation/formation-update/formation-update.component';
import { PromotionUpdateComponent } from './administration-ecole/administration-promotion/promotion-update/promotion-update.component';
import { promotionCreationComponent } from './administration-ecole/administration-promotion/promotion-creation/promotion-creation.component';
import { ActualiteComponent } from './actualite/fil-actualite/actualite.component';
import { GroupeComponent } from './actualite/groupe/groupe.component';
import { ContactComponent } from './generic/contact/contact.component';
import { ProfilUpdateComponent } from './profil/profil-update/profil-update.component';
import { ShowDemandeEmploiComponent } from './demandeEmploi/show/show.demandeEmploi.component';
import { CreateDemandeEmploiComponent } from './demandeEmploi/create/create.demandeEmploi.component';
import { DemandeEmploiComponent } from './demandeEmploi/liste/demandeEmploi.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
import { CharteRGPDComponent } from './charte-rgpd/charte-rgpd.component';
import { FAQComponent } from './faq/faq.component';
import { ConditionsUitlisationsComponent } from './conditions-uitlisations/conditions-uitlisations.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: "login", component: AuthComponent },
  { path: "inscription", component: InscriptionComponent },
  { path: "annuaire", component: AnnuaireComponent },
  { path: "contact", component: ContactComponent},

  { path: "groupe/:id", component: GroupeComponent, canActivate: [AuthGuard] },
  { path: "recrutement", component: RecrutementComponent, canActivate: [AuthGuard] },
  { path: "demandeEmploi", component: DemandeEmploiComponent, canActivate: [AuthGuard] },
  { path: "createRecrutement", component: CreateRecrutementComponent, canActivate: [AuthGuard] },
  { path: "createDemande", component: CreateDemandeEmploiComponent, canActivate: [AuthGuard] },
  { path: "showRecrutement/:id", component: ShowRecrutementComponent, canActivate: [AuthGuard] },
  { path: "showDemande/:id", component: ShowDemandeEmploiComponent, canActivate: [AuthGuard] },
  { path: "administrationEcole", component: AdministrationEcoleComponent, canActivate: [AuthGuard] },
  { path: "administrationFiliere", component: AdministrationFiliereComponent, canActivate: [AuthGuard] },
  { path: "administrationPromotion", component: AdministrationPromotionComponent, canActivate: [AuthGuard] },
  { path: "administrationUser", component: AdministrationUserComponent, canActivate: [AuthGuard] },
  { path: "administrationFormation", component: AdministrationFormationComponent, canActivate: [AuthGuard] },
  { path: "creationFiliere", component: FiliereCreationComponent, canActivate: [AuthGuard] },
  { path: "creationFormation", component: FormationCreationComponent, canActivate: [AuthGuard] },
  { path: "creationPromotion", component: promotionCreationComponent, canActivate: [AuthGuard] },
  { path: "updateFiliere/:id", component: FiliereUpdateComponent, canActivate: [AuthGuard] },
  { path: "updateFormation/:id", component: FormationUpdateComponent, canActivate: [AuthGuard] },
  { path: "updatePromotion/:id", component: PromotionUpdateComponent, canActivate: [AuthGuard] },
  { path: "profile/:id", component: ProfilAccueilComponent, canActivate: [AuthGuard] },
  { path: "actualite", component: ActualiteComponent, canActivate: [AuthGuard] },
  { path: "editProfile/:id",component:ProfilUpdateComponent,canActivate:[AuthGuard]},
  { path: "mentionsLegales",component:MentionsLegalesComponent},
  { path: "RGPD",component:CharteRGPDComponent},
  { path: "FAQ",component:FAQComponent},
  { path: "conditionsUtilisations",component:ConditionsUitlisationsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})






export class AppRoutingModule { }
