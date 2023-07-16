import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticazioneService } from 'src/app/Services/autenticazione.service';

@Component({
  selector: 'app-utente',
  templateUrl: './utente.component.html',
  styleUrls: ['./utente.component.css']
})
export class UtenteComponent {

  constructor(private auth:AutenticazioneService, private router:Router){}


  getNome(){
    return this.auth.getUsername();
  }

  isAdmin(){
    return this.auth.getRole();
  }

  getCognome()
  {
    return this.getNome(); //TODO
  }

  goToCarrello()
  {
    this.router.navigate(['/carrello']);
  }
  goToOrdini()
  {
    this.router.navigate(['/ordini']);
  }
  goToAdmin()
  {
    this.router.navigate(["/admin"]);
  }
}
