import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProdottoComponent } from './Components/prodotto/prodotto.component';
import { RegistrazioneComponent } from './Components/registrazione/registrazione.component';
import { LoginComponent } from './Components/login/login.component';
import { UtenteComponent } from './Components/utente/utente.component';
import { CarrelloComponent } from './Components/carrello/carrello.component';
import { OrdiniComponent } from './Components/ordini/ordini.component';
import { RicercaComponent } from './Components/ricerca/ricerca.component';
import { RisultatiRicercaComponent } from './Components/risultati-ricerca/risultati-ricerca.component';
import { AdminComponent } from './Components/admin/admin.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige alla home
  { path: 'home', component: HomeComponent },
  { path: 'prodotto', component: ProdottoComponent},
  { path: 'registrazione', component: RegistrazioneComponent},
  { path: 'login', component: LoginComponent},
  { path: 'utente', component: UtenteComponent},
  { path: 'carrello', component: CarrelloComponent},
  { path: 'ordini', component: OrdiniComponent},
  { path: 'ricerca', component: RicercaComponent},
  { path: 'risultatiRicerca', component: RisultatiRicercaComponent},
  { path: 'admin', component: AdminComponent},
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
