import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrdemCompraService } from '../ordem-compra.service'
import { Validators } from '@angular/forms';
import { Pedido } from '../shared/pedido.model'
import  { CarrinhoService }  from '../carrinho.service'
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra!: number
  public itensCarrinho: ItemCarrinho[] = []

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required])
  })

  constructor(private ordemCompraService: OrdemCompraService, public carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens()
  }

  public confirmarCompra(): void {
    if(this.formulario.status === 'INVALID'){
      this.formulario.controls.endereco.markAsTouched()
      this.formulario.controls.numero.markAsTouched()
      this.formulario.controls.complemento.markAsTouched()
      this.formulario.controls.formaPagamento.markAsTouched()
    }else{

      if(this.carrinhoService.exibirItens().length === 0){
        alert('Você não selecionou nenhum item!')
      }else{
        let pedido: Pedido = new Pedido(this.formulario.value.endereco, this.formulario.value.numero, this.formulario.value.complemento, this.formulario.value.formaPagamento, this.carrinhoService.exibirItens())

        this.ordemCompraService.efetivarCompra(pedido)
          .subscribe((idPedido: any)=>{
           this.idPedidoCompra = idPedido
           this.carrinhoService.limparCarrinho()
          })
      }
    }
  }
  public adicionar(item: ItemCarrinho): void{
    this.carrinhoService.adicionarQuantidade(item)
  }
  public diminuir(item: ItemCarrinho): void{
    this.carrinhoService.diminuirQuantidade(item)
  }
}
