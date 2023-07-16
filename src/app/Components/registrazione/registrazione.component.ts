import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormRegistrazioneDTO } from 'src/app/DTO/FormRegistrazioneDTO';
import { AutenticazioneService } from 'src/app/Services/autenticazione.service';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent {
  min_length_password : number=5;
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('',[Validators.required, Validators.minLength(this.min_length_password)]);

  nome = new FormControl('', [Validators.required]);
  cognome = new FormControl('', [Validators.required]);

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

  getErrorMessageNome() {
    if (this.nome.hasError('required')) { //required è il validatore
      return 'Devi inserire un nome';
    }
    return '';
  }

  getErrorMessageCognome() {
    if (this.cognome.hasError('required')) { //required è il validatore
      return 'Devi inserire un cognome';
    }
    return '';
  }

  registra(){
    const formRegistrazioneDTO = new FormRegistrazioneDTO();
    formRegistrazioneDTO.nome = this.nome.value || ''; //se il valore è null dà una stringa vuota
    formRegistrazioneDTO.password = this.password.value || '';
    formRegistrazioneDTO.email = this.email.value || '';
    formRegistrazioneDTO.cognome = this.cognome.value || '';
    this.auth.register(formRegistrazioneDTO);
    this.router.navigate(['/login'])
  }
}
