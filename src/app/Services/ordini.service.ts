import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdineDTO } from '../DTO/OrdineDTO';
import { ProdottoDTO } from '../DTO/ProdottoDTO';

@Injectable({
  providedIn: 'root'
})
export class OrdiniService {

  constructor(private http : HttpClient) { }

  ordini : Observable<OrdineDTO[]> = new Observable<OrdineDTO[]>();

  getProdotti(pageNumber: number=0, pageSize: number=10, sortBy: string="prezzo") :Observable<OrdineDTO[]>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization' : "Bearer "+window.localStorage.getItem('TOKEN')
    });
    

    this.ordini=this.http.get<OrdineDTO[]>("https://localhost:9090/utenti/ordini", { headers});
    this.ordini.subscribe((value)=>{console.log(value)});
    return this.ordini;
  }

  acquista(prodotti:ProdottoDTO[]){ 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : "Bearer "+window.localStorage.getItem('TOKEN')
    });

    
    var ret
    this.http.post<string>("https://localhost:9090/carrello/acquista", prodotti, {headers}).subscribe((value:string)=>{ret=value});
    return ret;
  }
}
