import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css']
})
export class RicercaComponent {
  nome = new FormControl('');
  prezzoMax = new FormControl('5000', [Validators.min(0),Validators.pattern(/^[0-9]+$/)]);
  prezzoMin = new FormControl('0', [Validators.min(0),Validators.pattern(/^[0-9]+$/)]);
  brand = new FormControl('');
  taglia = new FormControl('0', [ Validators.min(0),Validators.pattern(/^[0-9]+$/)]);

  constructor(private router:Router){}

  getErrorMessagePrezzoMax() {
    if (this.prezzoMax.hasError('min')) { //required è il validatore
      return 'Devi inserire un prezzo positivo';
    }
    if (this.prezzoMax.hasError('pattern')) { //required è il validatore
      return 'Devi inserire un prezzo';
    }

    return "";
  }

  getErrorMessagePrezzoMin() {
    if (this.prezzoMin.hasError('min')) { //required è il validatore
      return 'Devi inserire un prezzo positivo';
    }
    if (this.prezzoMin.hasError('pattern')) { //required è il validatore
      return 'Devi inserire un prezzo';
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

    return "";
  }

  ricercaAvanzata(){
    this.router.navigate(['/risultatiRicerca'], { queryParams: {  'nome': this.nome.value || '',
                                                      'prezzoMax': Number(this.prezzoMax.value) || 5000, 
                                                      'prezzoMin': Number(this.prezzoMin.value) || 0, 
                                                      'brand': this.brand.value || '', 
                                                      'taglia': Number(this.taglia.value) || -1 } });
  }

}
