import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_models/product';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtos: Product[] | undefined;

  constructor(
    private prodcutService: ProductService,
    public accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.prodcutService.getAll().subscribe(res => this.produtos = res)
  }

  incluirProduto() {
    this.router.navigate(["backoffice/produtos/incluir"]);
  }

  editarProduto(codigoProduto: string | undefined) {
    this.router.navigate([`backoffice/produtos/${codigoProduto}`]);
  }

  excluirProduto(codigoProduto: string | undefined) {
    //this.produtos = this.produtosService.deletarProduto(codigoProduto);
  }

  visualizarProduto(codigoProduto: string | undefined) {
    this.router.navigate([`cliente/produtos/${codigoProduto}`]);
  }

  alterarFlagItemAtivo(produto: Product) {
    const checkbox = document.getElementById(
      `situacao-${produto.id}`,
    ) as HTMLInputElement | null;

    if (confirm("Tem certeza?")) {
      produto.active = !produto.active;
      if (checkbox) {
        this.prodcutService.update(produto).subscribe(res => {
          if (res.success) {
            checkbox.value = String(res.data.active);
          }
        })
      }
    } else {
      if (checkbox) {
        if (checkbox.checked == false) {
          checkbox.checked = true;
        } else {
          checkbox.checked = false;
        }
      }

    }
  }
}
