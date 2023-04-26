import { Injectable } from '@angular/core';
import { Produto, produtos } from '../produto';


@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  produtos: Produto[] = []

  constructor() { }

  getAll(): Produto[] {
    this.produtos = produtos;
    return this.produtos;
  }

  getOne(codigo: string | null): Produto | undefined {
    if (codigo == null) {return undefined}
    const produto = produtos.find((x) => {
      return x.codigo == Number(codigo) ? x : null
    });
    return produto;
  }

  deletarProduto(codigo: number) {
    this.produtos = produtos.filter(produto => produto.codigo !== codigo)
    return this.produtos;
  }

  update(codigo:number, produto: Produto) {
    
    var prod = produtos.find(x => x.codigo == codigo ? x : null)
    if(prod) {
      prod.codigo = produto.codigo;
      prod.nome = produto.nome;
      prod.preco = produto.preco;
      prod.quantidade = produto.quantidade;
      prod.situacao = produto.situacao;
      prod.imagem = produto.imagem;
    }
  }

  insert(produto: Produto) {
    this.produtos.push(produto);
  }
}
