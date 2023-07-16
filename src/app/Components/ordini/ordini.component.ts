import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrdineDTO } from 'src/app/DTO/OrdineDTO';
import { AutenticazioneService } from 'src/app/Services/autenticazione.service';
import { CarrelloService } from 'src/app/Services/carrello.service';
import { OrdiniService } from 'src/app/Services/ordini.service';

@Component({
  selector: 'app-ordini',
  templateUrl: './ordini.component.html',
  styleUrls: ['./ordini.component.css']
})
export class OrdiniComponent {
  ordini!: Observable<OrdineDTO[]>;

  constructor(private ordiniService : OrdiniService, private router:Router, private auth:AutenticazioneService){};

  ngOnInit(){
    this.ordini=this.ordiniService.getProdotti();
  }
}
