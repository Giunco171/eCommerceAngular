import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdottoDTO } from 'src/app/DTO/ProdottoDTO';
import { AdminService } from 'src/app/Services/admin.service';
import { AutenticazioneService } from 'src/app/Services/autenticazione.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private admin : AdminService,  private router : Router, private auth:AutenticazioneService){}

  nome = new FormControl('', [Validators.required]);
  prezzo = new FormControl('200', [Validators.required,Validators.min(0),Validators.pattern(/^[0-9]+$/)]);
  qta = new FormControl('20', [Validators.required,Validators.min(0),Validators.pattern(/^[0-9]+$/)]);
  brand = new FormControl('', [Validators.required]);
  taglia = new FormControl('40', [Validators.required, Validators.min(0),Validators.pattern(/^[0-9]+$/)]);
  url = new FormControl('', [Validators.required]);


  ngOnInit(){
    if(! this.auth.getRole())
      this.router.navigate(['/home']);
  }

  getErrorMessageNome() {
    if(this.nome.hasError('required')) { //required è il validatore
      return 'Devi inserire un prezzo';
    }

    return "";
  }

  getErrorMessagePrezzo() {
    if (this.prezzo.hasError('min')) { //required è il validatore
      return 'Devi inserire un prezzo positivo';
    }
    if (this.prezzo.hasError('pattern')) { //required è il validatore
      return 'Devi inserire un prezzo';
    }
    if(this.prezzo.hasError('required')) { //required è il validatore
      return 'Devi inserire un prezzo';
    }

    return "";
  }

  getErrorMessagePrezzoQta() {
    if (this.qta.hasError('min')) { //required è il validatore
      return 'Devi inserire una quantità positiva';
    }
    if (this.qta.hasError('pattern')) { //required è il validatore
      return 'Devi inserire una quantità';
    }
    if(this.qta.hasError('required')) { //required è il validatore
      return 'Devi inserire una quantità';
    }

    return "";
  }

  getErrorMessageBrand() {
    if(this.brand.hasError('required')) { //required è il validatore
      return 'Devi inserire un brand';
    }

    return "";
  }

  getErrorMessageTaglia() {
    if (this.taglia.hasError('min')) { //required è il validatore
      return 'Devi inserire una taglia positivo';
    }
    if (this.taglia.hasError('pattern')) { //required è il validatore
      return 'Devi inserire una taglia';
    }
    if(this.taglia.hasError('required')) { //required è il validatore
      return 'Devi inserire una taglia';
    }
    return "";
  }

  getErrorMessageUrl() {
    if(this.url.hasError('required')) { //required è il validatore
      return 'Devi inserire un url';
    }

    return "";
  }

  caricaProdotto()
  {
    var prodotto=new ProdottoDTO();
    prodotto.nome=this.nome.value || '';
    prodotto.prezzo=Number(this.prezzo.value) || 200;
    prodotto.qta=Number(this.qta.value) || 20;
    prodotto.nomeBrand=this.brand.value || '';
    prodotto.url=this.url.value || '';
    prodotto.taglia=Number(this.taglia.value) || 40;
    alert(this.admin.addProdotto(prodotto));
  }
}
