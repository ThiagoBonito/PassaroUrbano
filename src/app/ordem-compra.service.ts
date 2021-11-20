import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Pedido } from "./shared/pedido.model"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"

@Injectable()
export class OrdemCompraService{

    public url_api = 'http://localhost:3000'

    constructor(private http: HttpClient){}


    public efetivarCompra(pedido: Pedido): Observable<any> {
        return this.http.post(`${this.url_api}/pedidos`, pedido).pipe(
            map((resposta: any)=> resposta.id)
        )

    }
}