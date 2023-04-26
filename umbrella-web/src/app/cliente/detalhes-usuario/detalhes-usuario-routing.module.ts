import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalhesUsuarioComponent } from './detalhes-usuario.component';
import { EnderecoComponent } from './endereco/endereco.component';

const routes: Routes = [
  { path: '', component: DetalhesUsuarioComponent },
  { path: 'endereco', component: EnderecoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalhesUsuarioRoutingModule { }
