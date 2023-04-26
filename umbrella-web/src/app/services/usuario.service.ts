import { Injectable } from '@angular/core';
import { Usuario, usuarios } from '../usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarios: Usuario[] = [];

  constructor() { }

  getAll() {
    this.usuarios = usuarios;
    return this.usuarios;
  }

  getOne(usuarioId: number): Usuario | undefined {
    const usuario =  usuarios.find((x) => {
      return x.id == usuarioId ? x : null
    });
    return usuario;
  }

  delete(usuarioId:number) {
    this.usuarios = this.usuarios.filter(usuario => usuario.id !== usuarioId);
    return this.usuarios;
  }

  update(usuarioId: number, usuario: Usuario) {
    const index = this.usuarios.findIndex(x => x.id === usuarioId);
    if(index > -1) {
      this.usuarios[index].nome = usuario.nome;
      this.usuarios[index].email = usuario.email;
      this.usuarios[index].cargo = usuario.cargo;
      this.usuarios[index].situacao = usuario.situacao;
    }
  }
  
  insert(usuario: Usuario) {
    usuario.id = this.usuarios.length + 1;
    this.usuarios.push(usuario);
  }
}
