import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo:'produtos', pathMatch:"full" },
  { path: 'detalhes-usuario', loadChildren: () => import('./detalhes-usuario/detalhes-usuario.module').then(m => m.DetalhesUsuarioModule) },
  { path: 'produtos', loadChildren: () => import('./produtos/produtos.module').then(m => m.ProdutosModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
