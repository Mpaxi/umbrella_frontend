import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetalhesUsuarioRoutingModule } from './detalhes-usuario-routing.module';
import { DetalhesUsuarioComponent } from './detalhes-usuario.component';
import { EnderecoComponent } from './endereco/endereco.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DetalhesUsuarioComponent,
    EnderecoComponent,
  ],
  imports: [
    CommonModule,
    DetalhesUsuarioRoutingModule,
    ReactiveFormsModule
  ]
})
export class DetalhesUsuarioModule { }
