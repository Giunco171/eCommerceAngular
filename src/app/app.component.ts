import { Component, ViewEncapsulation } from '@angular/core';
import { TokenService } from './Services/token.service';
import { AutenticazioneService } from './Services/autenticazione.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'eCommerceSneakersFrontEnd';
  flag: boolean = false;

  constructor(private tokenService: TokenService, public auth: AutenticazioneService, public router:Router) {}


  logOut(){
    this.auth.logout();
    this.flag=false;
  }

  logIn(){
    this.router.navigate(['/login']);
    this.flag=true;
  }

  registrati(){
    this.router.navigate(['/registrazione']);
    this.flag=true;
  }

  account(){
    this.router.navigate(['/utente']);
    this.flag=false;
  }
}
