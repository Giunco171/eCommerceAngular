import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ProdottoCarrelloDTO } from 'src/app/DTO/ProdottoCarrelloDTO';
import { ProdottoDTO } from 'src/app/DTO/ProdottoDTO';
import { AutenticazioneService } from 'src/app/Services/autenticazione.service';
import { CarrelloService } from 'src/app/Services/carrello.service';
import { OrdiniService } from 'src/app/Services/ordini.service';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})
export class CarrelloComponent {
   pageNumber : number=0;
  pageSize : number=5;

  prodotti! : Observable<ProdottoCarrelloDTO[]>;
  prodottiDaAcquistare : ProdottoDTO[] =[]


  constructor(private carrelloService : CarrelloService, private router:Router, private auth:AutenticazioneService, private ordiniService: OrdiniService){};
  

  ngOnInit(){
    this.prodotti=this.carrelloService.getProdotti(this.pageNumber, this.pageSize);
    this.prodotti.subscribe((lista : ProdottoCarrelloDTO[])=>{
      for(const prodCar of lista)
      {
        var prodTmp=prodCar.prodotto;
        prodTmp.qta=prodCar.qta;
        prodTmp.prezzo=prodCar.prezzo;
        this.prodottiDaAcquistare.push(prodTmp);
        
      }
    });
  }

  viewProduct(nomeProdotto : String)
  {
    this.router.navigate(['/prodotto'], { queryParams: { nomeProdotto } });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.prodotti=this.carrelloService.getProdotti(this.pageNumber, this.pageSize);
    this.prodotti.subscribe((lista : ProdottoCarrelloDTO[])=>{
      for(const prodCar of lista)
      {
        var prodTmp=prodCar.prodotto;
        prodTmp.qta=prodCar.qta;
        prodTmp.prezzo=prodCar.prezzo;
        this.prodottiDaAcquistare.push(prodTmp);
        
      }
    });
  }

  incrementa(input:string)
  {
    return (Number(input)+1).toString();
  }

  decrementa(input:string)
  {
    return (Number(input)-1).toString();
  }

  rimuoviDalCarrello(prodottoCarrello:ProdottoCarrelloDTO, qta:string){
    var prodotto = prodottoCarrello.prodotto;
    prodotto.qta=Number(qta);
    alert(this.carrelloService.removeProdotto(prodotto))
    this.prodotti=this.carrelloService.getProdotti(this.pageNumber, this.pageSize);
    this.prodotti.subscribe((lista : ProdottoCarrelloDTO[])=>{
      for(const prodCar of lista)
      {
        var prodTmp=prodCar.prodotto;
        prodTmp.qta=prodCar.qta;
        prodTmp.prezzo=prodCar.prezzo;
        this.prodottiDaAcquistare.push(prodTmp);
        
      }
    });
    window.location.reload();
  }

  acquista(){
    alert(this.ordiniService.acquista(this.prodottiDaAcquistare));
    this.prodotti=this.carrelloService.getProdotti(this.pageNumber, this.pageSize);
    window.location.reload();
  }

  isLogged()
  {
    return this.auth.isLoggato();
  }

}
