import { ProdottoCarrelloDTO } from "./ProdottoCarrelloDTO";

export class ProdottoDTO {
    public nome: string = ""; // unique
    public prezzo: number = -1;
    public qta: number = -1;
    public taglia: number = -1;
    public nomeBrand: string ="";
    public url: string ="";
  
    constructor() {}

    public toString(): string {
      return JSON.stringify(this);
    }
}