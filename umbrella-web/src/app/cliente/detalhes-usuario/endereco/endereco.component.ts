import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Address, enderecos } from 'src/app/_models/address';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent {

  form = this.fb.group({
    address: [""],
    houseNumber: [""],
    district: [""],
    zipCode: [""]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router
  ){}

  salvar() {
    const address: Address = {
      id: String(enderecos.length + 1),
      address: this.form.controls.address.value? this.form.controls.address.value : "",
      houseNumber: this.form.controls.houseNumber.value? Number(this.form.controls.houseNumber.value) : 0,
      district: this.form.controls.district.value? this.form.controls.district.value : "",
      zipCode: this.form.controls.zipCode.value? this.form.controls.zipCode.value :  "",
      default: false
    }
    enderecos.push(address);
    this.router.navigate(["cliente/detalhes-usuario"]);
  }
}
