import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {
  
  public ofertas!: Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa
      .pipe( 
        debounceTime(1000),      // executa o switchMap apos 1seg
        distinctUntilChanged(),  // para apenas fazer pesquisas distintas
        switchMap((termo: string)=>{
          if(termo.trim() === ''){
            // retornar um array vazio
            return of<Oferta[]>([]) 
          }
          return this.ofertasService.pesquisaOfertas(termo)
      })),
      catchError((erro: any) =>{
        return of<Oferta[]>([])
      })
      
  }

  public pesquisa(termoDaBusca: string): void{
    this.subjectPesquisa.next(termoDaBusca)
  }
  public limpaPesquisa(): void{
    this.subjectPesquisa.next('')
  }
}
