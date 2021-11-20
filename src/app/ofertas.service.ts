import { computeDecimalDigest } from "@angular/compiler/src/i18n/digest"
import { Oferta } from "./shared/oferta.model" 
import { Imagem } from "./shared/imagem.model"
import { HttpClient } from "@angular/common/http";
import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {map} from "rxjs/operators"
import { retry } from "rxjs/operators";

@Injectable()
export class OfertasService{

    public url_api = 'http://localhost:3000'

    constructor(private http: HttpClient){
         
    }
    public getOfertas(): Promise<Array<Oferta>> {  
        return this.http.get<HttpResponse<Oferta[]>>(`${this.url_api}/ofertas?destaque=true`).toPromise()
        .then((resposta: any) => resposta)
    }
    public getOfertasPorCategoria(categoria: string): Promise<Array<Oferta>>{
        return this.http.get<HttpResponse<Oferta[]>>(`${this.url_api}/ofertas?categoria=${categoria}`).toPromise()
        .then((resposta: any) => resposta)

    }
    public getOfertaPorId(id: number): Promise<Oferta>{
        return this.http.get<HttpResponse<Oferta>>(`${this.url_api}/ofertas?id=${id}`).toPromise()
        .then((resposta: any) =>  {
            return resposta.shift()
        })
    } 
    public getComoUsarOfertaPorId(id: number): Promise<string>{
        return this.http.get<HttpResponse<String>>(`${this.url_api}/como-usar?id=${id}`).toPromise()
        .then((resposta: any) =>{
          //console.log(resposta[0].descricao)
            return resposta[0].descricao
        })
    }  
    public getOndeFicaOfertaPorId(id: number): Promise<string>{
        return this.http.get<HttpResponse<String>>(`${this.url_api}/onde-fica?id=${id}`).toPromise()
        .then((resposta: any) =>{
          //console.log(resposta[0].descricao)
            return resposta[0].descricao
        })
    }
    public pesquisaOfertas(termo: string): Observable<Oferta[]>{
        return this.http.get<HttpResponse<Oferta[]>>(`${this.url_api}/ofertas?descricao_oferta_like=${termo}`)
        .pipe(
            retry(10),
            map((resposta: any) => resposta)
        )
    }
}