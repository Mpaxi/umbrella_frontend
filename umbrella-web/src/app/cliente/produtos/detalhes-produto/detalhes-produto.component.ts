import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';
import { Produto } from 'src/app/produto';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit{

  produto: Product | undefined;
  quantidade = 1;

  constructor(
    private produtoService: ProdutosService,
    private productService: ProductService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const codigoProduto = routeParams.get('id');

    if(codigoProduto) {
      this.productService.getOne(codigoProduto).subscribe(res => {
        this.produto = res;
      })
    }
  }

}
