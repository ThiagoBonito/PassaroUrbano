import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import  { CarrinhoService }  from '../carrinho.service'


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {


  public oferta: Oferta = {
    _id: 0,
    _categoria: "",
    _titulo: "",
    _descricao_oferta: "",
    _anunciante: "",
    _valor: 0,
    _destaque: false,
    _imagens: Array<any>(),
    id: 0,
    categoria: '',
    titulo: '',
    descricao_oferta: '',
    anunciante: '',
    valor: 0,
    destaque: false,
    imagens: [],
    inserir_nova_imagem: function (imagem: any): void {
      throw new Error('');
    },
    imagens_to_string: function (): string {
      throw new Error('');
    }
  } 
  
  
  constructor(private route: ActivatedRoute, private ofertasService: OfertasService, private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {

    //console.log('Oferta - Array do carrinho:', this.carrinhoService.exibirItens())

    this.route.params.subscribe((parametros: any)=>{
      this.ofertasService.getOfertaPorId(parametros.id)
    .then((oferta: Oferta) =>{
     this.oferta = oferta
    })  
    })

    
  }


  ngOnDestroy(): void{
  }

  public adicionarItemCarrinho(): void{
    this.carrinhoService.incluirItem(this.oferta)
    console.log(this.carrinhoService.exibirItens())
  }
}
