import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdottoDTO } from '../DTO/ProdottoDTO';
import { Observable } from 'rxjs/internal/Observable';
import { ProdottoCarrelloDTO } from '../DTO/ProdottoCarrelloDTO';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {
  prodottiObs : Observable<ProdottoCarrelloDTO[]> = new Observable<ProdottoCarrelloDTO[]>();
  constructor(private http : HttpClient) { }

  getProdotti(pageNumber: number=0, pageSize: number=10, sortBy: string="prezzo") :Observable<ProdottoCarrelloDTO[]>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization' : "Bearer "+window.localStorage.getItem('TOKEN')
    });
    
    let params = new HttpParams()
    .set('pageSize', pageSize.toString())
    .set('pageNumber', pageNumber.toString())
    .set("sortBy", sortBy);

    console.log(params)

    this.prodottiObs=this.http.get<ProdottoCarrelloDTO[]>("https://localhost:9090/carrello", { headers,params });
    this.prodottiObs.subscribe((value)=>{console.log(value)});
    return this.prodottiObs;
  }

  addProdotto(prodotto: ProdottoDTO)
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : "Bearer "+window.localStorage.getItem('TOKEN')
    });
    const body=prodotto.toString()
    var ret
    this.http.post<string>("https://localhost:9090/carrello", prodotto, {headers}).subscribe((value:string)=>{ret=value});
    return ret;
  }

  removeProdotto(prodotto: ProdottoDTO)
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : "Bearer "+window.localStorage.getItem('TOKEN')
    });

    var ret
    this.http.post<string>("https://localhost:9090/carrello/remove", prodotto, {headers}).subscribe((value:string)=>{ret=value});
    return ret;
  }
}
