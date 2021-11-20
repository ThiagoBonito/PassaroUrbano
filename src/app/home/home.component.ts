import { Component, OnInit } from '@angular/core';
import { __param } from 'tslib';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [OfertasService]
})
export class HomeComponent implements OnInit {

  public _ofertas: Oferta[] = []

  constructor(private _ofertasService: OfertasService) { }

  ngOnInit(){
  //this.ofertas = this.ofertasService.getOfertas()
  //console.log(this.ofertas)
  
    this._ofertasService.getOfertas()
      .then( 
        (ofertas: Array<Oferta>) => { 
          this._ofertas = ofertas 
        })
        .catch(
        (param: any) => { console.log(param) }
      )  
  }
  public get ofertas(): Array<Oferta> {
    return this._ofertas
  }

  public set ofertas(ofertas: Array<Oferta>) {
    this._ofertas= ofertas
  }
}
