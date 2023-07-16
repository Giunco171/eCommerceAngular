import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Angular Material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import { RegistrazioneComponent } from './Components/registrazione/registrazione.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';

//Forms
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

//Routing
import { RouterModule, Routes } from '@angular/router';
import { routes } from './app-routing.module';
import { HomeComponent } from './Components/home/home.component';

//HTTP
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdottoComponent } from './Components/prodotto/prodotto.component';
import { LoginComponent } from './Components/login/login.component';
import { UtenteComponent } from './Components/utente/utente.component';
import { CarrelloComponent } from './Components/carrello/carrello.component';
import { OrdiniComponent } from './Components/ordini/ordini.component';
import { RicercaComponent } from './Components/ricerca/ricerca.component';
import { RisultatiRicercaComponent } from './Components/risultati-ricerca/risultati-ricerca.component';
import { AdminComponent } from './Components/admin/admin.component';


@NgModule({
  declarations: [ 
    AppComponent, RegistrazioneComponent, HomeComponent, ProdottoComponent, LoginComponent, UtenteComponent, CarrelloComponent, OrdiniComponent, RicercaComponent, RisultatiRicercaComponent, AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //Angular Material
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatGridListModule,
    MatCardModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatPaginatorModule,
    //Routing
    RouterModule.forRoot(routes),
    //HTTP
    HttpClientModule,
    //FORMS
    ReactiveFormsModule,
    FormsModule,
    MatInputModule
  ],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}  //così i form di default sono belli
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
