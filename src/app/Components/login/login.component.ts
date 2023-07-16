import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormRegistrazioneDTO } from 'src/app/DTO/FormRegistrazioneDTO';
import { AutenticazioneService } from 'src/app/Services/autenticazione.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  min_length_password : number=5;
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('',[Validators.required, Validators.minLength(this.min_length_password)]);

  constructor(private auth : AutenticazioneService,  private router : Router){}

  getErrorMessage() {
    if (this.email.hasError('required')) { //required è il validatore
      return 'Devi inserire una mail';
    }

    return this.email.hasError('email') ? 'email non valida' : '';
  }

  getErrorMessagePassword(){
    if(this.password.hasError('required')){
      return 'Devi inserire una password';
    }

    return this.password.hasError('minlength') ? 'la password deve essere di almeno 5 caratteri' : '';
  }

  login(){
    this.auth.login(this.email.value || '', this.password.value || '');
    this.router.navigate(['/utente'])
  }
}
