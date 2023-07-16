import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdottoDTO } from '../DTO/ProdottoDTO';

@Injectable({
  providedIn: 'root'
})
export class ProdottiService {
  prodottiObs : Observable<ProdottoDTO[]> = new Observable<ProdottoDTO[]>();
  constructor(private http : HttpClient) { }

  getProdotti(pageNumber: number=0, pageSize: number=10, sortBy: string="id") :Observable<ProdottoDTO[]>{

    let params = new HttpParams()
    .set('pageSize', pageSize.toString())
    .set('pageNumber', pageNumber.toString())
    .set("sortBy", sortBy);

    console.log(params)

    this.prodottiObs=this.http.get<ProdottoDTO[]>("https://localhost:9090/prodotti", { params });
    this.prodottiObs.subscribe();
    return this.prodottiObs;
  }

  getProdottiByNome(nomeProdotto : string) :Observable<ProdottoDTO[]>{
    
    return this.getProdottiFiltrati(0,10,"id",nomeProdotto);
  }

  getProdottiFiltrati(pageNumber: number=0, pageSize: number=10, sortBy: string="prezzo",
                      nome: string="", prezzoMax:number=5000, prezzoMin:number=0, brand:string="",
                      taglia:number=-1): Observable<ProdottoDTO[]> {
    let params = new HttpParams()
    .set('pageSize', pageSize.toString())
    .set('pageNumber', pageNumber.toString())
    .set("sortBy", sortBy)
    .set('nome', nome)
    .set('prezzoMax', prezzoMax.toString())
    .set('prezzoMin', prezzoMin.toString())
    .set('brand', brand)
    .set('taglia', taglia.toString())

    console.log(params)

    this.prodottiObs=this.http.get<ProdottoDTO[]>("https://localhost:9090/prodotti/filtrati", { params: params });
    this.prodottiObs.subscribe();
    return this.prodottiObs;
  }
}



