import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ProdottoDTO } from 'src/app/DTO/ProdottoDTO';
import { ProdottiService } from 'src/app/Services/prodotti.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  pageNumber : number=0;
  pageSize : number=100;

  prodotti! : Observable<ProdottoDTO[]>;
  prodottiSenzaTaglia! : Observable<ProdottoDTO[]>;


  constructor(private prodottiService : ProdottiService, private router:Router){};

  ngOnInit(){
    this.prodotti=this.prodottiService.getProdotti(this.pageNumber, this.pageSize);
    this.prodottiService.getProdotti(this.pageNumber, this.pageSize).subscribe((lista:ProdottoDTO[])=>{
      var prodottiMonoTaglia: ProdottoDTO[]=[];
      const mySet: Set<string> = new Set();
      for(const prod of lista)
      {
        if(! mySet.has(prod.nome))
        {
          prodottiMonoTaglia.push(prod);
          mySet.add(prod.nome);
        }
      }
      this.prodottiSenzaTaglia=new Observable(observer => {
        observer.next(prodottiMonoTaglia);
        observer.complete();
      });
    });
  }

  viewProduct(nomeProdotto : String)
  {
    this.router.navigate(['/prodotto'], { queryParams: { nomeProdotto } });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.prodotti=this.prodottiService.getProdotti(this.pageNumber, this.pageSize);
    this.prodottiService.getProdotti(this.pageNumber, this.pageSize).subscribe((lista:ProdottoDTO[])=>{
      var prodottiMonoTaglia: ProdottoDTO[]=[];
      const mySet: Set<string> = new Set();
      for(const prod of lista)
      {
        if(! mySet.has(prod.nome))
        {
          prodottiMonoTaglia.push(prod);
          mySet.add(prod.nome);
        }
      }
      this.prodottiSenzaTaglia=new Observable(observer => {
        observer.next(prodottiMonoTaglia);
        observer.complete();
      });
    });
  }
}
