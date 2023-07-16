import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdottoDTO } from '../DTO/ProdottoDTO';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http : HttpClient) { }

  addProdotto(prodotto: ProdottoDTO)
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : "Bearer "+window.localStorage.getItem('TOKEN')
    });
    const body=prodotto.toString()
    var ret
    this.http.post<string>("https://localhost:9090/admin/prodotto", prodotto, {headers}).subscribe((value:string)=>{ret=value});
    return ret;
  }

}
