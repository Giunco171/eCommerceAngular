import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Observer, of } from 'rxjs';
import { ProdottoDTO } from 'src/app/DTO/ProdottoDTO';
import { CarrelloService } from 'src/app/Services/carrello.service';
import { ProdottiService } from 'src/app/Services/prodotti.service';

@Component({
  selector: 'app-prodotto',
  templateUrl: './prodotto.component.html',
  styleUrls: ['./prodotto.component.css']
})
export class ProdottoComponent {
  nome!: string;
  prodotti!: Observable<ProdottoDTO[]>;
  prodotto!: ProdottoDTO;
  taglia! : number;

  prodottoSelezionato! : ProdottoDTO;

  menuItemSelected = false; 

  //quantita = new FormControl(0, [Validators.min(0),Validators.pattern(/^[0-9]+$/)]);
  quantita=0


  constructor(private prodottiService: ProdottiService, private route: ActivatedRoute, private carrelloService:CarrelloService, private router : Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.nome = params['nomeProdotto'];
    });

    this.prodotti = this.prodottiService.getProdottiByNome(this.nome);

    this.prodotti.subscribe(prodotti => {
      if (prodotti.length > 0) {
        this.prodotto = prodotti[0];
      }
    });
    
  }

  onMenuItemClicked(prod: ProdottoDTO) {
    // Aggiungi eventuali logiche aggiuntive se necessario
    this.menuItemSelected = true;
    this.prodottoSelezionato=prod;
    this.quantita=1;
    this.isDisabledSubjectDec.next(true)
  }

  aggiungiAlCarrello()
  {
    this.prodottoSelezionato.qta=this.quantita;
    alert(this.carrelloService.addProdotto(this.prodottoSelezionato));
    this.router.navigate(['/carrello'])
  }

  private isDisabledSubjectInc = new BehaviorSubject<boolean>(false);

  public isDisabledInc$: Observable<boolean> = this.isDisabledSubjectInc.asObservable();

  incrementa()
  {
    /*
    if((this.quantita || 0)<this.prodottoSelezionato.qta)
    this.quantita.setValue((this.quantita.value || 0)+1);
    */
   this.quantita=this.quantita+1;
   if(this.quantita===this.prodottoSelezionato.qta)
   {
    this.isDisabledSubjectInc.next(true)
   }
   if(this.quantita!==1)
   {
    this.isDisabledSubjectDec.next(false)
   }
  }

  private isDisabledSubjectDec = new BehaviorSubject<boolean>(false);

  public isDisabledDec$: Observable<boolean> = this.isDisabledSubjectDec.asObservable();

  decrementa()
  {
    /*
    this.quantita.setValue((this.quantita.value || 2)-1);
    */
    this.quantita=this.quantita-1;
    if(this.quantita===1)
   {
    this.isDisabledSubjectDec.next(true)
   }
   if(this.quantita!==this.prodottoSelezionato.qta)
   {
    this.isDisabledSubjectInc.next(false)
   }
  }

}