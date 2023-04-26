import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: User[] = [];

  constructor(
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    if (this.accountService.userValue) {
      if (this.accountService.userValue.isAdmin) {
        this.accountService.getAll().subscribe(res => this.usuarios = res);
        return;
      }
      alert("Você não possui acesso a esta tela")
      this.router.navigate(['backoffice']);
    }

  }

  editarUsuario(usuarioId: string | undefined) {
    this.router.navigate([`backoffice/usuarios/${usuarioId}`])
  }

  checkValue(usuario: User) {
    const checkbox = document.getElementById(
      `check-situacao-${usuario.id}`,
    ) as HTMLInputElement | null;

    if (confirm("tem certeza?")) {
      const params = {
        email: usuario.userName
      }
      if (checkbox) {
        if (!usuario.lockoutEnabled) {
          this.accountService.deactivateUser(params).subscribe(
            res => {
              if (res.success) {
                usuario.lockoutEnabled = true;
                checkbox.value = "false"
              }
            }
          );

        } else {
          this.accountService.activateUser(params).subscribe(
            res => {
              if (res.success) {
                usuario.lockoutEnabled = false;
                checkbox.value = "true"
              }
            }
          );
        }
      }
    } else {
      if(checkbox){
        if(checkbox.checked == false){
          checkbox.checked = true;
        } else {
          checkbox.checked = false;
        }
      }
    }
  }

}
