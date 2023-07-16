import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProdottoDTO } from 'src/app/DTO/ProdottoDTO';
import { ProdottiService } from 'src/app/Services/prodotti.service';

@Component({
  selector: 'app-risultati-ricerca',
  templateUrl: './risultati-ricerca.component.html',
  styleUrls: ['./risultati-ricerca.component.css']
})
export class RisultatiRicercaComponent {
  constructor( private route: ActivatedRoute, private prodottiService: ProdottiService, private router:Router){}

  pageNumber : number=0;
  pageSize : number=5;

  nome : string ="jordan 1"
  prezzoMax! : number;
  prezzoMin! : number;
  brand! : string;
  taglia! : number;

  prodottiSenzaTaglia! : Observable<ProdottoDTO[]>;

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.nome = params['nome'];
      this.prezzoMax = params['prezzoMax'];
      this.prezzoMin = params['prezzoMin'];
      this.brand = params['brand'];
      if(params['taglia']==0)
      {
        this.taglia=-1
      }else{
        this.taglia = params['taglia'];
      }
    });
      this.prodottiService.getProdottiFiltrati(this.pageNumber, this.pageSize, "prezzo", this.nome,
                                              this.prezzoMax, this.prezzoMin, this.brand, this.taglia).subscribe((lista:ProdottoDTO[])=>{
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
    this.prodottiService.getProdottiFiltrati(this.pageNumber, this.pageSize, "prezzo", this.nome,
                                              this.prezzoMax, this.prezzoMin, this.brand, this.taglia).subscribe((lista:ProdottoDTO[])=>{
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
