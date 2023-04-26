import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { AccountService } from 'src/app/_services/account.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {

  produto: Product | undefined;
  
  form = this.fb.group({
    name: ["", [
      Validators.required,
      Validators.maxLength(200)
    ]],
    
    rating: ["", [
      Validators.required
    ]],

    description: ["", [
      Validators.required,
      Validators.maxLength(2000)
    ]],

    price: ["", [
      Validators.required
    ]],

    unit: ["", [
      Validators.required
    ]],

  })

  titulo = "Cadastrar produto"

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private accountService: AccountService,
    private activateRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const routeParams = this.activateRouter.snapshot.paramMap;
    const codigoProduto = routeParams.get('id');

    if(!this.accountService.userValue?.isAdmin){
      this.form.controls.name.disable();
      this.form.controls.rating.disable();
      this.form.controls.description.disable();
      this.form.controls.price.disable();
    }

    if(codigoProduto) {
      this.titulo = "Alterar dados do produto"
      this.productService.getOne(codigoProduto).subscribe(res => {
        this.produto = res;
        this.form.controls.name.setValue(res.name);
        this.form.controls.rating.setValue(String(res.rating));
        this.form.controls.description.setValue(res.description);
        this.form.controls.price.setValue(String(res.price));
        this.form.controls.unit.setValue(String(res.unit));
      })
    }
  }

  salvar() {
    const produto: Product = {
      name: this.form.controls.name.value ? this.form.controls.name.value : "",
      description: this.form.controls.description.value? this.form.controls.description.value : "",
      rating: this.form.controls.rating.value? Number(this.form.controls.rating.value) : 0,
      price: this.form.controls.price.value? Number(this.form.controls.price.value.replace(".", "").replace(",", ".")) : 0.00,
      unit: this.form.controls.unit.value ? Number(this.form.controls.unit.value) : 0
    }

    if(this.produto) {
      produto.id = this.produto.id;
      produto.active = this.produto.active;
      this.productService.update(produto).subscribe(res => {
        if(res.success) {
          alert(`Produto ${res.data.name} alterado com sucesso`);
          this.router.navigate(["backoffice/produtos"]);
        }
      })
    } else {
      this.productService.insert(produto).subscribe(res => {
        if(res.success) {
          alert(`Produto ${res.data.name} adicionado com sucesso`);
          this.router.navigate(["backoffice/produtos"]);
        }
      })
    }
  }

  cancelar() {
    this.router.navigate(["backoffice/produtos"]);
  }
}
