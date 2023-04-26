import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit{

  products: Product[] = [];

  constructor(
    private productService: ProductService
  ){}

    ngOnInit(): void {
        this.productService.getAllCliente().subscribe(res => this.products = res)
    }
}
